import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart, Star, Plus, Minus } from 'lucide-react'

function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price)
}

function ProductCard({ product, featured = false }) {
  const { addItem, updateQuantity, items } = useCart()
  const cartItem = items.find((item) => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  return (
    <article className={`group h-full bg-[color:var(--bg-card)] rounded-2xl overflow-hidden border border-[color:var(--border-soft)] hover:border-[color:var(--border-light)] transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 flex flex-col ${featured ? 'ring-1 ring-[color:var(--accent)]/40' : ''}`}>
      <div className="relative aspect-square overflow-hidden bg-[color:var(--bg-secondary)]">
        <img src={product.image} alt={product.title || product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {featured && <div className="absolute top-3 left-3 flex items-center gap-1 bg-[color:var(--accent)] text-white text-xs font-bold px-3 py-1.5 rounded-full"><Star size={12} fill="currentColor" /> Destacado</div>}
      </div>

      <div className="p-5 flex flex-1 flex-col">
        <p className="text-[11px] uppercase tracking-wider text-[color:var(--primary)] mb-2">{product.category}</p>
        <h3 className="font-heading font-semibold text-lg text-[color:var(--text-primary)] leading-tight min-h-[3.2rem]">{product.title || product.name}</h3>
        <p className="text-[color:var(--text-secondary)] text-xs uppercase tracking-wider mt-2 mb-2">{product.weight || product.peso || product.bandeja}</p>
        <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.6rem]">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-heading font-bold text-xl text-[color:var(--primary)]">{formatPrice(product.price)}</span>

          {quantity === 0 ? (
            <button onClick={() => addItem(product)} className="flex items-center gap-2 bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition">
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          ) : (
            <div className="flex items-center bg-[color:var(--primary)] rounded-xl overflow-hidden">
              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="flex items-center justify-center w-9 h-10 text-white hover:bg-[color:var(--primary-hover)]" aria-label="Disminuir cantidad"><Minus size={15} strokeWidth={2.5} /></button>
              <span className="flex items-center justify-center min-w-[2rem] h-10 text-white text-sm font-bold tabular-nums">{quantity}</span>
              <button onClick={() => addItem(product)} className="flex items-center justify-center w-9 h-10 text-white hover:bg-[color:var(--primary-hover)]" aria-label="Aumentar cantidad"><Plus size={15} strokeWidth={2.5} /></button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export { ProductCard, formatPrice }
export default ProductCard
