import huevosCampo from '../assets/products/huevos-de-campo.jpeg'
import almendras from '../assets/products/Almendras.jpeg'
import mani from '../assets/products/Mani.jpeg'
import nueces500 from '../assets/products/Nueces-500grs.jpeg'
import pistachos from '../assets/products/Pistachos.jpeg'
import pistachos500 from '../assets/products/Pistachos-500grs.jpeg'
import pasas500 from '../assets/products/Pasas-500grs.jpeg'

export const productImageOptions = [
  { key: 'huevos-campo', label: 'Huevos de campo', src: huevosCampo },
  { key: 'almendras', label: 'Almendras', src: almendras },
  { key: 'mani', label: 'Maní', src: mani },
  { key: 'nueces-500', label: 'Nueces 500gr', src: nueces500 },
  { key: 'pistachos', label: 'Pistachos', src: pistachos },
  { key: 'pistachos-500', label: 'Pistachos 500gr', src: pistachos500 },
  { key: 'pasas-500', label: 'Pasas 500gr', src: pasas500 },
]

export const productImageMap = Object.fromEntries(
  productImageOptions.map((image) => [image.key, image.src]),
)

export const defaultProductImageKey = productImageOptions[0].key
