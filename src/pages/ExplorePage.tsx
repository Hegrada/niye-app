import { useEffect, useState } from 'react';
import { Filter, MapPin, Globe2 } from 'lucide-react';
import { AudioPlayerCard } from '../components/AudioPlayerCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { supabase } from '../lib/supabase';

interface Listing {
  id: string;
  audio_url: string;
  audio_duration: number;
  category: string;
  language: string;
  neighborhood: string | null;
  contact_phone: string | null;
  contact_whatsapp: string | null;
  created_at: string;
}

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

export function ExplorePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadListings();
  }, [selectedCategory, selectedLanguage, selectedNeighborhood]);

  const loadInitialData = async () => {
    const [categoriesResult, languagesResult] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('languages').select('code, native_name').eq('is_active', true)
    ]);

    if (categoriesResult.data) setCategories(categoriesResult.data);
    if (languagesResult.data) setLanguages(languagesResult.data);
  };

  const loadListings = async () => {
    setLoading(true);

    let query = supabase
      .from('listings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }
    if (selectedLanguage) {
      query = query.eq('language', selectedLanguage);
    }
    if (selectedNeighborhood) {
      query = query.eq('neighborhood', selectedNeighborhood);
    }

    const { data } = await query;

    if (data) setListings(data);
    setLoading(false);
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name_fr === categoryName);
    return category?.color || '#F97316';
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedLanguage('');
    setSelectedNeighborhood('');
  };

  const activeFiltersCount = [selectedCategory, selectedLanguage, selectedNeighborhood].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-8">
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Explorer les annonces
          </h1>
          <p className="text-orange-100 text-lg">
            Écoutez des annonces dans votre langue et votre quartier
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <Card className="p-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-neutral-900">Filtres</span>
              {activeFiltersCount > 0 && (
                <Badge color="#F97316">{activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}</Badge>
              )}
            </div>
            <span className="text-sm text-neutral-600">
              {showFilters ? 'Masquer' : 'Afficher'}
            </span>
          </button>

          {showFilters && (
            <div className="mt-4 space-y-4 pt-4 border-t border-neutral-200">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Globe2 className="w-4 h-4" />
                  Catégorie
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.name_fr ? '' : category.name_fr)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.name_fr
                          ? 'text-white shadow-md'
                          : 'bg-white border-2 text-neutral-700 hover:border-orange-300'
                      }`}
                      style={selectedCategory === category.name_fr ? {
                        backgroundColor: category.color
                      } : {}}
                    >
                      {category.name_fr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Globe2 className="w-4 h-4" />
                  Langue
                </label>
                <div className="flex flex-wrap gap-2">
                  {languages.map(language => (
                    <button
                      key={language.code}
                      onClick={() => setSelectedLanguage(selectedLanguage === language.code ? '' : language.code)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedLanguage === language.code
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:border-emerald-300'
                      }`}
                    >
                      {language.native_name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Quartier
                </label>
                <input
                  type="text"
                  placeholder="Ex: Medina, Plateau, etc."
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Effacer tous les filtres
                </button>
              )}
            </div>
          )}
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : listings.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe2 className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Aucune annonce trouvée
            </h3>
            <p className="text-neutral-600 mb-4">
              Essayez de modifier vos filtres ou soyez le premier à publier !
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {listings.map(listing => (
              <AudioPlayerCard
                key={listing.id}
                id={listing.id}
                audioUrl={listing.audio_url}
                duration={listing.audio_duration || 0}
                category={listing.category}
                language={listing.language}
                neighborhood={listing.neighborhood || undefined}
                contactPhone={listing.contact_phone || undefined}
                contactWhatsApp={listing.contact_whatsapp || undefined}
                categoryColor={getCategoryColor(listing.category)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
