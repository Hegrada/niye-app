import { Mic, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Niyé</span>
            </div>
            <p className="text-neutral-300 mb-4 max-w-md">
              La plateforme qui donne une voix à tous. Publiez et écoutez des annonces en langues africaines, sans besoin de lire ou écrire.
            </p>
            <div className="flex items-center gap-1 text-sm text-neutral-400">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>pour l'Afrique</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Explorer</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Catégories</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">À propos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Conditions</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400 text-sm">
          <p>&copy; 2025 Niyé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
