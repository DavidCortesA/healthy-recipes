'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Cambia a true para ver usuario autenticado
  const route = useRouter();

  const handleLogin = () => {
    // Lógica para ir a login
    route.push('/login');
  };

  const handleRegister = () => {
    // Lógica para ir a register
    route.push('/register');
  }
  
  const user = {
    name: 'María García',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Izquierda */}
          <div className="flex items-center gap-2 shrink-0">
            <Image 
              src="https://res.cloudinary.com/doum2jzkj/image/upload/green_heart_with_leaf_ziw7ab.png" 
              alt="Logo Recetas Saludables"
              className="w-10 h-10"
              width={32}
              height={32}
              priority
            />
          </div>

          {/* Links del medio - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/" 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="#sobre-nosotros" 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Sobre Nosotros
            </Link>
            <Link 
              href="#recetas" 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Recetas
            </Link>
          </div>

          {/* Botones de autenticación / Usuario - Derecha - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={handleLogin}>
                  Iniciar Sesión
                </Button>
                <Button variant="primary" onClick={handleRegister}>
                  Registrarse
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button className="relative group">
                  {user.avatar ? (
                    <Image 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-primary-500 hover:border-primary-600 transition-colors cursor-pointer"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold hover:bg-primary-600 transition-colors cursor-pointer">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-card border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-border">
                      <p className="font-medium text-neutral-900">{user.name}</p>
                      <p className="text-sm text-neutral-500">Ver perfil</p>
                    </div>
                    <a href="#mis-recetas" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 transition-colors">
                      Mis Recetas
                    </a>
                    <a href="#favoritos" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 transition-colors">
                      Favoritos
                    </a>
                    <a href="#configuracion" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 transition-colors">
                      Configuración
                    </a>
                    <button 
                      onClick={() => setIsAuthenticated(false)}
                      className="w-full text-left px-4 py-2 text-error hover:bg-error-light/10 transition-colors border-t border-border"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Botón de menú móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-neutral-700" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-700" />
            )}
          </button>
        </div>

        {/* Menú móvil */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-border">
            <a
              href="#inicio"
              className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
              onClick={toggleMenu}
            >
              Inicio
            </a>
            <a
              href="#sobre-nosotros"
              className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
              onClick={toggleMenu}
            >
              Sobre Nosotros
            </a>
            <a
              href="#recetas"
              className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
              onClick={toggleMenu}
            >
              Recetas
            </a>

            {/* Usuario / Auth - Móvil */}
            <div className="pt-4 border-t border-border mt-4">
              {!isAuthenticated ? (
                <div className="space-y-2 px-4">
                  <button 
                    onClick={() => {
                      setIsAuthenticated(true);
                      toggleMenu();
                    }}
                    className="w-full text-center text-primary-600 hover:text-primary-700 font-medium px-4 py-3 rounded-lg hover:bg-primary-50 transition-all border border-primary-500"
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    className="w-full btn-primary"
                    onClick={toggleMenu}
                  >
                    Registrarse
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 rounded-lg">
                    {user.avatar ? (
                      <Image 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-primary-500"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">{user.name}</p>
                      <p className="text-sm text-neutral-600">Ver perfil</p>
                    </div>
                  </div>
                  <a 
                    href="#mis-recetas" 
                    className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    Mis Recetas
                  </a>
                  <a 
                    href="#favoritos" 
                    className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    Favoritos
                  </a>
                  <a 
                    href="#configuracion" 
                    className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    Configuración
                  </a>
                  <button 
                    onClick={() => {
                      setIsAuthenticated(false);
                      toggleMenu();
                    }}
                    className="w-full text-left px-4 py-3 text-error hover:bg-error-light/10 rounded-lg transition-colors border-t border-border mt-2"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}