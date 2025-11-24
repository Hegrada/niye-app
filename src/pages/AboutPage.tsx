import { Heart, Target, Users, Globe2, TrendingUp, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Inclusion',
      description: 'Nous croyons que tout le monde mérite un accès égal aux opportunités numériques, peu importe le niveau d\'alphabétisation.'
    },
    {
      icon: Globe2,
      title: 'Diversité linguistique',
      description: 'L\'Ewe et le Mina sont des langues vivantes du Togo. Niyé les célèbre et leur donne la place qu\'elles méritent.'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous construisons des ponts entre les personnes et renforçons les liens au sein des quartiers.'
    }
  ];

  const team = [
    {
      role: 'Fondateur & CEO',
      description: 'Passionné par l\'impact social et les solutions technologiques inclusives'
    },
    {
      role: 'Développement',
      description: 'Experts en technologies mobiles et accessibilité'
    },
    {
      role: 'Communauté',
      description: 'Partenaires locaux et ambassadeurs de quartier'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-8">
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            À propos de Niyé
          </h1>
          <p className="text-orange-100 text-lg">
            Notre mission : donner une voix à tous les Togolais
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Le problème que nous résolvons
            </h2>
            <p className="text-lg text-neutral-700 mb-4 leading-relaxed">
              Des milliers de Togolais sont exclus des plateformes numériques traditionnelles. Pourquoi ? Parce que ces plateformes exigent de savoir lire et écrire, et ne respectent pas nos langues locales.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Les vendeurs de marché, les artisans, les travailleurs informels, tous ont des services à offrir. Mais ils ne peuvent pas accéder aux petites annonces en ligne. <strong>Niyé change cela.</strong>
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-orange-50 to-emerald-50">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">8M+ Togolais</h3>
                  <p className="text-neutral-600">dont 40% parlent Ewe et Mina au quotidien</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">60% de la population active</h3>
                  <p className="text-neutral-600">travaille dans le secteur informel</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">0 solution équivalente</h3>
                  <p className="text-neutral-600">adaptée culturellement et linguistiquement</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-4">
            Notre solution
          </h2>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Niyé est la première plateforme de petites annonces 100% audio au Togo, conçue pour l'Ewe, le Mina et le Français. Pas besoin de lire ou d'écrire. Il suffit de parler.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            L'équipe Niyé
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {member.role}
                </h3>
                <p className="text-neutral-600">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rejoignez le mouvement
          </h2>
          <p className="text-xl text-orange-100 mb-6">
            Ensemble, construisons un Togo numérique véritablement inclusif.
          </p>
          <p className="text-lg text-orange-50">
            Chaque voix compte. Chaque langue compte. Chaque personne compte.
          </p>
        </Card>
      </div>
    </div>
  );
}
