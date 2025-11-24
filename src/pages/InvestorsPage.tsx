import { useState } from 'react';
import { TrendingUp, Target, Users, Globe2, Zap, Shield, Calendar, DollarSign, Download, Send, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { supabase } from '../lib/supabase';

export function InvestorsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('investor_contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          message: formData.message
        });

      if (error) throw error;

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const metrics = [
    { icon: Users, value: '8M+', label: 'Marché togolais', color: '#F97316' },
    { icon: TrendingUp, value: '60%', label: 'Secteur informel', color: '#10B981' },
    { icon: Globe2, value: '3', label: 'Langues togolaises', color: '#3B82F6' },
    { icon: Zap, value: '1er', label: 'First-mover Togo', color: '#EF4444' }
  ];

  const advantages = [
    {
      icon: Target,
      title: 'Problème réel, solution unique',
      description: 'Nous résolvons l\'exclusion numérique des Togolais avec une approche audio-first inédite.'
    },
    {
      icon: Shield,
      title: 'Barrières à l\'entrée élevées',
      description: 'Expertise locale, compréhension culturelle et relations communautaires créent un avantage défensible.'
    },
    {
      icon: Users,
      title: 'Impact social mesurable',
      description: 'Chaque utilisateur gagné représente une personne incluse dans l\'économie numérique.'
    }
  ];

  const roadmap = [
    { phase: 'Q1 2025', title: 'MVP & Pilote', description: 'Lancement à Lomé, 1000 premiers utilisateurs' },
    { phase: 'Q2-Q3 2025', title: 'Expansion nationale', description: 'Déploiement dans les régions Maritime, Plateaux et Savanes' },
    { phase: 'Q4 2025', title: 'Monétisation', description: 'Lancement des annonces premium et partenariats avec Moov/Togocom' },
    { phase: '2026', title: 'Scale', description: 'Expansion régionale (Ghana, Bénin), 50K+ utilisateurs actifs' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-8">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-orange-500 rounded-full text-sm font-medium">
                Opportunité d'investissement
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Investissez dans l'inclusion digitale togolaise
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed mb-8">
              Niyé transforme radicalement l'accès aux opportunités économiques pour les Togolais qui parlent Ewe et Mina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Télécharger le pitch deck
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Réserver un appel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-1">{metric.value}</div>
                <div className="text-sm text-neutral-600">{metric.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-4">
            Le problème
          </h2>
          <p className="text-xl text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Des milliers de Togolais sont exclus de l'économie numérique simplement parce qu'ils ne lisent pas ou parlent Ewe/Mina au quotidien.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Exclusion massive
              </h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>60% de la population active travaille dans le secteur informel</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Les plateformes traditionnelles nécessitent alphabétisation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Ewe et Mina ignorés par les plateformes existantes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Opportunités économiques inaccessibles</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Notre solution
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold">✓</span>
                  <span>100% audio : pas besoin de lire ou écrire</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">✓</span>
                  <span>Ewe, Mina et Français supportés</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">✓</span>
                  <span>Optimisé pour mobile low-data</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">✓</span>
                  <span>Ancré dans les communautés locales</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
            Avantages compétitifs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-4">
            Modèle de monétisation
          </h2>
          <p className="text-xl text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Trois sources de revenus principales, toutes adaptées au contexte local
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Annonces premium</h3>
              <p className="text-neutral-600">Visibilité accrue pour les annonces professionnelles (500-2000 FCFA/mois)</p>
            </Card>
            <Card className="p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Partenariats B2B</h3>
              <p className="text-neutral-600">Intégrations avec opérateurs télécoms, banques mobiles, ONG</p>
            </Card>
            <Card className="p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Data insights</h3>
              <p className="text-neutral-600">Analyses de marché anonymisées pour entreprises et chercheurs</p>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
            Roadmap
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200" />

            <div className="space-y-8">
              {roadmap.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center gap-6 md:gap-12">
                    <div className="flex-shrink-0 w-32">
                      <Card className="p-3 bg-orange-500 text-white text-center font-bold">
                        {item.phase}
                      </Card>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full -ml-2" />
                    <Card className="flex-1 p-6 ml-8 md:ml-0">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="p-12 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <DollarSign className="w-16 h-16 mx-auto mb-6 text-orange-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Objectif de levée
            </h2>
            <div className="text-5xl font-bold text-orange-400 mb-4">
              €15,000 - €30,000
            </div>
            <p className="text-xl text-neutral-300 mb-8">
              Seed funding pour finaliser le MVP, lancer le pilote et valider le product-market fit
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-orange-400 font-bold mb-2">40%</div>
                <div className="text-sm">Développement technique & infrastructure</div>
              </div>
              <div>
                <div className="text-orange-400 font-bold mb-2">35%</div>
                <div className="text-sm">Acquisition utilisateurs & marketing local</div>
              </div>
              <div>
                <div className="text-orange-400 font-bold mb-2">25%</div>
                <div className="text-sm">Opérations & équipe</div>
              </div>
            </div>
          </div>
        </Card>

        <div id="contact-form">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
            Discutons de cette opportunité
          </h2>

          {submitted ? (
            <Card className="max-w-2xl mx-auto p-12 text-center bg-gradient-to-br from-emerald-50 to-emerald-100">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Message reçu !
              </h3>
              <p className="text-lg text-neutral-600">
                Merci pour votre intérêt. Nous vous contacterons très rapidement pour organiser un échange.
              </p>
            </Card>
          ) : (
            <Card className="max-w-2xl mx-auto p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nom complet *"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                />

                <Input
                  label="Email professionnel *"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                />

                <Input
                  label="Société / Fonds"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nom de votre organisation"
                />

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    placeholder="Parlez-nous de votre intérêt pour Niyé..."
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full" size="lg" isLoading={submitting}>
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer ma demande
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
