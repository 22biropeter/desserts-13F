export interface DessertImage {
  thumbnail: string
  mobile: string
  tablet: string
  desktop: string
}

export interface Dessert {
  image: DessertImage
  name: string
  category: string
  price: number
}

export interface CartItem extends Dessert {
  quantity: number
}
