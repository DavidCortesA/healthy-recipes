import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className = ''
}: AvatarProps) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const statusColors = {
    online: 'bg-success',
    offline: 'bg-neutral-400',
    away: 'bg-warning'
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          className={`${sizes[size]} rounded-full object-cover border-2 border-white`}
          width={sizes[size].split(' ')[1] as unknown as number}
          height={sizes[size].split(' ')[2] as unknown as number}
          priority
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-primary-500 text-white font-bold flex items-center justify-center border-2 border-white`}
        >
          {name ? getInitials(name) : '?'}
        </div>
      )}
      
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white`}
        />
      )}
    </div>
  );
}