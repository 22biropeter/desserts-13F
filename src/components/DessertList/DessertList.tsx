import type { CartItem, Dessert } from '../../types'
import DessertCard from '../DessertCard/DessertCard'
import styles from './DessertList.module.css'

interface DessertListProps {
  desserts: Dessert[]
  cartItems: CartItem[]
  onAdd: (dessert: Dessert) => void
  onIncrement: (name: string) => void
  onDecrement: (name: string) => void
}

const DessertList = ({
  desserts,
  cartItems,
  onAdd,
  onIncrement,
  onDecrement,
}: DessertListProps) => {
  const getQuantity = (name: string) =>
    cartItems.find((item) => item.name === name)?.quantity ?? 0

  return (
    <ul className={styles.list}>
      {desserts.map((dessert) => (
        <li key={dessert.name}>
          <DessertCard
            dessert={dessert}
            quantity={getQuantity(dessert.name)}
            onAdd={() => onAdd(dessert)}
            onIncrement={() => onIncrement(dessert.name)}
            onDecrement={() => onDecrement(dessert.name)}
          />
        </li>
      ))}
    </ul>
  )
}

export default DessertList
