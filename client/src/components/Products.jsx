import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react'
import { ProductCard } from './ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { getHighlightedProducts } from '../utils/featuredProducts.js'

const categoryOrder = ['Todos', 'Huevos', 'Quesos', 'Frutos secos', 'Aceite de oliva', 'Otros', 'Canastas']

export default function Products() {
  const { products } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [sortOrder, setSortOrder] = useState('featured')

  const highlightedProducts = useMemo(() => getHighlightedProducts(products, 6), [products])

  const categories = useMemo(() => {
    const normalized = products
      .filter((p) => p.active)
      .map((p) => p.category)
      .filter(Boolean)

    const unique = [...new Set(normalized)]
    const ordered = unique.sort((a, b) => {
      const ia = categoryOrder.indexOf(a)
      const ib = categoryOrder.indexOf(b)
      if (ia === -1 && ib === -1) return a.localeCompare(b)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })

    return ['Todos', ...ordered]
  }, [products])

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.active)

    if (activeCategory !== 'Todos') {
      list = list.filter((p) => p.category === activeCategory)
    }

    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (normalizedQuery) {
      list = list.filter((p) => (p.title || p.name || '').toLowerCase().includes(normalizedQuery))
    }

    const sorted = [...list]
    if (sortOrder === 'asc') sorted.sort((a, b) => a.price - b.price)
    if (sortOrder === 'desc') sorted.sort((a, b) => b.price - a.price)
    if (sortOrder === 'featured') sorted.sort((a, b) => Number(b.featured) - Number(a.featured))

    return sorted
  }, [products, activeCategory, searchQuery, sortOrder])

  const clearFilters = () => {
    setActiveCategory('Todos')
    setSearchQuery('')
    setSortOrder('featured')
  }

  return (
    <section id="productos" className="pt-32 pb-24 sm:pb-28 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="destacados" className="text-center mb-10">
          <span className="inline-block text-olive-600 text-sm font-semibold uppercase tracking-[0.15em] mb-3">Catálogo</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">Todos nuestros productos</h1>
          <p className="text-dark-light/70 text-lg max-w-2xl mx-auto">Explora el catálogo completo, filtra por categoría y agrega productos a tu cesta con un flujo rápido y ordenado.</p>
        </div>

        {highlightedProducts.length > 0 && (
          <section className="mb-10 rounded-[2rem] border border-olive-200/80 bg-white p-5 sm:p-7 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-gold-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]"><Sparkles size={14} /> Selección destacada</p>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark mt-2">Lo mejor de la semana</h2>
              </div>
              <p className="text-sm text-dark-light/65">Productos recomendados para compra rápida.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {highlightedProducts.map((product) => (
                <ProductCard key={`featured-${product.id}`} product={product} featured />
              ))}
            </div>
          </section>
        )}

        <div className="rounded-2xl border border-olive-200/70 bg-white p-4 sm:p-6 mb-8 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-light/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar por nombre de producto"
              className="w-full rounded-xl border border-olive-200/80 bg-cream-50 py-3 pl-11 pr-4 text-sm text-dark outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-200"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal size={16} className="text-olive-600 hidden sm:block" />
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat ? 'bg-olive-600 text-white' : 'bg-cream-50 text-dark-light border border-olive-200 hover:bg-olive-100'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-olive-600" />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="bg-cream-50 border border-olive-200 text-dark-light text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-olive-300">
                <option value="featured">Destacados primero</option>
                <option value="asc">Menor a mayor precio</option>
                <option value="desc">Mayor a menor precio</option>
              </select>
            </div>
          </div>
        </div>

        <p className="text-sm text-dark-light/70 mb-6">{filteredProducts.length} productos encontrados</p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-olive-300 bg-white">
            <p className="text-dark-light/60 text-lg mb-5">No encontramos productos con esos filtros.</p>
            <button onClick={clearFilters} className="inline-flex items-center rounded-full bg-olive-600 px-6 py-3 text-white font-semibold hover:bg-olive-700 transition">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
