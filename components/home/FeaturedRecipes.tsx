import { ArrowRight, Clock, Flame, Heart, Star, Users } from "lucide-react";
import Image from "next/image";

export default function FeaturedRecipes() {
  const featuredRecipes = [
    {
      id: 1,
      title: 'Bowl de Quinoa y Aguacate',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      category: 'Almuerzo',
      time: 25,
      servings: 2,
      difficulty: 'Fácil',
      calories: 380,
      rating: 4.8,
      author: 'María García',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    },
    {
      id: 2,
      title: 'Salmón a la Plancha con Vegetales',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
      category: 'Cena',
      time: 30,
      servings: 4,
      difficulty: 'Media',
      calories: 420,
      rating: 4.9,
      author: 'Carlos López',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
    },
    {
      id: 3,
      title: 'Smoothie Bowl de Frutas',
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
      category: 'Desayuno',
      time: 10,
      servings: 1,
      difficulty: 'Fácil',
      calories: 250,
      rating: 4.7,
      author: 'Ana Martínez',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
    }
  ];

  return (
    <section className="section bg-amber-50">
      <div className="container-app">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Recetas Destacadas
            </h2>
            <p className="text-lg text-neutral-600">
              Las favoritas de nuestra comunidad
            </p>
          </div>
          <button className="btn-ghost hidden md:flex items-center gap-2">
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.id} className="card-recipe group cursor-pointer">
              <div className="relative overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  width={400}
                  height={224}
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="badge badge-primary">{recipe.category}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={recipe.authorAvatar}
                    alt={recipe.author}
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-sm text-neutral-600">{recipe.author}</span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {recipe.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} porciones</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>{recipe.calories} cal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-secondary-500 fill-secondary-500" />
                    <span className="font-bold text-neutral-900">{recipe.rating}</span>
                  </div>
                  <span className={`badge ${
                    recipe.difficulty === 'Fácil' ? 'badge-success' : 
                    recipe.difficulty === 'Media' ? 'badge-warning' : 
                    'badge-error'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <button className="btn-primary">
            Ver todas las recetas
          </button>
        </div>
      </div>
    </section>
  );
}