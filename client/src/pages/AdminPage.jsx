import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X, Upload, Package, LogOut } from 'lucide-react'

const CATEGORIES = ['Quesos', 'Huevos de campo', 'Frutos secos', 'Otros']
const STORAGE_KEY = 'adg_admin_products'

const emptyProduct = {
  name: '', description: '', price: '', weight: '', category: 'Quesos',
  image: '', featured: false,
}

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState(emptyProduct)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setProducts(JSON.parse(stored))
    } else {
      // Load from static data
      import('../data/products.js').then(mod => {
        setProducts(mod.default)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mod.default))
      })
    }
  }, [])

  const saveProducts = (updated) => {
    setProducts(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const handleSubmit = () => {
    if (!form.name || !form.price) return
    const product = { ...form, price: Number(form.price), id: editingProduct?.id || Date.now() }
    if (editingProduct) {
      saveProducts(products.map(p => p.id === editingProduct.id ? product : p))
    } else {
      saveProducts([...products, product])
    }
    cancelEdit()
  }

  const deleteProduct = (id) => {
    if (confirm('¿Eliminar este producto?')) {
      saveProducts(products.filter(p => p.id !== id))
    }
  }

  const startEdit = (product) => {
    setEditingProduct(product)
    setForm({ ...product, price: String(product.price) })
    setIsCreating(false)
  }

  const startCreate = () => {
    setIsCreating(true)
    setEditingProduct(null)
    setForm(emptyProduct)
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setIsCreating(false)
    setForm(emptyProduct)
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price)

  const showForm = isCreating || editingProduct

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-olive-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-gray-900">Panel Admin</h1>
              <p className="text-gray-500 text-xs">Alma de Granja</p>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            <LogOut size={16} />
            Volver al sitio
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total productos', value: products.length, color: 'bg-blue-50 text-blue-700' },
            { label: 'Destacados', value: products.filter(p => p.featured).length, color: 'bg-amber-50 text-amber-700' },
            { label: 'Categorías', value: CATEGORIES.length, color: 'bg-green-50 text-green-700' },
            { label: 'Cloudinary', value: 'Próximamente', color: 'bg-purple-50 text-purple-700' },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} rounded-2xl p-5`}>
              <p className="text-xs font-medium opacity-70 mb-1">{stat.label}</p>
              <p className="text-2xl font-heading font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-xl text-gray-900 flex items-center gap-2">
            <Package size={22} />
            Productos
          </h2>
          <button
            onClick={startCreate}
            className="flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus size={18} />
            Nuevo producto
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-lg">
                {editingProduct ? 'Editar producto' : 'Nuevo producto'}
              </h3>
              <button onClick={cancelEdit} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text" placeholder="Nombre del producto"
                value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
              />
              <input
                type="number" placeholder="Precio (CLP)"
                value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
              />
              <input
                type="text" placeholder="Peso / Cantidad"
                value={form.weight} onChange={e => setForm(p => ({ ...p, weight: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
              />
              <select
                value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 cursor-pointer"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                type="text" placeholder="URL de imagen (Cloudinary próximamente)"
                value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                className="md:col-span-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
              />
              <textarea
                placeholder="Descripción" rows={2}
                value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                className="md:col-span-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 resize-none"
              />
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox" checked={form.featured}
                  onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-olive-600 focus:ring-olive-400"
                />
                Producto destacado
              </label>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <Save size={16} />
                {editingProduct ? 'Guardar cambios' : 'Crear producto'}
              </button>
              <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                Cancelar
              </button>
            </div>

            {/* Cloudinary placeholder */}
            <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-dashed border-purple-200">
              <div className="flex items-center gap-3 text-purple-600">
                <Upload size={20} />
                <div>
                  <p className="text-sm font-medium">Subida de imágenes con Cloudinary</p>
                  <p className="text-xs text-purple-400">Integración preparada — se habilitará próximamente</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Producto</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Categoría</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden sm:table-cell">Peso</th>
                  <th className="text-right px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Precio</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          {product.featured && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                              Destacado
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-500 hidden md:table-cell">{product.category}</td>
                    <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">{product.weight}</td>
                    <td className="px-4 py-4 text-right font-semibold text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(product)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No hay productos. Crea el primero.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
