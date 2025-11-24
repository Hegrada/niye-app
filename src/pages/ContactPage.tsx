import { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+221 XX XXX XX XX',
      action: 'tel:+221XXXXXXXXX',
      color: '#F97316'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: 'Écrivez-nous',
      action: 'https://wa.me/221XXXXXXXXX',
      color: '#10B981'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@niye.africa',
      action: 'mailto:contact@niye.africa',
      color: '#3B82F6'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Lomé, Togo',
      action: '',
      color: '#EF4444'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-8">
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Contactez-nous
          </h1>
          <p className="text-orange-100 text-lg">
            Nous sommes là pour vous aider
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Envoyez-nous un message
            </h2>

            {submitted ? (
              <Card className="p-8 text-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Message envoyé !
                </h3>
                <p className="text-neutral-600">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </Card>
            ) : (
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Nom complet"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                  />

                  <Input
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                  />

                  <Input
                    label="Sujet"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="De quoi voulez-vous parler ?"
                  />

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </Card>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Autres moyens de contact
            </h2>

            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={index}
                    hover={!!method.action}
                    onClick={() => method.action && window.open(method.action, method.action.startsWith('http') ? '_blank' : '_self')}
                    className={`p-6 ${method.action ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${method.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: method.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">
                          {method.title}
                        </h3>
                        <p className="text-neutral-600">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8 p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Support communautaire
              </h3>
              <p className="text-neutral-700 mb-4">
                Vous avez besoin d'aide pour publier une annonce ? Nos ambassadeurs de quartier sont là pour vous accompagner.
              </p>
              <p className="text-sm text-neutral-600">
                Demandez "Niyé" dans votre quartier, quelqu'un pourra vous aider gratuitement.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
