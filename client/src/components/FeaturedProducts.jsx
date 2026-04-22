import { Link } from 'react-router-dom'
import { ProductCard } from './ProductCard.jsx'
import ScrollAnimation from './ScrollAnimation.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function FeaturedProducts() {
  const { products } = useProducts()
  const featured = products.filter((p) => p.active && p.featured).slice(0, 4)

  return (
    <section id="destacados" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-14">
            <span className="inline-block text-gold-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">Selección curada</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">Destacados de la semana</h2>
            <p className="text-dark-light/70 text-lg max-w-2xl mx-auto">Una vitrina breve de nuestros productos y canastas más pedidos.</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, index) => (
            <ScrollAnimation key={product.id} delay={index * 80}>
              <ProductCard product={product} featured />
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/productos" className="inline-flex items-center justify-center rounded-full border border-olive-300 px-7 py-3 text-sm font-semibold text-olive-700 transition hover:bg-olive-50">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  )
}
