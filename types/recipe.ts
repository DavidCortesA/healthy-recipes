export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  author: {
    name: string;
    avatar: string;
  };
  total_time: number;
  category: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  calories: number;
  rating: number;
  reviewsCount: number;
  isFavorite?: boolean;
  isBookmarked?: boolean;
  tags?: string[];
}