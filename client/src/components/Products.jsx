import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Star } from 'lucide-react'
import { ProductCard } from './ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { CATEGORY_OPTIONS, normalizeCategoryLabel } from '../utils/productStore.js'

const CATEGORY_FILTERS = ['Todos', ...CATEGORY_OPTIONS]
const FORMAT_FILTERS = ['all', '500g', '1kg']

const normalize = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()

const toCategoryParam = (value = '') => normalize(value).replace(/\s+/g, '-')

const categoryParamAliases = {
  todos: 'todos',
  huevos: 'huevos de campo',
  'huevos-de-campo': 'huevos de campo',
  'frutos-secos': 'frutos secos',
  quesos: 'quesos',
  'aceite-de-oliva': 'aceites de oliva',
  'aceites-de-oliva': 'aceites de oliva',
  otros: 'otros',
  canastas: 'otros',
  'canastas-y-packs': 'otros',
}

const getNormalizedWeight = (product) => normalize(product.weight || product.peso || product.bandeja || '')

const productMatchesFormat = (product, formatFilter) => {
  if (formatFilter === 'all') return true

  const grams = Number(product.gramos || 0)
  const weight = getNormalizedWeight(product)

  if (formatFilter === '500g') {
    return grams === 500 || weight.includes('500 gramos') || weight.includes('500g')
  }

  if (formatFilter === '1kg') {
    return grams === 1000 || weight.includes('1 kilogramo') || weight.includes('1 kg') || weight.includes('1000 gramos') || weight.includes('1 litro')
  }

  return true
}

export default function Products() {
  const { products, isLoading, error } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const queryFeatured = searchParams.get('destacados') === 'true'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [formatFilter, setFormatFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('')
  const [featuredOnly, setFeaturedOnly] = useState(queryFeatured)

  useEffect(() => {
    setFeaturedOnly(queryFeatured)
  }, [queryFeatured])

  const activeProducts = useMemo(() => products.filter((product) => product.active), [products])

  useEffect(() => {
    const categoryFromUrl = searchParams.get('categoria')
    if (!categoryFromUrl) return

    const normalizedParam = categoryParamAliases[normalize(categoryFromUrl)] ?? normalize(categoryFromUrl)
    const matched = CATEGORY_FILTERS.find((category) => normalize(category) === normalizedParam)
    if (matched && matched !== activeCategory) {
      setActiveCategory(matched)
    }
  }, [searchParams, activeCategory])

  const filteredProducts = useMemo(() => {
    let list = [...activeProducts]

    if (featuredOnly) {
      list = list.filter((product) => product.featured && product.active)
    }

    if (activeCategory !== 'Todos') {
      list = list.filter((product) => normalizeCategoryLabel(product.category) === activeCategory)
    }

    const normalizedQuery = normalize(searchQuery)
    if (normalizedQuery) {
      list = list.filter((product) => normalize(product.title || product.name || '').includes(normalizedQuery))
    }

    list = list.filter((product) => productMatchesFormat(product, formatFilter))

    if (sortOrder === 'asc') {
      list.sort((a, b) => a.price - b.price)
    }
    if (sortOrder === 'desc') {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [activeProducts, featuredOnly, activeCategory, searchQuery, formatFilter, sortOrder])

  const syncQueryParam = (updates = {}) => {
    const nextParams = new URLSearchParams(searchParams)

    if (Object.hasOwn(updates, 'category')) {
      if (!updates.category || updates.category === 'Todos') {
        nextParams.delete('categoria')
      } else {
        nextParams.set('categoria', toCategoryParam(updates.category))
      }
    }

    if (Object.hasOwn(updates, 'featuredOnly')) {
      if (updates.featuredOnly) nextParams.set('destacados', 'true')
      else nextParams.delete('destacados')
    }

    setSearchParams(nextParams, { replace: true })
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    syncQueryParam({ category })
  }

  const handleFeaturedChange = (event) => {
    const nextValue = event.target.value === 'featured'
    setFeaturedOnly(nextValue)
    syncQueryParam({ featuredOnly: nextValue })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setActiveCategory('Todos')
    setFormatFilter('all')
    setSortOrder('')
    setFeaturedOnly(false)
    setSearchParams({}, { replace: true })
  }

  return (
    <section id="productos" className="pt-32 pb-24 sm:pb-28 bg-[color:var(--bg-primary)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[color:var(--text-primary)] mb-3">
            {featuredOnly ? 'Productos destacados' : 'Productos'}
          </h1>
          <p className="text-[color:var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto">
            Descubre productos frescos y seleccionados del campo chileno.
          </p>
        </div>

        {error ? (
          <div className="text-center py-16 rounded-2xl border border-red-200 bg-red-50">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-[color:var(--primary)] rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Cargando...</span>
            </div>
            <p className="mt-4 text-[color:var(--text-secondary)]">Cargando productos...</p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--bg-card)] p-4 sm:p-6 mb-8 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-secondary)]/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar por nombre de producto..."
              className="w-full rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--bg-primary)] py-3 pl-11 pr-4 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--primary-light)] focus:ring-2 focus:ring-[color:var(--border-light)]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap overflow-x-auto pb-1">
              <SlidersHorizontal size={16} className="text-[color:var(--primary)] hidden sm:block" />
              {CATEGORY_FILTERS.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${activeCategory === category ? 'bg-[color:var(--primary)] text-white' : 'bg-[color:var(--bg-primary)] text-[color:var(--text-secondary)] border border-[color:var(--border-soft)] hover:bg-[color:var(--bg-secondary)]'}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <select
                value={formatFilter}
                onChange={(event) => setFormatFilter(event.target.value)}
                className="bg-[color:var(--bg-primary)] border border-[color:var(--border-soft)] text-[color:var(--text-secondary)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--border-light)]"
              >
                <option value={FORMAT_FILTERS[0]}>Todos los formatos</option>
                <option value={FORMAT_FILTERS[1]}>500 gramos</option>
                <option value={FORMAT_FILTERS[2]}>1 kilogramo</option>
              </select>

              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="bg-[color:var(--bg-primary)] border border-[color:var(--border-soft)] text-[color:var(--text-secondary)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--border-light)]"
              >
                <option value="">Ordenar por</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
              </select>

              <label className="relative">
                <Star size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--primary)]" />
                <select
                  value={featuredOnly ? 'featured' : 'all'}
                  onChange={handleFeaturedChange}
                  className="w-full bg-[color:var(--bg-primary)] border border-[color:var(--border-soft)] text-[color:var(--text-secondary)] text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--border-light)]"
                >
                  <option value="all">Todos</option>
                  <option value="featured">Destacados</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mb-6">
          <p className="text-sm text-[color:var(--text-secondary)]">{filteredProducts.length} productos encontrados</p>
          {(featuredOnly || activeCategory !== 'Todos' || searchQuery || formatFilter !== 'all' || sortOrder) && (
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-[color:var(--primary)] hover:text-[color:var(--primary-hover)] transition"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-[color:var(--border-soft)] bg-[color:var(--bg-card)]">
            <p className="text-[color:var(--text-secondary)] text-lg mb-5">No encontramos productos con esos filtros.</p>
            <button onClick={clearFilters} className="inline-flex items-center rounded-full bg-[color:var(--primary)] px-6 py-3 text-white font-semibold hover:bg-[color:var(--primary-hover)] transition">
              Limpiar filtros
            </button>
          </div>
        )}
          </>
        )}
      </div>
    </section>
  )
}
