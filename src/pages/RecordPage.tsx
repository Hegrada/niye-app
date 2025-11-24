import { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { AudioRecorder } from '../components/AudioRecorder';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { supabase } from '../lib/supabase';

interface Category {
  id: string;
  name_fr: string;
  icon_name: string;
  color: string;
}

interface Language {
  code: string;
  native_name: string;
}

interface RecordPageProps {
  onNavigate: (page: string) => void;
}

export function RecordPage({ onNavigate }: RecordPageProps) {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactWhatsApp, setContactWhatsApp] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [categoriesResult, languagesResult] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('languages').select('code, native_name').eq('is_active', true)
    ]);

    if (categoriesResult.data) setCategories(categoriesResult.data);
    if (languagesResult.data) setLanguages(languagesResult.data);
  };

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    setAudioBlob(blob);
    setAudioDuration(duration);
    setStep(4);
  };

  const handlePublish = async () => {
    if (!audioBlob || !selectedCategory || !selectedLanguage) return;

    setUploading(true);

    try {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webm`;
      const filePath = `audio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('listings')
        .upload(filePath, audioBlob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('listings')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('listings')
        .insert({
          audio_url: publicUrl,
          audio_duration: audioDuration,
          category: selectedCategory,
          language: selectedLanguage,
          neighborhood: neighborhood || null,
          contact_phone: contactPhone || null,
          contact_whatsapp: contactWhatsApp || null,
          user_id: null
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        onNavigate('explore');
      }, 3000);
    } catch (error) {
      console.error('Error publishing listing:', error);
      alert('Erreur lors de la publication. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  const canProceedStep1 = selectedCategory !== '';
  const canProceedStep2 = selectedLanguage !== '';
  const canProceedStep3 = contactPhone !== '' || contactWhatsApp !== '';

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="p-12 text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Félicitations !
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            Votre annonce a été publiée avec succès. Elle est maintenant visible par tous.
          </p>
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-neutral-500 mt-4">
            Redirection en cours...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-8">
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Publier une annonce
          </h1>
          <p className="text-orange-100">
            Étape {step} sur 4
          </p>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Choisissez une catégorie
              </h2>
              <p className="text-neutral-600 mb-6">
                Dans quelle catégorie souhaitez-vous publier ?
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name_fr)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedCategory === category.name_fr
                        ? 'border-current shadow-lg scale-105'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    style={{
                      color: selectedCategory === category.name_fr ? category.color : undefined,
                      backgroundColor: selectedCategory === category.name_fr ? `${category.color}10` : undefined
                    }}
                  >
                    <div className="text-3xl mb-2">{category.icon_name === 'briefcase' ? '💼' : category.icon_name === 'home' ? '🏠' : category.icon_name === 'wrench' ? '🔧' : category.icon_name === 'shopping-bag' ? '🛍️' : category.icon_name === 'car' ? '🚗' : '👥'}</div>
                    <div className="font-semibold">{category.name_fr}</div>
                  </button>
                ))}
              </div>
            </Card>

            <div className="flex justify-end">
              <Button
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
                size="lg"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Dans quelle langue allez-vous parler ?
              </h2>
              <p className="text-neutral-600 mb-6">
                Choisissez la langue de votre annonce
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {languages.map(language => (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedLanguage === language.code
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🗣️</div>
                    <div className="font-semibold text-neutral-900">
                      {language.native_name}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                size="lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <Button
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
                size="lg"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Comment vous contacter ?
              </h2>
              <p className="text-neutral-600 mb-6">
                Indiquez au moins un moyen de contact
              </p>

              <div className="space-y-4">
                <Input
                  label="Numéro de téléphone"
                  type="tel"
                  placeholder="+221 XX XXX XX XX"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />

                <Input
                  label="WhatsApp (optionnel)"
                  type="tel"
                  placeholder="+221 XX XXX XX XX"
                  value={contactWhatsApp}
                  onChange={(e) => setContactWhatsApp(e.target.value)}
                />

                <Input
                  label="Quartier (optionnel)"
                  type="text"
                  placeholder="Ex: Medina, Plateau, Yoff..."
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </div>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                size="lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <Button
                disabled={!canProceedStep3}
                onClick={() => setStep(4)}
                size="lg"
              >
                Enregistrer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Enregistrez votre annonce
              </h2>
              <p className="text-neutral-600 mb-6">
                Parlez clairement et décrivez ce que vous proposez
              </p>

              <AudioRecorder
                onRecordingComplete={handleRecordingComplete}
                maxDuration={120}
              />
            </Card>

            {audioBlob && (
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAudioBlob(null);
                    setStep(3);
                  }}
                  size="lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Retour
                </Button>
                <Button
                  variant="primary"
                  onClick={handlePublish}
                  isLoading={uploading}
                  size="lg"
                >
                  Publier l'annonce
                  <CheckCircle className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
