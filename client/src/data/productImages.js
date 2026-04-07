const imageModules = import.meta.glob('../assets/products/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default',
})

const FILE_OVERRIDES = {
  'huevos-de-campo': { key: 'huevos-campo', label: 'Huevos de campo' },
  Almendras: { key: 'almendras', label: 'Almendras' },
  Mani: { key: 'mani', label: 'Maní' },
  'Nueces-500grs': { key: 'nueces-500', label: 'Nueces 500gr' },
  Pistachos: { key: 'pistachos', label: 'Pistachos' },
  'Pistachos-500grs': { key: 'pistachos-500', label: 'Pistachos 500gr' },
  'Pasas-500grs': { key: 'pasas-500', label: 'Pasas 500gr' },
}

const toTitle = (value) => value
  .replace(/[-_]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\w/g, (char) => char.toUpperCase())

const slugify = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .toLowerCase()

export const productImageOptions = Object.entries(imageModules)
  .map(([filePath, src]) => {
    const filename = filePath.split('/').pop() ?? ''
    const baseName = filename.replace(/\.[^.]+$/, '')
    const override = FILE_OVERRIDES[baseName]

    return {
      key: override?.key ?? slugify(baseName),
      label: override?.label ?? toTitle(baseName),
      src,
      filePath,
    }
  })
  .sort((a, b) => a.label.localeCompare(b.label, 'es'))

export const productImageMap = Object.fromEntries(productImageOptions.map((image) => [image.key, image.src]))

export const defaultProductImageKey = productImageMap['huevos-campo']
  ? 'huevos-campo'
  : productImageOptions[0]?.key
