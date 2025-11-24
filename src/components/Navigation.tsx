import { useState } from 'react';
import { Home, Search, Mic, Grid3x3, Info, Mail, TrendingUp, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'explore', label: 'Explorer', icon: Search },
    { id: 'record', label: 'Publier', icon: Mic },
    { id: 'categories', label: 'Catégories', icon: Grid3x3 },
    { id: 'about', label: 'À propos', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'investors', label: 'Investisseurs', icon: TrendingUp },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Niyé
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {[navItems[0], navItems[1], navItems[2], navItems[3]].map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-orange-600'
                    : 'text-neutral-500'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
