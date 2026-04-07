import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart, Star, Plus, Minus } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price)
}

function ProductCard({ product, featured = false }) {
  const { addItem, updateQuantity, items } = useCart()

  const cartItem = items.find(item => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden border border-olive-100 hover:border-olive-200 transition-all duration-500 hover:shadow-2xl hover:shadow-olive-900/8 hover:-translate-y-1 ${featured ? 'ring-2 ring-gold-400/30' : ''}`}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-gold-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <Star size={12} fill="currentColor" />
            Destacado
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-lg text-dark leading-tight">
            {product.name}
          </h3>
        </div>
        <p className="text-dark-light/50 text-xs uppercase tracking-wider mb-2">
          {product.weight}
        </p>
        <p className="text-dark-light/60 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="font-heading font-bold text-xl text-olive-700">
            {formatPrice(product.price)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-olive-900/20 active:scale-95"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          ) : (
            <div className="flex items-center gap-0 bg-olive-600 rounded-xl overflow-hidden shadow-lg shadow-olive-900/15">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="flex items-center justify-center w-9 h-10 text-white hover:bg-olive-700 transition-colors duration-200 active:scale-90"
                aria-label="Disminuir cantidad"
              >
                <Minus size={15} strokeWidth={2.5} />
              </button>
              <span className="flex items-center justify-center min-w-[2rem] h-10 text-white text-sm font-bold tabular-nums select-none">
                {quantity}
              </span>
              <button
                onClick={() => addItem(product)}
                className="flex items-center justify-center w-9 h-10 text-white hover:bg-olive-700 transition-colors duration-200 active:scale-90"
                aria-label="Aumentar cantidad"
              >
                <Plus size={15} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { ProductCard, formatPrice }
export default ProductCard

