'use client'

import { useState } from 'react';
import { X, ChevronDown, Filter, RotateCcw } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface FilterOptions {
  categories: string[];
  difficulties: string[];
  mealTypes: string[];
  maxTime: number;
  maxCalories: number;
}

export interface ActiveFilters {
  category?: string;
  difficulty?: string;
  mealType?: string;
  maxTime?: number;
  maxCalories?: number;
  searchTags: string[];
}

interface RecipeFiltersProps {
  onFiltersChange: (filters: ActiveFilters) => void;
  options?: FilterOptions;
}

const defaultOptions: FilterOptions = {
  categories: ['Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Postre', 'Bebida'],
  difficulties: ['Fácil', 'Media', 'Difícil'],
  mealTypes: ['Vegano', 'Vegetariano', 'Sin Gluten', 'Keto', 'Paleo', 'Bajo en Carbohidratos'],
  maxTime: 120,
  maxCalories: 1000
};

export default function RecipeFilters({ onFiltersChange, options = defaultOptions }: RecipeFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<ActiveFilters>({
    searchTags: []
  });

  const updateFilters = (newFilters: Partial<ActiveFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const resetFilters = () => {
    const reset: ActiveFilters = { searchTags: [] };
    setFilters(reset);
    onFiltersChange(reset);
  };

  const removeTag = (tag: string) => {
    updateFilters({
      searchTags: filters.searchTags.filter(t => t !== tag)
    });
  };

  const addTag = (tag: string) => {
    if (!filters.searchTags.includes(tag)) {
      updateFilters({
        searchTags: [...filters.searchTags, tag]
      });
    }
  };

  const activeFiltersCount = [
    filters.category,
    filters.difficulty,
    filters.mealType,
    filters.maxTime,
    filters.maxCalories,
    ...filters.searchTags
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className={`${activeFiltersCount > 0 ? 'pb-4 mb-1' : 'pb-12 mb-0'}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-outline w-full flex items-center justify-between h-12"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center lg:col-span-1">
              <Filter className="w-5 h-5" />
            </div>
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters Panel */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Filtros">
        {/* Header */}
        <div className="flex items-center justify-end relative">
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium absolute right-0 top-0 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Limpiar
            </button>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Categoría
          </label>
          <div className="grid grid-cols-2 gap-2">
            {options.categories.map((category) => (
              <button
                key={category}
                onClick={() => updateFilters({
                  category: filters.category === category ? undefined : category
                })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.category === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Dificultad
          </label>
          <div className="flex gap-2">
            {options.difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => updateFilters({
                  difficulty: filters.difficulty === difficulty ? undefined : difficulty
                })}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.difficulty === difficulty
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Tipo de Dieta
          </label>
          <div className="grid grid-cols-2 gap-2">
            {options.mealTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateFilters({
                  mealType: filters.mealType === type ? undefined : type
                })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.mealType === type
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Time Range */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Tiempo Máximo: {filters.maxTime || options.maxTime} min
          </label>
          <input
            type="range"
            min="10"
            max={options.maxTime}
            step="5"
            value={filters.maxTime || options.maxTime}
            onChange={(e) => updateFilters({ maxTime: parseInt(e.target.value) })}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-xs text-neutral-600 mt-1">
            <span>10 min</span>
            <span>{options.maxTime} min</span>
          </div>
        </div>

        {/* Calories Range */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Calorías Máximas: {filters.maxCalories || options.maxCalories} kcal
          </label>
          <input
            type="range"
            min="100"
            max={options.maxCalories}
            step="50"
            value={filters.maxCalories || options.maxCalories}
            onChange={(e) => updateFilters({ maxCalories: parseInt(e.target.value) })}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-xs text-neutral-600 mt-1">
            <span>100 kcal</span>
            <span>{options.maxCalories} kcal</span>
          </div>
        </div>

        {/* Quick Tags */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Etiquetas Rápidas
          </label>
          <div className="flex flex-wrap gap-2">
            {['Rápido', 'Saludable', 'Económico', 'Alto en Proteína', 'Bajo en Sodio'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (filters.searchTags.includes(tag)) {
                    removeTag(tag);
                  } else {
                    addTag(tag);
                  }
                }}
                className={`badge ${
                  filters.searchTags.includes(tag)
                    ? 'badge-primary'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tag}
                {filters.searchTags.includes(tag) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Active Filters Pills */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <span className="badge badge-primary">
              {filters.category}
              <button onClick={() => updateFilters({ category: undefined })} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.difficulty && (
            <span className="badge badge-primary">
              {filters.difficulty}
              <button onClick={() => updateFilters({ difficulty: undefined })} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.mealType && (
            <span className="badge badge-primary">
              {filters.mealType}
              <button onClick={() => updateFilters({ mealType: undefined })} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.maxTime && filters.maxTime < options.maxTime && (
            <span className="badge badge-primary">
              ≤ {filters.maxTime} min
              <button onClick={() => updateFilters({ maxTime: undefined })} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.maxCalories && filters.maxCalories < options.maxCalories && (
            <span className="badge badge-primary">
              ≤ {filters.maxCalories} cal
              <button onClick={() => updateFilters({ maxCalories: undefined })} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.searchTags.map((tag) => (
            <span key={tag} className="badge badge-primary">
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}