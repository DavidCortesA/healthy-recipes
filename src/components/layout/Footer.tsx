'use client';
import { useState } from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube, Moon, Sun, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    // Aquí integrarías con i18n
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${darkMode ? 'dark' : ''} bg-neutral-900 text-neutral-300 transition-colors duration-300`}>
      {/* Sección principal del footer */}
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Columna 1: Sobre nosotros */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image 
                src="https://res.cloudinary.com/doum2jzkj/image/upload/green_heart_with_leaf_ziw7ab.png" 
                alt="Logo Recetas Saludables"
                className="w-10 h-10"
                width={32}
                height={32}
                priority
              />
              <span className="text-xl font-bold text-white">
                Recetas Saludables
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Descubre y comparte recetas saludables que transformarán tu vida. 
              Cocina con amor, vive con salud.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3 pt-2">
              <a 
                href="#facebook" 
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#instagram" 
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#twitter" 
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#youtube" 
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-primary-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#recetas" className="hover:text-primary-400 transition-colors">
                  Explorar Recetas
                </a>
              </li>
              <li>
                <a href="#categorias" className="hover:text-primary-400 transition-colors">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#sobre-nosotros" className="hover:text-primary-400 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-primary-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Categorías populares */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Categorías</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#veganas" className="hover:text-primary-400 transition-colors">
                  Recetas Veganas
                </a>
              </li>
              <li>
                <a href="#vegetarianas" className="hover:text-primary-400 transition-colors">
                  Vegetarianas
                </a>
              </li>
              <li>
                <a href="#sin-gluten" className="hover:text-primary-400 transition-colors">
                  Sin Gluten
                </a>
              </li>
              <li>
                <a href="#keto" className="hover:text-primary-400 transition-colors">
                  Keto
                </a>
              </li>
              <li>
                <a href="#postres" className="hover:text-primary-400 transition-colors">
                  Postres Saludables
                </a>
              </li>
              <li>
                <a href="#desayunos" className="hover:text-primary-400 transition-colors">
                  Desayunos
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto y configuración */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span>Monterrey, Nuevo León, México</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                <span>+52 81 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                <a href="mailto:info@recetas.com" className="hover:text-primary-400 transition-colors">
                  info@recetas.com
                </a>
              </li>
            </ul>

            {/* Selector de idioma */}
            <div className="pt-4">
              <label className="block text-sm font-medium text-white mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Idioma
              </label>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
              </select>
            </div>

            {/* Toggle modo oscuro */}
            <div className="flex items-center justify-between bg-neutral-800 rounded-lg px-4 py-3">
              <span className="text-sm font-medium text-white">Modo Oscuro</span>
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  darkMode ? 'bg-primary-500' : 'bg-neutral-600'
                }`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform flex items-center justify-center ${
                    darkMode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                >
                  {darkMode ? (
                    <Moon className="w-3 h-3 text-primary-500" />
                  ) : (
                    <Sun className="w-3 h-3 text-neutral-600" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Suscríbete a nuestro Newsletter
            </h3>
            <p className="text-sm mb-4">
              Recibe las mejores recetas y tips de nutrición directo en tu correo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="btn-primary whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-neutral-800">
        <div className="container-app py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-neutral-400">
              © {currentYear} Recetas Saludables. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#privacidad" className="text-neutral-400 hover:text-primary-400 transition-colors">
                Política de Privacidad
              </a>
              <a href="#terminos" className="text-neutral-400 hover:text-primary-400 transition-colors">
                Términos de Uso
              </a>
              <a href="#cookies" className="text-neutral-400 hover:text-primary-400 transition-colors">
                Cookies
              </a>
              <a href="#ayuda" className="text-neutral-400 hover:text-primary-400 transition-colors">
                Ayuda
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de "volver arriba" */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Volver arriba"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}