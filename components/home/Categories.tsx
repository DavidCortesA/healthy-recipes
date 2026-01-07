export default function Categories() {
  const categories = [
    { name: 'Desayuno', icon: '🌅', count: 150, color: 'bg-secondary-100 text-secondary-700' },
    { name: 'Almuerzo', icon: '🍱', count: 280, color: 'bg-primary-100 text-primary-700' },
    { name: 'Cena', icon: '🌙', count: 220, color: 'bg-info-light/30 text-info-dark' },
    { name: 'Snacks', icon: '🥗', count: 180, color: 'bg-warning-light/30 text-warning-dark' },
    { name: 'Postres', icon: '🍰', count: 120, color: 'bg-error-light/30 text-error-dark' },
    { name: 'Bebidas', icon: '🥤', count: 90, color: 'bg-primary-100 text-primary-700' }
  ];

  return (
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
  );
}