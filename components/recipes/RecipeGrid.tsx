'use client';
import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCardSkeleton } from "./RecipeCardSkeleton";
import { LayoutGrid, List } from "lucide-react";
import RecipeCard from "./RecipeCard";
import { Pagination } from "../ui/Pagination";
import RecipeFilters, { ActiveFilters } from "./RecipeFilters";

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
  showViewToggle?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  emptyState?: React.ReactNode;
  onRecipeClick?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onBookmark?: (id: string) => void;
}

export default function RecipeGrid({
  recipes,
  isLoading = false,
  columns = 3,
  showViewToggle = true,
  showPagination = true,
  itemsPerPage = 12,
  onRecipeClick,
  onFavorite,
  onBookmark
}: RecipeGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  // Current recipes to display
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredRecipes(recipes);
    setCurrentPage(1);
  }, [recipes]);

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipesToDisplay = filteredRecipes.slice(startIndex, endIndex);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {showViewToggle && (
          <div className="flex justify-end">
            <div className="h-10 w-24 bg-neutral-200 rounded-lg animate-pulse" />
          </div>
        )}
        <div className={`grid grid-cols-1 ${columnClasses[columns]} gap-6`}>
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <RecipeCardSkeleton key={i} variant={viewMode === 'list' ? 'compact' : 'default'} />
          ))}
        </div>
      </div>
    );
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: ActiveFilters) => {
    setCurrentPage(1);
    const filtered = recipes.filter((recipe) => {
      let matches = true;
      if (newFilters.category && recipe.category !== newFilters.category) matches = false;
      if (newFilters.difficulty && recipe.difficulty !== newFilters.difficulty) matches = false;
      if (newFilters.mealType && !(recipe.tags?.includes(newFilters.mealType))) matches = false;
      if (newFilters.maxCalories && recipe.calories > newFilters.maxCalories) matches = false;
      
      if (newFilters.searchTags && newFilters.searchTags.length > 0) {
        const tagMatch = newFilters.searchTags.every(tag => recipe.tags?.includes(tag));
        if (!tagMatch) matches = false;
      }
      
      if (newFilters.maxTime && (recipe.prepTime + recipe.cookTime) > newFilters.maxTime) matches = false;
      
      return matches;
    });
    setFilteredRecipes(filtered);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header con view toggle */}
      {showViewToggle && (
        <div className="flex justify-between items-center">
          <RecipeFilters onFiltersChange={handleFilterChange} />
          <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Grid de recetas */}
      <div className={
        viewMode === 'list'
          ? 'space-y-4'
          : `grid grid-cols-1 ${columnClasses[columns]} gap-6`
      }>
        {currentRecipesToDisplay.length > 0&& (
          currentRecipesToDisplay.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              variant={viewMode === 'list' ? 'compact' : 'default'}
              onClick={() => onRecipeClick?.(recipe.id)}
              onFavorite={() => onFavorite?.(recipe.id)}
              onBookmark={() => onBookmark?.(recipe.id)}
            />
          ))
        )}
      </div>

      {/* No results found after filtering */}
      {currentRecipesToDisplay.length === 0 && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">No se encontraron recetas</h3>
            <p className="text-neutral-600">
              No se encontraron recetas con los filtros seleccionados.
            </p>
          </div>
        </div>
      )}



      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}