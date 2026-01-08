'use client'
import { Recipe } from "@/types/recipe";
import RecipeGrid from "@/components/recipes/RecipeGrid";

export default function RecipesPage() {
  const sampleRecipes: Recipe[] = Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Receta Deliciosa ${i + 1}`,
    description: 'Una receta saludable y deliciosa que te encantará.',
    image: `https://images.unsplash.com/photo-${1546069901 + i * 1000}-ba9599a7e63c?w=800`,
    author: {
      name: `Chef ${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Chef${i}`
    },
    category: ['Desayuno', 'Almuerzo', 'Cena'][i % 3],
    prepTime: 10 + (i % 5) * 5,
    cookTime: 20 + (i % 4) * 10,
    servings: 2 + (i % 3),
    difficulty: (['Fácil', 'Media', 'Difícil'] as const)[i % 3],
    calories: 300 + i * 20,
    rating: 4 + (i % 10) / 10,
    reviewsCount: 50 + i * 10,
    tags: ['Saludable', 'Rápido', 'Vegano'].slice(0, (i % 3) + 1)
  }));

  return (
    <div className="p-8 min-h-screen w-full bg-neutral-50">
      <div className="container-app w-full mx-auto">
        <h1 className="text-4xl font-bold mb-2">Explorar Recetas</h1>
        <p className="text-neutral-600 mb-8">
          Descubre recetas deliciosas y saludables
        </p>

        <RecipeGrid
          recipes={sampleRecipes}
          columns={3}
          showViewToggle
          showPagination
          itemsPerPage={9}
          onRecipeClick={(id) => console.log('Recipe clicked:', id)}
          onFavorite={(id) => console.log('Favorite:', id)}
          onBookmark={(id) => console.log('Bookmark:', id)}
        />
      </div>
    </div>
  );
}