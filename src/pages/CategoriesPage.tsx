import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { supabase } from '../lib/supabase';

interface Category {
  id: string;
  name_fr: string;
  name_en: string;
  icon_name: string;
  color: string;
}

interface CategoriesPageProps {
  onNavigate: (page: string) => void;
}

export function CategoriesPage({ onNavigate }: CategoriesPageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');

    if (data) setCategories(data);
    setLoading(false);
  };

  const getIconEmoji = (iconName: string) => {
    const icons: Record<string, string> = {
      'briefcase': '💼',
      'home': '🏠',
      'wrench': '🔧',
      'shopping-bag': '🛍️',
      'car': '🚗',
      'users': '👥'
    };
    return icons[iconName] || '📌';
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-8">
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Catégories
          </h1>
          <p className="text-orange-100 text-lg">
            Explorez par type d'annonce
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map(category => (
              <Card
                key={category.id}
                hover
                onClick={() => onNavigate('explore')}
                className="p-8 text-center cursor-pointer group"
              >
                <div
                  className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center text-4xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {getIconEmoji(category.icon_name)}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: category.color }}
                >
                  {category.name_fr}
                </h3>
                <p className="text-sm text-neutral-600">
                  {category.name_en}
                </p>
                <div
                  className="mt-4 h-1 w-12 mx-auto rounded-full transition-all group-hover:w-full"
                  style={{ backgroundColor: category.color }}
                />
              </Card>
            ))}
          </div>
        )}

        <Card className="mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">
              Vous ne trouvez pas votre catégorie ?
            </h2>
            <p className="text-neutral-600 mb-6">
              Publiez votre annonce dans la catégorie la plus proche. Notre équipe travaille constamment à ajouter de nouvelles options.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
