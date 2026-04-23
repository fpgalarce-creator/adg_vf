import { useEffect, useMemo, useState } from 'react'
import { ShoppingCart, Plus, Minus, Sparkles } from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import { useCart } from '../context/CartContext.jsx'
import ScrollAnimation from './ScrollAnimation.jsx'
import { formatPrice } from './ProductCard.jsx'
import { getHighlightedProducts } from '../utils/featuredProducts.js'

const AUTOPLAY_INTERVAL = 4600

function MainFeaturedCard({ product }) {
  const { addItem, updateQuantity, items } = useCart()
  const cartItem = items.find((item) => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  return (
    <article className="group relative z-20 rounded-[2rem] overflow-hidden border border-white/45 bg-white/92 backdrop-blur-xl shadow-[0_30px_60px_rgba(15,23,42,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_38px_70px_rgba(15,23,42,0.3)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.title || product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
          <Sparkles size={13} /> Destacado
        </span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <h3 className="font-heading text-2xl sm:text-[1.7rem] leading-tight font-semibold text-dark line-clamp-2 min-h-[3.6rem]">
          {product.title || product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3">
          <span className="font-heading font-bold text-2xl sm:text-3xl text-olive-700">{formatPrice(product.price)}</span>

          {quantity === 0 ? (
            <button
              onClick={() => addItem(product)}
              className="inline-flex items-center gap-2 rounded-xl bg-olive-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-olive-700"
            >
              <ShoppingCart size={16} /> Agregar
            </button>
          ) : (
            <div className="flex items-center overflow-hidden rounded-xl bg-olive-600">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="flex h-10 w-9 items-center justify-center text-white hover:bg-olive-700"
                aria-label="Disminuir cantidad"
              >
                <Minus size={15} strokeWidth={2.5} />
              </button>
              <span className="flex h-10 min-w-[2rem] items-center justify-center text-sm font-bold tabular-nums text-white">{quantity}</span>
              <button
                onClick={() => addItem(product)}
                className="flex h-10 w-9 items-center justify-center text-white hover:bg-olive-700"
                aria-label="Aumentar cantidad"
              >
                <Plus size={15} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function PreviewCard({ product, onClick, isNext }) {
  return (
    <button
      onClick={onClick}
      className={`group hidden sm:block absolute right-0 w-[56%] overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md text-left shadow-[0_18px_35px_rgba(15,23,42,0.24)] transition-all duration-700 hover:bg-white/85 ${
        isNext
          ? 'top-[12%] z-10 translate-x-[18%] scale-[0.9] opacity-90 hover:translate-x-[16%]'
          : 'top-[40%] z-0 translate-x-[30%] scale-[0.8] opacity-55 hover:opacity-80'
      }`}
      aria-label={`Ver ${product.title || product.name}`}
    >
      <div className="aspect-[3/2] bg-cream-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title || product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-3 py-2">
        <p className="line-clamp-1 text-xs font-semibold text-dark/85">{product.title || product.name}</p>
      </div>
    </button>
  )
}

export default function HeroFeaturedCarousel() {
  const { products } = useProducts()
  const highlightedProducts = useMemo(() => getHighlightedProducts(products, 8), [products])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!highlightedProducts.length) return
    setActiveIndex((prev) => (prev >= highlightedProducts.length ? 0 : prev))
  }, [highlightedProducts.length])

  useEffect(() => {
    if (highlightedProducts.length <= 1 || isHovered) return
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlightedProducts.length)
    }, AUTOPLAY_INTERVAL)

    return () => window.clearInterval(timer)
  }, [highlightedProducts.length, isHovered])

  if (!highlightedProducts.length) return null

  const activeProduct = highlightedProducts[activeIndex]
  const nextProduct = highlightedProducts[(activeIndex + 1) % highlightedProducts.length]
  const trailingProduct = highlightedProducts[(activeIndex + 2) % highlightedProducts.length]

  return (
    <ScrollAnimation delay={180}>
      <div
        className="relative rounded-[2.1rem] border border-white/25 bg-white/10 p-4 sm:p-5 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 rounded-[2.1rem] bg-gradient-to-br from-white/15 via-white/5 to-transparent pointer-events-none" />

        <div className="relative min-h-[25rem] sm:min-h-[28rem]">
          <div key={activeProduct.id} className="relative z-20 w-full sm:w-[82%] transition-all duration-700">
            <MainFeaturedCard product={activeProduct} />
          </div>

          {highlightedProducts.length > 1 && nextProduct && (
            <PreviewCard
              product={nextProduct}
              isNext
              onClick={() => setActiveIndex((activeIndex + 1) % highlightedProducts.length)}
            />
          )}

          {highlightedProducts.length > 2 && trailingProduct && (
            <PreviewCard
              product={trailingProduct}
              onClick={() => setActiveIndex((activeIndex + 2) % highlightedProducts.length)}
            />
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 sm:gap-2.5">
          {highlightedProducts.slice(0, 6).map((product, idx) => {
            const realIndex = idx
            const isActive = realIndex === activeIndex
            return (
              <button
                key={product.id}
                onClick={() => setActiveIndex(realIndex)}
                className={`h-2.5 rounded-full transition-all duration-500 ${isActive ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
                aria-label={`Seleccionar ${product.title || product.name}`}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5 sm:hidden">
        {highlightedProducts.slice(0, 3).map((product, idx) => (
          <button
            key={`${product.id}-${idx}`}
            onClick={() => setActiveIndex(idx)}
            className="overflow-hidden rounded-2xl border border-white/30 bg-white/50"
          >
            <div className="aspect-square bg-cream-100">
              <img src={product.image} alt={product.title || product.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </button>
        ))}
      </div>
    </ScrollAnimation>
  )
}
