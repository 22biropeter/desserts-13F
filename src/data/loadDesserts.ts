import type { Dessert, DessertImage } from '../types'

type JsonDessert = Omit<Dessert, 'image'> & {
  image: DessertImage
}

const imageAssets = import.meta.glob('../assets/images/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const getImageUrl = (path: string) => {
  const fileName = path.split('/').pop()
  const assetPath = Object.keys(imageAssets).find((key) => key.endsWith(`/${fileName}`))

  if (!assetPath) {
    throw new Error(`Image asset not found: ${path}`)
  }

  return imageAssets[assetPath]
}

const isJsonDessert = (value: unknown): value is JsonDessert => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const dessert = value as Partial<JsonDessert>
  const image = dessert.image

  return (
    typeof dessert.name === 'string' &&
    typeof dessert.category === 'string' &&
    typeof dessert.price === 'number' &&
    Number.isFinite(dessert.price) &&
    !!image &&
    typeof image.thumbnail === 'string' &&
    typeof image.mobile === 'string' &&
    typeof image.tablet === 'string' &&
    typeof image.desktop === 'string'
  )
}

export const loadDesserts = async (): Promise<Dessert[]> => {
  const response = await fetch('/data.json')

  if (!response.ok) {
    throw new Error(`Failed to load desserts: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isJsonDessert)) {
    throw new Error('Invalid dessert data format')
  }

  return data.map((dessert) => ({
    ...dessert,
    image: {
      thumbnail: getImageUrl(dessert.image.thumbnail),
      mobile: getImageUrl(dessert.image.mobile),
      tablet: getImageUrl(dessert.image.tablet),
      desktop: getImageUrl(dessert.image.desktop),
    },
  }))
}
