'use client';
import { useState } from "react";
import { Recipe } from "@/types/recipe";
import Image from "next/image";
import { Heart, Clock, Users, Flame, Star, Bookmark } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'default' | 'compact' | 'featured';
  onFavorite?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function RecipeCard({
  recipe,
  variant = 'default',
  onFavorite,
  onBookmark,
  onClick
}: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);
  const [isBookmarked, setIsBookmarked] = useState(recipe.isBookmarked || false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite?.(recipe.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(recipe.id);
  };

  const handleClick = () => {
    onClick?.(recipe.id);
  };

  const difficultyColors = {
    'Fácil': 'badge-success',
    'Media': 'badge-warning',
    'Difícil': 'badge-error'
  };

  // Variante Compacta (para listas)
  if (variant === 'compact') {
    return (
      <div
        onClick={handleClick}
        className="flex gap-4 bg-white rounded-xl p-4 hover:shadow-card-hover transition-shadow cursor-pointer border border-border w-full"
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          className="w-24 h-24 rounded-lg object-cover shrink-0"
          width={96}
          height={96}
          priority
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-neutral-900 mb-1 truncate hover:text-primary-600 transition-colors">
            {recipe.title}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="w-5 h-5 rounded-full"
              width={20}
              height={20}
            />
            <span className="text-sm text-neutral-600 truncate">{recipe.author.name}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime + recipe.cookTime}min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-secondary-500 fill-secondary-500" />
              <span>{recipe.rating}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleFavorite}
          className={`p-2 h-fit rounded-full transition-colors ${
            isFavorite ? 'bg-primary-100 text-primary-600' : 'hover:bg-neutral-100'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
    );
  }

  // Variante Featured (destacada, más grande)
  if (variant === 'featured') {
    return (
      <div
        onClick={handleClick}
        className="card-recipe cursor-pointer overflow-hidden"
      >
        <div className="relative h-80">
          <Image
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            width={640}
            height={320}
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="badge badge-primary backdrop-blur-sm bg-primary-500/90 text-white">
              {recipe.category}
            </span>
            {recipe.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="badge bg-white/20 backdrop-blur-sm text-white">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleFavorite}
              className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                isFavorite ? 'bg-primary-500 text-white' : 'bg-white/90 text-neutral-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleBookmark}
              className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                isBookmarked ? 'bg-secondary-500 text-white' : 'bg-white/90 text-neutral-700 hover:bg-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Info superpuesta */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                width={32}
                height={32}
              />
              <span className="font-medium">{recipe.author.name}</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 line-clamp-2">{recipe.title}</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} porciones</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{recipe.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variante Default (card normal)
  return (
    <div
      onClick={handleClick}
      className="card-recipe group cursor-pointer"
    >
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
          width={640}
          height={320}
          priority
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary">{recipe.category}</span>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleFavorite}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isFavorite ? 'bg-primary-500 text-white' : 'bg-white/90 text-neutral-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleBookmark}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isBookmarked ? 'bg-secondary-500 text-white' : 'bg-white/90 text-neutral-700 hover:bg-white'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
        {/* Author */}
        <div className="flex items-center gap-2">
          <Image
            src={recipe.author.avatar}
            alt={recipe.author.name}
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
          <span className="text-sm text-neutral-600">{recipe.author.name}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {recipe.title}
        </h3>

        {/* Description */}
        {recipe.description && (
          <p className="text-sm text-neutral-600 line-clamp-2">
            {recipe.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>{recipe.calories} cal</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-secondary-500 fill-secondary-500" />
            <span className="font-bold text-neutral-900">{recipe.rating}</span>
            <span className="text-sm text-neutral-600">({recipe.reviewsCount})</span>
          </div>
          <span className={`badge ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}