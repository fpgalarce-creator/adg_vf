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
      const safeData = data || []
      
      const mapped = safeData.map(p => ({
        id: p?.id,
        name: p?.name,
        description: p?.description,
        price: p?.price,
        weight: p?.weight,
        category: p?.category,
        imageKey: p?.image, 
        featured: p?.featured,
        active: p?.active
      }))
      setProducts(mapped.map(normalizeProduct))
    } catch (err) {
      console.error('Error fetching products:', err)
      setProducts([])
      setError('No hay productos disponibles')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { 
    products: products || [], 
    isLoading, 
    error,
    setProducts, 
    refreshProducts: fetchProducts
  }
}
