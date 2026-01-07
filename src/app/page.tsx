'use client';
import { useState } from 'react';
import { Heart, Clock, Users, ChefHat, Flame, Search, TrendingUp, Award, Star, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de ejemplo
  const featuredRecipes = [
    {
      id: 1,
      title: 'Bowl de Quinoa y Aguacate',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      category: 'Almuerzo',
      time: 25,
      servings: 2,
      difficulty: 'Fácil',
      calories: 380,
      rating: 4.8,
      author: 'María García',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    },
    {
      id: 2,
      title: 'Salmón a la Plancha con Vegetales',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
      category: 'Cena',
      time: 30,
      servings: 4,
      difficulty: 'Media',
      calories: 420,
      rating: 4.9,
      author: 'Carlos López',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
    },
    {
      id: 3,
      title: 'Smoothie Bowl de Frutas',
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
      category: 'Desayuno',
      time: 10,
      servings: 1,
      difficulty: 'Fácil',
      calories: 250,
      rating: 4.7,
      author: 'Ana Martínez',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
    }
  ];

  const categories = [
    { name: 'Desayuno', icon: '🌅', count: 150, color: 'bg-secondary-100 text-secondary-700' },
    { name: 'Almuerzo', icon: '🍱', count: 280, color: 'bg-primary-100 text-primary-700' },
    { name: 'Cena', icon: '🌙', count: 220, color: 'bg-info-light/30 text-info-dark' },
    { name: 'Snacks', icon: '🥗', count: 180, color: 'bg-warning-light/30 text-warning-dark' },
    { name: 'Postres', icon: '🍰', count: 120, color: 'bg-error-light/30 text-error-dark' },
    { name: 'Bebidas', icon: '🥤', count: 90, color: 'bg-primary-100 text-primary-700' }
  ];

  const stats = [
    { number: '2,500+', label: 'Recetas', icon: ChefHat },
    { number: '10,000+', label: 'Usuarios', icon: Users },
    { number: '4.8', label: 'Rating', icon: Star },
    { number: '50+', label: 'Categorías', icon: Award }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Recetas Saludables',
      description: 'Todas nuestras recetas están verificadas por nutricionistas profesionales'
    },
    {
      icon: Clock,
      title: 'Ahorra Tiempo',
      description: 'Encuentra recetas rápidas para tu día a día, desde 10 minutos'
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Comparte tus recetas y conecta con miles de usuarios'
    },
    {
      icon: TrendingUp,
      title: 'Mejora tu Salud',
      description: 'Información nutricional completa y tips de expertos'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="container-app py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <TrendingUp className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-neutral-700">
                  +500 nuevas recetas este mes
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                Cocina 
                <span className="text-gradient"> Saludable</span>,
                <br />Vive Mejor
              </h1>
              
              <p className="text-xl text-neutral-600 leading-relaxed">
                Descubre miles de recetas deliciosas y saludables. 
                Desde desayunos energéticos hasta cenas nutritivas.
              </p>

              {/* Barra de búsqueda */}
              <div className="flex gap-3 max-w-xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Buscar recetas, ingredientes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-neutral-900 placeholder:text-neutral-400 shadow-sm"
                  />
                </div>
                <button className="btn-primary px-8 whitespace-nowrap">
                  Buscar
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-neutral-600">Popular:</span>
                {['Vegano', 'Keto', 'Sin Gluten', 'Rápido'].map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative lg:h-[500px] hidden lg:block">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl rotate-3 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
                alt="Comida saludable"
                className="relative rounded-3xl shadow-2xl w-full h-full object-cover"
                width={800}
                height={500}
              />
              {/* Tarjeta flotante */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-xs animate-pulse-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">+2,500</p>
                    <p className="text-sm text-neutral-600">Recetas Verificadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-300 rounded-full blur-3xl opacity-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container-app">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-2">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-3xl font-bold text-neutral-900">{stat.number}</p>
                <p className="text-sm text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-background-secondary">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-neutral-100 max-w-2xl mx-auto">
              Encuentra la receta perfecta para cualquier momento del día
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="group bg-white hover:bg-primary-50 rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-card-hover shadow-card"
              >
                <div className="text-center space-y-3">
                  <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-neutral-900">{category.name}</h3>
                  <p className="text-sm text-neutral-600">{category.count} recetas</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="section bg-amber-50">
        <div className="container-app">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Recetas Destacadas
              </h2>
              <p className="text-lg text-neutral-600">
                Las favoritas de nuestra comunidad
              </p>
            </div>
            <button className="btn-ghost hidden md:flex items-center gap-2">
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="card-recipe group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    width={400}
                    height={224}
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="badge badge-primary">{recipe.category}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={recipe.authorAvatar}
                      alt={recipe.author}
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <span className="text-sm text-neutral-600">{recipe.author}</span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} porciones</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{recipe.calories} cal</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-secondary-500 fill-secondary-500" />
                      <span className="font-bold text-neutral-900">{recipe.rating}</span>
                    </div>
                    <span className={`badge ${
                      recipe.difficulty === 'Fácil' ? 'badge-success' : 
                      recipe.difficulty === 'Media' ? 'badge-warning' : 
                      'badge-error'
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <button className="btn-primary">
              Ver todas las recetas
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-gradient-hero">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              ¿Por qué Recetas Saludables?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              La mejor plataforma para transformar tu alimentación
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-medium transition-colors shadow-lg">
                    Crear Cuenta Gratis
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-colors">
                    Ver Demo
                  </button>
                </div>
              </div>
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <img
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
      <section className="section bg-neutral-900 text-white">
        <div className="container-app text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para Cocinar Saludable?
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y descubre un mundo de recetas deliciosas y nutritivas
          </p>
          <button className="btn-primary text-lg px-10 py-4">
            Comenzar Ahora - Es Gratis
          </button>
        </div>
      </section>
    </div>
  );
}