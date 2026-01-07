import { Play } from 'lucide-react';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Categories from '@/components/home/Categories';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';
import Benefits from '@/components/home/Benefits';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      {/* Stats Section */}
      <Stats />
      {/* Categories Section */}
      <Categories />
      {/* Featured Recipes Section */}
      <FeaturedRecipes />
      {/* Benefits Section */}
      <Benefits />
      {/* Video/CTA Section */}
      <section className="section">
        <div className="container-app">
          <div className="bg-gradient-primary rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="p-8 lg:p-12 text-white space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Comienza tu Viaje Saludable Hoy
                </h2>
                <p className="text-lg opacity-90">
                  Únete a miles de personas que ya transformaron su alimentación. 
                  Crea tu cuenta gratis y accede a recetas exclusivas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg">
                    Crear Cuenta Gratis
                  </Button>
                  <Button variant="outline" size="lg" className="whitespace-nowrap text-white border-white hover:bg-white hover:text-primary-600">
                    Ver Demo
                  </Button>
                </div>
              </div>
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800"
                  alt="Cocina saludable"
                  className="w-full h-full object-cover"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="section bg-neutral-900">
        <div className="container-app text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            ¿Listo para Cocinar Saludable?
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y descubre un mundo de recetas deliciosas y nutritivas
          </p>
          <Button variant="primary" size="lg">
            Comenzar Ahora - Es Gratis
          </Button>
        </div>
      </section>
    </div>
  );
}