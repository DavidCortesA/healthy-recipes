export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  calories: number;
  rating: number;
  reviewsCount: number;
  isFavorite?: boolean;
  isBookmarked?: boolean;
  tags?: string[];
}