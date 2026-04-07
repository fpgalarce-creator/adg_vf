import { useEffect, useState } from 'react'
import { loadProducts, saveProducts } from '../utils/productStore.js'

export function useProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(loadProducts())
  }, [])

  const persistProducts = (nextProducts) => {
    const saved = saveProducts(nextProducts)
    setProducts(saved)
    return saved
  }

  return { products, setProducts: persistProducts }
}
