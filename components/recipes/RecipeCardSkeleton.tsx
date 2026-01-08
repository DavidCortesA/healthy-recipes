export function RecipeCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'featured' }) {
  if (variant === 'compact') {
    return (
      <div className="flex gap-4 bg-white rounded-xl p-4 border border-border">
        <div className="w-24 h-24 rounded-lg bg-neutral-200 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-neutral-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card">
      <div className="w-full h-56 bg-neutral-200 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-24" />
        </div>
        <div className="h-6 bg-neutral-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
        <div className="flex gap-4">
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-16" />
        </div>
      </div>
    </div>
  );
}