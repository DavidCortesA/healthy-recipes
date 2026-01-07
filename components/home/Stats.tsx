import { Award, ChefHat, Star, Users } from "lucide-react";

export default function Stats() {
  const stats = [
    { number: '2,500+', label: 'Recetas', icon: ChefHat },
    { number: '10,000+', label: 'Usuarios', icon: Users },
    { number: '4.8', label: 'Rating', icon: Star },
    { number: '50+', label: 'Categorías', icon: Award }
  ];

  return (
    <section className="py-12 bg-white">
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
  )
}