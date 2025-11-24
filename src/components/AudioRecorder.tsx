import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, RotateCcw, Upload } from 'lucide-react';
import { Button } from './ui/Button';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob, duration: number) => void;
  maxDuration?: number;
}

export function AudioRecorder({ onRecordingComplete, maxDuration = 120 }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<number[]>(Array(40).fill(0));

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 128;
      source.connect(analyserRef.current);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      timerRef.current = setInterval(() => {
        setDuration(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      visualize();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Impossible d\'accéder au microphone. Veuillez autoriser l\'accès.');
    }
  };

  const visualize = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const draw = () => {
      if (!isRecording) return;

      analyserRef.current!.getByteFrequencyData(dataArray);
      const values = Array.from(dataArray.slice(0, 40)).map(v => v / 255);
      setWaveform(values);

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.currentTime = 0;
      }

      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      audio.play();
      setIsPlaying(true);

      audio.onended = () => setIsPlaying(false);
    }
  };

  const reset = () => {
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setDuration(0);
    setIsPlaying(false);
    setWaveform(Array(40).fill(0));
  };

  const handleUpload = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob, duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="text-3xl font-bold text-orange-600">
            {formatTime(duration)}
          </div>
        </div>

        <div className="flex justify-center items-end h-32 gap-1 mb-8">
          {waveform.map((value, index) => (
            <div
              key={index}
              className="w-2 bg-gradient-to-t from-orange-500 to-orange-400 rounded-full transition-all duration-100"
              style={{
                height: `${Math.max(isRecording ? value * 100 : 4, 4)}%`,
                opacity: isRecording ? 0.8 + value * 0.2 : 0.3
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {!audioBlob ? (
            <div className="flex justify-center">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 shadow-lg animate-pulse'
                    : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl'
                }`}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Mic className="w-10 h-10 text-white" />
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Button
                variant="secondary"
                onClick={playAudio}
                disabled={isPlaying}
                className="w-full"
              >
                <Play className="w-5 h-5 mr-2" />
                {isPlaying ? 'Lecture en cours...' : 'Écouter l\'enregistrement'}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={reset}
                  className="flex-1"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Recommencer
                </Button>

                <Button
                  variant="primary"
                  onClick={handleUpload}
                  className="flex-1"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Publier
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-neutral-600 mt-4">
          {!audioBlob
            ? isRecording
              ? 'Parlez clairement dans le micro...'
              : 'Appuyez sur le bouton pour commencer'
            : 'Écoutez votre annonce avant de publier'}
        </p>
      </div>
    </div>
  );
}
