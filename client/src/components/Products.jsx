import { useState, useMemo } from 'react'
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { ProductCard } from './ProductCard.jsx'
import ScrollAnimation from './ScrollAnimation.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function Products() {
  const { products } = useProducts()
  const [activeCategory, setActiveCategory] = useState('Todo')
  const [sortOrder, setSortOrder] = useState('none')

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.filter((p) => p.active).map((p) => p.category))]
    return ['Todo', ...uniqueCategories]
  }, [products])

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.active)

    if (activeCategory !== 'Todo') {
      list = list.filter((p) => p.category === activeCategory)
    }

    const sorted = [...list]
    if (sortOrder === 'asc') sorted.sort((a, b) => a.price - b.price)
    if (sortOrder === 'desc') sorted.sort((a, b) => b.price - a.price)

    return sorted
  }, [products, activeCategory, sortOrder])

  return (
    <section id="productos" className="py-24 sm:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="inline-block text-olive-600 text-sm font-semibold uppercase tracking-[0.15em] mb-3">Catálogo completo</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">Nuestros productos</h2>
            <p className="text-dark-light/70 text-lg max-w-2xl mx-auto">Explora todo nuestro catálogo de productos del campo. Frescos, naturales y seleccionados con dedicación.</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <SlidersHorizontal size={16} className="text-olive-500 hidden sm:block" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-olive-600 text-white shadow-md shadow-olive-900/20'
                      : 'bg-white text-dark-light hover:bg-olive-100 border border-olive-200/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-olive-500" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-olive-200/50 text-dark-light text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive-400 transition-all cursor-pointer"
              >
                <option value="none">Ordenar por</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
              </select>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ScrollAnimation key={product.id} delay={index * 50}>
              <ProductCard product={product} />
            </ScrollAnimation>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-dark-light/50 text-lg">No hay productos en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  )
}
