const MIN_FEATURED_TARGET = 5
const MAX_HIGHLIGHTED_ITEMS = 10

export function getHighlightedProducts(products, maxItems = MAX_HIGHLIGHTED_ITEMS) {
  const activeProducts = products.filter((product) => product.active)
  const featuredProducts = activeProducts.filter((product) => product.featured)

  if (featuredProducts.length >= MIN_FEATURED_TARGET) {
    return featuredProducts.slice(0, maxItems)
  }

  const fallbackProducts = activeProducts.filter((product) => !product.featured)
  return [...featuredProducts, ...fallbackProducts].slice(0, maxItems)
}

export { MIN_FEATURED_TARGET, MAX_HIGHLIGHTED_ITEMS }
