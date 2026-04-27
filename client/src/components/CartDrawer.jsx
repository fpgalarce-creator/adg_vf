import { useState } from 'react'
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from './ProductCard.jsx'

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
  const [form, setForm] = useState({ nombre: '', localidad: '', direccion: '', comentario: '' })
  const [formErrors, setFormErrors] = useState({})

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateForm = () => {
    const errors = {}
    if (!form.nombre.trim()) errors.nombre = 'Campo requerido'
    if (!form.localidad.trim()) errors.localidad = 'Campo requerido'
    if (!form.direccion.trim()) errors.direccion = 'Campo requerido'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const sendWhatsApp = () => {
    if (items.length === 0) return
    if (!validateForm()) return

    const productLines = items.map(item =>
      `▸ ${item.title || item.name} (${item.weight || item.peso || ""}) x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    ).join('\n')

    const message = `¡Hola Alma de Granja! 🌿\n\nMe gustaría hacer el siguiente pedido:\n\n${productLines}\n\n💰 *Total estimado: ${formatPrice(totalPrice)}*\n\n📋 *Datos de envío:*\nNombre: ${form.nombre}\nLocalidad: ${form.localidad}\nDirección: ${form.direccion}${form.comentario ? `\nComentario: ${form.comentario}` : ''}\n\n¡Quedo atento/a a la confirmación! 🙌`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/56990861197?text=${encoded}`, '_blank')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[color:var(--bg-primary)] z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[color:var(--border-soft)] bg-[color:var(--bg-card)]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[color:var(--primary)]" size={22} />
            <h2 className="font-heading font-bold text-xl text-[color:var(--text-primary)]">Tu pedido</h2>
            {totalItems > 0 && (
              <span className="bg-[color:var(--primary)] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-[color:var(--bg-secondary)] transition-colors"
          >
            <X size={20} className="text-[color:var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 bg-[color:var(--bg-secondary)] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-[color:var(--primary-light)]" size={32} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-[color:var(--text-primary)] mb-2">Tu carrito está vacío</h3>
              <p className="text-[color:var(--text-secondary)]/70 text-sm mb-6">
                Agrega productos del campo para empezar tu pedido.
              </p>
              <button
                onClick={closeCart}
                className="bg-[color:var(--primary)] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[color:var(--primary-hover)] transition-colors"
              >
                Ver productos
              </button>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-6">
              {/* Items */}
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 bg-[color:var(--bg-card)] rounded-2xl p-3 border border-[color:var(--border-light)]">
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-sm text-[color:var(--text-primary)] truncate">{item.title || item.name}</h4>
                      <p className="text-[color:var(--text-secondary)]/70 text-xs mb-2">{item.weight || item.peso}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 bg-[color:var(--bg-secondary)] hover:bg-[color:var(--bg-secondary)] rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 bg-[color:var(--bg-secondary)] hover:bg-[color:var(--bg-secondary)] rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-heading font-bold text-sm text-[color:var(--primary)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-[color:var(--bg-card)] rounded-2xl p-4 border border-[color:var(--border-light)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[color:var(--text-secondary)]/80 text-sm">Subtotal</span>
                  <span className="font-heading font-bold text-lg text-[color:var(--text-primary)]">{formatPrice(totalPrice)}</span>
                </div>
                {totalPrice >= 20000 && (
                  <p className="text-green-600 text-xs font-medium">
                    🚚 ¡Despacho gratis incluido!
                  </p>
                )}
                {totalPrice < 20000 && totalPrice > 0 && (
                  <p className="text-[color:var(--accent)] text-xs">
                    Faltan {formatPrice(20000 - totalPrice)} para despacho gratis
                  </p>
                )}
              </div>

              {/* Form */}
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-sm text-[color:var(--text-primary)]">Datos de envío</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Nombre completo *"
                    value={form.nombre}
                    onChange={(e) => handleFormChange('nombre', e.target.value)}
                    className={`w-full bg-[color:var(--bg-card)] border ${formErrors.nombre ? 'border-red-400' : 'border-[color:var(--border-soft)]'} rounded-xl px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-light)] transition-all`}
                  />
                  {formErrors.nombre && <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>}
                </div>
                <div>
                  <select
                    value={form.localidad}
                    onChange={(e) => handleFormChange('localidad', e.target.value)}
                    className={`w-full bg-[color:var(--bg-card)] border ${formErrors.localidad ? 'border-red-400' : 'border-[color:var(--border-soft)]'} rounded-xl px-4 py-3 text-sm text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-light)] transition-all cursor-pointer ${!form.localidad ? 'text-[color:var(--text-secondary)]/60' : ''}`}
                  >
                    <option value="">Selecciona localidad *</option>
                    <option value="Rancagua">Rancagua</option>
                    <option value="Machalí">Machalí</option>
                    <option value="Graneros">Graneros</option>
                    <option value="San Francisco de Mostazal">San Francisco de Mostazal</option>
                  </select>
                  {formErrors.localidad && <p className="text-red-500 text-xs mt-1">{formErrors.localidad}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Dirección de despacho *"
                    value={form.direccion}
                    onChange={(e) => handleFormChange('direccion', e.target.value)}
                    className={`w-full bg-[color:var(--bg-card)] border ${formErrors.direccion ? 'border-red-400' : 'border-[color:var(--border-soft)]'} rounded-xl px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-light)] transition-all`}
                  />
                  {formErrors.direccion && <p className="text-red-500 text-xs mt-1">{formErrors.direccion}</p>}
                </div>
                <textarea
                  placeholder="Comentario (opcional)"
                  value={form.comentario}
                  onChange={(e) => handleFormChange('comentario', e.target.value)}
                  rows={2}
                  className="w-full bg-[color:var(--bg-card)] border border-[color:var(--border-soft)] rounded-xl px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-light)] transition-all resize-none"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={sendWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-[color:var(--whatsapp)] hover:bg-[color:var(--whatsapp-hover)] text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-green-900/20 hover:shadow-xl active:scale-[0.98]"
              >
                <MessageCircle size={22} />
                Enviar pedido por WhatsApp
              </button>

              <p className="text-center text-[color:var(--text-secondary)]/70 text-xs leading-relaxed pb-4">
                Tu pedido será confirmado por nuestro equipo. 
                Te contactaremos para coordinar pago y despacho.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
