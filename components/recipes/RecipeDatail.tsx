'use client';
import { useState } from 'react';
import { Heart, Clock, Users, Flame, Star, Bookmark, Share2, Printer, Check } from 'lucide-react';

export default function RecipeDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Datos de ejemplo
  const recipe = {
    id: '1',
    title: 'Salmón a la Plancha con Vegetales Asados',
    description: 'Un plato saludable y delicioso, perfecto para una cena nutritiva. El salmón es rico en omega-3 y los vegetales aportan fibra y vitaminas esenciales.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200',
    author: {
      name: 'María García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      recipes: 45
    },
    stats: {
      prep_time: 15,
      cook_time: 25,
      total_time: 40,
      servings: 4,
      difficulty: 'Media',
      rating: 4.8,
      reviews: 124
    },
    nutrition: {
      calories: 420,
      protein: 38,
      carbs: 22,
      fat: 18,
      fiber: 6
    },
    category: 'Cena',
    tags: ['Saludable', 'Alto en Proteína', 'Sin Gluten', 'Keto'],
    ingredients: [
      { name: 'Filete de salmón', quantity: 600, unit: 'gr', group: 'Proteína' },
      { name: 'Brócoli', quantity: 300, unit: 'gr', group: 'Vegetales' },
      { name: 'Zanahoria', quantity: 200, unit: 'gr', group: 'Vegetales' },
      { name: 'Calabacín', quantity: 2, unit: 'piezas', group: 'Vegetales' },
      { name: 'Aceite de oliva', quantity: 3, unit: 'cucharadas', group: 'Condimentos' },
      { name: 'Limón', quantity: 2, unit: 'piezas', group: 'Condimentos' },
      { name: 'Ajo en polvo', quantity: 1, unit: 'cucharadita', group: 'Especias' },
      { name: 'Sal', quantity: 1, unit: 'al gusto', group: 'Especias' },
      { name: 'Pimienta negra', quantity: 1, unit: 'al gusto', group: 'Especias' }
    ],
    instructions: [
      { step: 1, description: 'Precalienta el horno a 200°C. Lava y corta todos los vegetales en trozos medianos.' },
      { step: 2, description: 'Coloca los vegetales en una bandeja para hornear. Rocía con 2 cucharadas de aceite de oliva, sal y pimienta. Mezcla bien.' },
      { step: 3, description: 'Hornea los vegetales durante 20-25 minutos hasta que estén tiernos y ligeramente dorados.' },
      { step: 4, description: 'Mientras tanto, sazona el salmón con sal, pimienta, ajo en polvo y el jugo de un limón.' },
      { step: 5, description: 'Calienta una sartén con la cucharada restante de aceite de oliva a fuego medio-alto.' },
      { step: 6, description: 'Cocina el salmón 4-5 minutos por cada lado hasta que esté dorado y cocido a tu gusto.' },
      { step: 7, description: 'Sirve el salmón junto con los vegetales asados. Decora con rodajas de limón.' }
    ]
  };

  const toggleStep = (step: number) => {
    if (completedSteps.includes(step)) {
      setCompletedSteps(completedSteps.filter(s => s !== step));
    } else {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const adjustServings = (newServings: number) => {
    setServings(Math.max(1, newServings));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        
        {/* Floating Actions */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isFavorite ? 'bg-primary-500 text-white' : 'bg-white/90 text-neutral-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Share2 className="w-5 h-5 text-neutral-700" />
          </button>
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Bookmark className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container-app">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-primary">{recipe.category}</span>
              {recipe.tags.map((tag) => (
                <span key={tag} className="badge bg-white/20 backdrop-blur-sm text-white">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {recipe.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card text-center">
                <Clock className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-neutral-900">{recipe.stats.total_time}</p>
                <p className="text-sm text-neutral-600">Minutos</p>
              </div>
              <div className="card text-center">
                <Users className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-neutral-900">{recipe.stats.servings}</p>
                <p className="text-sm text-neutral-600">Porciones</p>
              </div>
              <div className="card text-center">
                <Flame className="w-6 h-6 text-secondary-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-neutral-900">{recipe.nutrition.calories}</p>
                <p className="text-sm text-neutral-600">Calorías</p>
              </div>
              <div className="card text-center">
                <Star className="w-6 h-6 text-secondary-500 mx-auto mb-2 fill-secondary-500" />
                <p className="text-2xl font-bold text-neutral-900">{recipe.stats.rating}</p>
                <p className="text-sm text-neutral-600">{recipe.stats.reviews} reseñas</p>
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Descripción</h2>
              <p className="text-neutral-700 leading-relaxed">{recipe.description}</p>
            </div>

            {/* Ingredients */}
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Ingredientes</h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-600">Porciones:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustServings(servings - 1)}
                      className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-neutral-900">{servings}</span>
                    <button
                      onClick={() => adjustServings(servings + 1)}
                      className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Grouped Ingredients */}
              {['Proteína', 'Vegetales', 'Condimentos', 'Especias'].map((group) => {
                const groupIngredients = recipe.ingredients.filter(i => i.group === group);
                if (groupIngredients.length === 0) return null;
                
                return (
                  <div key={group} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-bold text-primary-700 mb-3">{group}</h3>
                    <div className="space-y-2">
                      {groupIngredients.map((ingredient, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <span className="text-neutral-700">{ingredient.name}</span>
                          <span className="font-medium text-neutral-900">
                            {(ingredient.quantity * servings / recipe.stats.servings).toFixed(0)} {ingredient.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="card">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Instrucciones</h2>
              <div className="space-y-4">
                {recipe.instructions.map((instruction) => (
                  <div
                    key={instruction.step}
                    className={`flex gap-4 p-4 rounded-lg transition-colors ${
                      completedSteps.includes(instruction.step)
                        ? 'bg-primary-50 border-2 border-primary-200'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    <button
                      onClick={() => toggleStep(instruction.step)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        completedSteps.includes(instruction.step)
                          ? 'bg-primary-500 text-white'
                          : 'bg-white border-2 border-neutral-300'
                      }`}
                    >
                      {completedSteps.includes(instruction.step) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="font-bold text-sm">{instruction.step}</span>
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`leading-relaxed ${
                        completedSteps.includes(instruction.step)
                          ? 'text-neutral-600 line-through'
                          : 'text-neutral-700'
                      }`}>
                        {instruction.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Author Card */}
            <div className="card">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-neutral-900">{recipe.author.name}</h3>
                  <p className="text-sm text-neutral-600">{recipe.author.recipes} recetas</p>
                </div>
              </div>
              <button className="btn-primary w-full">
                Seguir
              </button>
            </div>

            {/* Nutrition Info */}
            <div className="card">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Información Nutricional</h3>
              <p className="text-sm text-neutral-600 mb-4">Por porción</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Calorías</span>
                  <span className="font-bold text-neutral-900">{recipe.nutrition.calories} kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Proteína</span>
                  <span className="font-bold text-neutral-900">{recipe.nutrition.protein}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Carbohidratos</span>
                  <span className="font-bold text-neutral-900">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Grasas</span>
                  <span className="font-bold text-neutral-900">{recipe.nutrition.fat}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Fibra</span>
                  <span className="font-bold text-neutral-900">{recipe.nutrition.fiber}g</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="btn-outline w-full flex items-center justify-center gap-2">
                <Printer className="w-5 h-5" />
                Imprimir Receta
              </button>
              <button className="btn-ghost w-full flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}