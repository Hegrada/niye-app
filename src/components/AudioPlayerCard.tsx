import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Phone, MessageCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface AudioPlayerCardProps {
  id: string;
  audioUrl: string;
  duration: number;
  category: string;
  language: string;
  neighborhood?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  categoryColor?: string;
  onPlay?: (id: string) => void;
}

export function AudioPlayerCard({
  id,
  audioUrl,
  duration,
  category,
  language,
  neighborhood,
  contactPhone,
  contactWhatsApp,
  categoryColor = '#F97316',
  onPlay
}: AudioPlayerCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveform, setWaveform] = useState<number[]>(Array(30).fill(0.2));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setWaveform(Array(30).fill(0.2));
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      onPlay?.(id);
      animateWaveform();
    }
  };

  const animateWaveform = () => {
    const animate = () => {
      if (!isPlaying) return;

      setWaveform(prev =>
        prev.map(() => 0.2 + Math.random() * 0.6)
      );

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = () => {
    if (contactPhone) {
      window.location.href = `tel:${contactPhone}`;
    }
  };

  const handleWhatsApp = () => {
    if (contactWhatsApp) {
      window.open(`https://wa.me/${contactWhatsApp.replace(/\D/g, '')}`, '_blank');
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" fill="white" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" fill="white" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge color={categoryColor}>{category}</Badge>
            <Badge color="#10B981">{language}</Badge>
            {neighborhood && (
              <Badge color="#6B7280">{neighborhood}</Badge>
            )}
          </div>

          <div className="flex items-end gap-0.5 h-12 mb-2">
            {waveform.map((value, index) => (
              <div
                key={index}
                className="flex-1 rounded-full transition-all duration-100"
                style={{
                  height: `${value * 100}%`,
                  backgroundColor: categoryColor,
                  opacity: isPlaying ? 0.7 : 0.3
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="w-full bg-neutral-200 rounded-full h-1 mt-2">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                backgroundColor: categoryColor
              }}
            />
          </div>
        </div>
      </div>

      {(contactPhone || contactWhatsApp) && (
        <div className="flex gap-2 pt-3 border-t border-neutral-100">
          {contactPhone && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCall}
              className="flex-1"
            >
              <Phone className="w-4 h-4 mr-1" />
              Appeler
            </Button>
          )}
          {contactWhatsApp && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleWhatsApp}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
