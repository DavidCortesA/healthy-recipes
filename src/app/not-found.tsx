import { Home, Search, ArrowLeft, ChefHat } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Illustration */}
        <div className="mb-8 relative">
          <div className="text-[180px] md:text-[240px] font-bold text-primary-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-xl">
              <ChefHat className="w-16 h-16 md:w-20 md:h-20 text-primary-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              ¡Ups! Receta No Encontrada
            </h1>
            <p className="text-lg text-neutral-600 max-w-md mx-auto">
              Parece que esta receta se quemó en el horno. La página que buscas no existe o fue movida.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-2xl p-6 shadow-card max-w-md mx-auto">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              ¿Qué tal si intentas con estas opciones?
            </h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary-700 text-sm">✓</span>
                </span>
                <span className="text-neutral-700">
                  Verifica que la URL esté escrita correctamente
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary-700 text-sm">✓</span>
                </span>
                <span className="text-neutral-700">
                  Usa el buscador para encontrar recetas similares
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary-700 text-sm">✓</span>
                </span>
                <span className="text-neutral-700">
                  Regresa a la página principal y explora
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link
              href="/"
              className="btn-primary flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ir al Inicio
            </Link>
            <Link
              href="/recipes"
              className="btn-outline flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Explorar Recetas
            </Link>
          </div>

          {/* Go Back */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la página anterior
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-8 opacity-50">
          <div className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>
            🥗
          </div>
          <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>
            🍳
          </div>
          <div className="text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>
            🥘
          </div>
        </div>
      </div>
    </div>
  );
}

// Versión alternativa: 404 más simple
export function NotFoundSimple() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary-500">404</h1>
          <h2 className="text-3xl font-bold text-neutral-900">
            Página No Encontrada
          </h2>
          <p className="text-lg text-neutral-600">
            Lo sentimos, no pudimos encontrar lo que buscabas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Volver al Inicio
          </Link>
          <Link href="/recipes" className="btn-outline">
            Ver Recetas
          </Link>
        </div>
      </div>
    </div>
  );
}

// Versión con animación de chef cocinando
export function NotFoundAnimated() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        
        {/* Animated Chef */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse-subtle">
            <ChefHat className="w-24 h-24 text-primary-500" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-8xl animate-bounce" style={{ animationDelay: '0s' }}>
              😅
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900">
            ¡Receta Perdida!
          </h1>
          <p className="text-xl text-neutral-600">
            Esta receta se nos escapó de la cocina. Error 404.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home className="w-5 h-5 inline mr-2" />
            Volver a Casa
          </Link>
          <Link href="/recipes" className="btn-outline">
            <Search className="w-5 h-5 inline mr-2" />
            Buscar Recetas
          </Link>
        </div>

        <p className="text-sm text-neutral-500">
          Código de error: 404 | Página no encontrada
        </p>
      </div>
    </div>
  );
}