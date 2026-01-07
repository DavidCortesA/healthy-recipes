'use client';
import { useState } from 'react';
import { Home, BookOpen, Heart, User, Settings, LogOut, ChefHat, TrendingUp, Bookmark, Users, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  badge?: number | string | null;
}

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('home');

  const user = {
    name: 'María García',
    email: 'maria@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    recipes: 45,
    followers: 1234
  };

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Inicio',
      icon: Home,
      href: '/',
      badge: null
    },
    {
      id: 'explore',
      label: 'Explorar Recetas',
      icon: BookOpen,
      href: '/recipes',
      badge: null
    },
    {
      id: 'trending',
      label: 'Tendencias',
      icon: TrendingUp,
      href: '/recipes?sort=trending',
      badge: '🔥'
    }
  ];

  const userMenuItems = [
    {
      id: 'my-recipes',
      label: 'Mis Recetas',
      icon: ChefHat,
      href: '/profile/my-recipes',
      badge: user.recipes
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: Heart,
      href: '/profile/favorites',
      badge: null
    },
    {
      id: 'saved',
      label: 'Guardados',
      icon: Bookmark,
      href: '/profile/saved',
      badge: null
    },
    {
      id: 'following',
      label: 'Siguiendo',
      icon: Users,
      href: '/profile/following',
      badge: null
    }
  ];

  const bottomMenuItems = [
    {
      id: 'profile',
      label: 'Mi Perfil',
      icon: User,
      href: '/profile',
      badge: null
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: Settings,
      href: '/profile/settings',
      badge: null
    }
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-border sticky top-0 flex flex-col">
      
      {/* User Info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-primary-500"
            width={48}
            height={48}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-neutral-900 truncate">{user.name}</h3>
            <p className="text-sm text-neutral-600 truncate">{user.email}</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4 text-center">
          <div className="flex-1">
            <p className="text-lg font-bold text-neutral-900">{user.recipes}</p>
            <p className="text-xs text-neutral-600">Recetas</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-neutral-900">{user.followers}</p>
            <p className="text-xs text-neutral-600">Seguidores</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {/* CTA Button */}
          <Link
            href="/recipes/new"
            className="flex items-center gap-3 px-4 py-3 mb-4 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-button"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Nueva Receta</span>
          </Link>

          {/* Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  typeof item.badge === 'number' ? (
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
                      {item?.badge}
                    </span>
                  ) : (
                    <span className="text-sm">{item.badge}</span>
                  )
                )}
              </a>
            );
          })}

          {/* Divider */}
          <div className="py-2">
            <div className="border-t border-border"></div>
          </div>

          {/* User Menu Items */}
          <div className="space-y-1">
            <p className="px-4 py-2 text-xs font-bold text-neutral-500 uppercase">
              Mi Cuenta
            </p>
            {userMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-xs font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="p-3 border-t border-border space-y-1">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          );
        })}
        
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error-light/10 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}