import { useMemo, useState } from 'react'
import { Plus, Pencil, Save, X, Package, LogOut, Eye, EyeOff, Star } from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import { CATEGORY_OPTIONS, normalizeProduct } from '../utils/productStore.js'
import { productImageOptions, productImageMap, defaultProductImageKey } from '../data/productImages.js'

const emptyProduct = {
  title: '',
  description: '',
  peso: '',
  gramos: '',
  bandeja: '',
  precio: '',
  categoria: 'Huevos de campo',
  destacado: false,
  activo: true,
  imageKey: defaultProductImageKey,
}

export default function AdminPage() {
  const { products, setProducts } = useProducts()
  const [editingId, setEditingId] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState(emptyProduct)

  const visibleCount = useMemo(() => products.filter((p) => p.active).length, [products])
  const featuredCount = useMemo(() => products.filter((p) => p.active && p.featured).length, [products])

  const resetForm = () => {
    setForm(emptyProduct)
    setEditingId(null)
    setIsCreating(false)
  }

  const startCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setForm(emptyProduct)
  }

  const startEdit = (product) => {
    setIsCreating(false)
    setEditingId(product.id)
    setForm({
      title: product.title,
      description: product.description,
      peso: product.peso,
      gramos: product.gramos ? String(product.gramos) : '',
      bandeja: product.bandeja,
      precio: String(product.price),
      categoria: product.category,
      destacado: product.featured,
      activo: product.active,
      imageKey: product.imageKey,
    })
  }

  const saveForm = () => {
    if (!form.title.trim() || !form.precio) return

    const payload = normalizeProduct({
      id: editingId ?? Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      peso: form.peso.trim(),
      gramos: Number(form.gramos || 0),
      bandeja: form.bandeja.trim(),
      precio: Number(form.precio),
      categoria: form.categoria,
      destacado: form.destacado,
      activo: form.activo,
      imageKey: form.imageKey,
    })

    if (editingId) {
      setProducts(products.map((product) => (product.id === editingId ? payload : product)))
    } else {
      setProducts([...products, payload])
    }

    resetForm()
  }

  const toggleFlag = (id, field) => {
    setProducts(
      products.map((product) => {
        if (product.id !== id) return product

        const next = normalizeProduct({
          ...product,
          [field]: !product[field],
          destacado: field === 'featured' ? !product.featured : product.featured,
          activo: field === 'active' ? !product.active : product.active,
        })

        if (field === 'active' && !next.active) {
          next.destacado = false
          next.featured = false
        }

        return next
      }),
    )
  }

  const showForm = isCreating || Boolean(editingId)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-olive-600 flex items-center justify-center"><span className="text-white font-bold text-sm">A</span></div>
            <div>
              <h1 className="font-heading font-bold text-lg text-gray-900">Panel Admin</h1>
              <p className="text-gray-500 text-xs">Alma de Granja</p>
            </div>
          </div>
          <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors">
            <LogOut size={16} /> Volver al sitio
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CardStat label="Total productos" value={products.length} />
          <CardStat label="Visibles" value={visibleCount} />
          <CardStat label="Destacados" value={featuredCount} />
          <CardStat label="Imágenes" value={productImageOptions.length} />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-gray-900 flex items-center gap-2"><Package size={22} />Productos</h2>
          <button onClick={startCreate} className="flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <Plus size={18} />Nuevo producto
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-semibold text-lg">{editingId ? 'Editar producto' : 'Nuevo producto'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Título" value={form.title} onChange={(value) => setForm((prev) => ({ ...prev, title: value }))} />
              <Input label="Precio" type="number" value={form.precio} onChange={(value) => setForm((prev) => ({ ...prev, precio: value }))} />
              <Input label="Peso" value={form.peso} onChange={(value) => setForm((prev) => ({ ...prev, peso: value }))} />
              <Input label="Gramos" type="number" value={form.gramos} onChange={(value) => setForm((prev) => ({ ...prev, gramos: value }))} />
              <Input label="Bandeja" value={form.bandeja} onChange={(value) => setForm((prev) => ({ ...prev, bandeja: value }))} />
              <label className="text-sm font-medium text-gray-700 flex flex-col gap-1">
                Categoría
                <select
                  value={form.categoria}
                  onChange={(e) => setForm((prev) => ({ ...prev, categoria: e.target.value }))}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
                >
                  {CATEGORY_OPTIONS.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>

              <label className="md:col-span-2 text-sm font-medium text-gray-700 flex flex-col gap-1">
                Descripción
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 resize-none"
                />
              </label>

              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Imagen del producto</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {productImageOptions.map((image) => (
                    <button
                      key={image.key}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, imageKey: image.key }))}
                      className={`border rounded-xl overflow-hidden text-left transition ${form.imageKey === image.key ? 'border-olive-500 ring-2 ring-olive-200' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <img src={image.src} alt={image.label} className="h-20 w-full object-cover" />
                      <p className="p-2 text-xs font-medium truncate">{image.label}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                  <img src={productImageMap[form.imageKey]} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs text-gray-500">Vista previa</p>
                    <p className="text-sm font-medium text-gray-900">{productImageOptions.find((image) => image.key === form.imageKey)?.label}</p>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.destacado} onChange={(e) => setForm((prev) => ({ ...prev, destacado: e.target.checked }))} />
                Destacado
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activo} onChange={(e) => setForm((prev) => ({ ...prev, activo: e.target.checked }))} />
                Visible en tienda
              </label>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={saveForm} className="flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"><Save size={16} />Guardar</button>
              <button onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700">Cancelar</button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="text-left px-6 py-4">Producto</th>
                  <th className="text-left px-4 py-4 hidden md:table-cell">Categoría</th>
                  <th className="text-left px-4 py-4 hidden sm:table-cell">Peso</th>
                  <th className="text-right px-4 py-4">Precio</th>
                  <th className="text-right px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.title} className="w-11 h-11 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <div className="flex gap-2 mt-1">
                            {product.featured && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Destacado</span>}
                            {!product.active && <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Oculto</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600 hidden md:table-cell">{product.category}</td>
                    <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">{product.weight}</td>
                    <td className="px-4 py-4 text-right font-semibold">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(product.price)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => toggleFlag(product.id, 'active')} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Activar / desactivar">
                          {product.active ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button onClick={() => product.active && toggleFlag(product.id, 'featured')} className={`p-2 rounded-lg ${product.active ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50' : 'text-gray-300 cursor-not-allowed'}`} title="Destacar">
                          <Star size={16} fill={product.featured ? 'currentColor' : 'none'} />
                        </button>
                        <button onClick={() => startEdit(product)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && <div className="text-center py-12 text-gray-400">No hay productos. Crea el primero.</div>}
        </div>
      </div>
    </div>
  )
}

function CardStat({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-heading font-bold text-gray-900">{value}</p>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <label className="text-sm font-medium text-gray-700 flex flex-col gap-1">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
      />
    </label>
  )
}
