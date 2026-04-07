import productsData from '../data/products.js'
import { ProductCard } from './ProductCard.jsx'
import ScrollAnimation from './ScrollAnimation.jsx'

export default function FeaturedProducts() {
  const featured = productsData.filter(p => p.featured)

  return (
    <section id="destacados" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="inline-block text-gold-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              Lo más pedido
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">
              Productos destacados
            </h2>
            <p className="text-dark-light/70 text-lg max-w-2xl mx-auto">
              Los favoritos de nuestros clientes. Calidad premium seleccionada especialmente para ti.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, index) => (
            <ScrollAnimation key={product.id} delay={index * 100}>
              <ProductCard product={product} featured />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
