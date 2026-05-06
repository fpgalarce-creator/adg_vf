import { useEffect, useState, useCallback } from 'react'
import { productsService } from '../services/productsService.js'
import { normalizeProduct } from '../utils/productStore.js'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await productsService.getProducts()
      // Map supabase columns to what normalizeProduct expects
      const mapped = data.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        weight: p.weight,
        category: p.category,
        imageKey: p.image, // We store the image key in the image column
        featured: p.featured,
        active: p.active
      }))
      setProducts(mapped.map(normalizeProduct))
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('No se pudieron cargar los productos.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { 
    products, 
    isLoading, 
    error,
    setProducts, // AdminPage might still use this temporarily or we can rely on refreshProducts
    refreshProducts: fetchProducts
  }
}
