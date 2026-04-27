import defaultProducts from '../data/products.js'
import { defaultProductImageKey, productImageMap } from '../data/productImages.js'

export const PRODUCTS_STORAGE_KEY = 'adg_products_v1'
export const CATEGORY_OPTIONS = ['Huevos de campo', 'Frutos secos', 'Quesos', 'Aceites de Oliva', 'Otros']

const normalizeCategoryKey = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()

const CATEGORY_ALIASES = {
  huevos: 'Huevos de campo',
  'huevos de campo': 'Huevos de campo',
  quesos: 'Quesos',
  'frutos secos': 'Frutos secos',
  'aceite de oliva': 'Aceites de Oliva',
  'aceites de oliva': 'Aceites de Oliva',
  otros: 'Otros',
}

export const normalizeCategoryLabel = (value = '') => {
  const normalizedKey = normalizeCategoryKey(value)
  return CATEGORY_ALIASES[normalizedKey] ?? value ?? 'Otros'
}

const formatWeight = (product) => {
  if (product.peso?.trim()) return product.peso
  if (Number(product.gramos) > 0) return `${product.gramos} gramos`
  if (product.bandeja?.trim()) return product.bandeja
  return ''
}

const resolveImage = (product) => {
  if (product.imageKey && productImageMap[product.imageKey]) {
    return {
      imageKey: product.imageKey,
      image: productImageMap[product.imageKey],
    }
  }

  const fallbackKey = defaultProductImageKey
  return {
    imageKey: fallbackKey,
    image: productImageMap[fallbackKey],
  }
}

export const normalizeProduct = (product) => {
  const { image, imageKey } = resolveImage(product)
  const priceValue = Number(product.precio ?? product.price ?? 0)
  const normalizedCategory = normalizeCategoryLabel(product.categoria ?? product.category ?? 'Otros')

  return {
    id: product.id,
    title: product.title ?? product.name ?? '',
    name: product.title ?? product.name ?? '',
    description: product.description ?? '',
    peso: product.peso ?? product.weight ?? '',
    gramos: Number(product.gramos ?? 0),
    bandeja: product.bandeja ?? '',
    weight: formatWeight({ ...product, peso: product.peso ?? product.weight ?? '' }),
    precio: priceValue,
    price: priceValue,
    categoria: normalizedCategory,
    category: normalizedCategory,
    destacado: Boolean(product.destacado ?? product.featured),
    featured: Boolean(product.destacado ?? product.featured),
    activo: product.activo ?? product.active ?? true,
    active: product.activo ?? product.active ?? true,
    imageKey,
    image,
  }
}

export const loadProducts = () => {
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY)
  if (!stored) {
    const initial = defaultProducts.map(normalizeProduct)
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initial))
    return initial
  }

  try {
    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed)) {
      const normalized = parsed.map(normalizeProduct)
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(normalized))
      return normalized
    }

    if (parsed && Array.isArray(parsed.products)) {
      const normalized = parsed.products.map(normalizeProduct)
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(normalized))
      return normalized
    }

    return []
  } catch {
    return []
  }
}

export const saveProducts = (products) => {
  const normalized = products.map(normalizeProduct)
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(normalized))
  return normalized
}
