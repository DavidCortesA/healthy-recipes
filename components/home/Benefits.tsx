import { Clock, Heart, TrendingUp, Users } from "lucide-react";

export default function Benefits() {
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
  )
}