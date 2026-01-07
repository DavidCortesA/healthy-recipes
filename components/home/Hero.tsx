"use client";
import { useState } from "react";
import { ChefHat, Search, TrendingUp } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Image from "next/image";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
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
            <div className="flex gap-3 mb-4 flex-wrap lg:flex-nowrap w-full justify-between">
              <Input
                type="text"
                placeholder="Buscar recetas, ingredientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="text-neutral-400" />}
                fullWidth
                className="w-full border-2 border-border rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-neutral-900 placeholder:text-neutral-400 shadow-sm"
              />
              <Button variant="primary" size="lg" className="whitespace-nowrap">
                Buscar Recetas
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
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
            <Image
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
  )
}