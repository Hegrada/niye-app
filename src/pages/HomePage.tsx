import { useEffect, useState } from 'react';
import { Mic, Headphones, MapPin, ArrowRight, CheckCircle, Users, Globe2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar_url: string | null;
}

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % Math.max(testimonials.length, 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order');

    if (data) setTestimonials(data);
  };

  const features = [
    {
      icon: Mic,
      title: 'Enregistrez votre voix',
      description: 'Parlez simplement dans votre téléphone. Pas besoin d\'écrire.',
      color: '#F97316'
    },
    {
      icon: Headphones,
      title: 'Écoutez en un clic',
      description: 'Parcourez les annonces audio de votre quartier.',
      color: '#10B981'
    },
    {
      icon: MapPin,
      title: 'Connectez localement',
      description: 'Trouvez emplois, services et produits près de chez vous.',
      color: '#3B82F6'
    }
  ];

  const stats = [
    { number: '3', label: 'Langues togolaises', icon: Globe2 },
    { number: '6', label: 'Catégories', icon: CheckCircle },
    { number: '100%', label: 'Accessible', icon: Users }
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-orange-50 via-white to-emerald-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                  Inclusion Digitale pour Tous
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight">
                Votre voix,
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> votre annonce</span>
              </h1>

              <p className="text-xl text-neutral-600 leading-relaxed">
                Publiez et écoutez des annonces en Ewe, Mina et Français.
                Niyé donne la parole aux Togolais qui n'ont jamais eu accès aux plateformes traditionnelles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('record')}
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Publier une annonce
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('explore')}
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Explorer
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon className="w-5 h-5 text-orange-600" />
                        <div className="text-2xl font-bold text-neutral-900">{stat.number}</div>
                      </div>
                      <div className="text-sm text-neutral-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative z-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Mic className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-white">
                      <div className="font-semibold">Enregistrement audio</div>
                      <div className="text-sm text-white/80">Parlez dans votre langue</div>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-24">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.random() * 80}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Trois étapes simples pour publier ou trouver ce dont vous avez besoin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-8 text-center hover:shadow-xl transition-shadow">
                  <div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div
                    className="mt-4 w-12 h-1 mx-auto rounded-full"
                    style={{ backgroundColor: feature.color }}
                  />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-orange-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Ils utilisent Niyé
              </h2>
              <p className="text-xl text-neutral-600">
                Des histoires réelles de notre communauté
              </p>
            </div>

            <Card className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  {testimonials[currentTestimonial]?.name.charAt(0)}
                </div>
                <blockquote className="text-xl md:text-2xl text-neutral-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial]?.content}"
                </blockquote>
                <div className="font-semibold text-neutral-900">
                  {testimonials[currentTestimonial]?.name}
                </div>
                <div className="text-neutral-600">
                  {testimonials[currentTestimonial]?.role}
                </div>

                <div className="flex gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial
                          ? 'bg-orange-600 w-8'
                          : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Prêt à donner de la voix ?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Rejoignez les Togolais qui ont trouvé emploi, logement et services grâce à Niyé
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('record')}
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
