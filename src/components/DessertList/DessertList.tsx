import type { CartItem, Dessert } from '../../types'
import DessertCard from '../DessertCard/DessertCard'
import styles from './DessertList.module.css'
import {useCartStore} from '../../data/CartStore'

interface DessertListProps {
  desserts: Dessert[]
}

const DessertList = ({desserts
}: DessertListProps) => {

  const {items,decrementItem,incrementItem,addItem} = useCartStore()

  const getQuantity = (name: string) =>
    items.find((item) => item.name === name)?.quantity ?? 0

  return (
    <ul className={styles.list}>
      {desserts.map((dessert) => (
        <li key={dessert.name}>
          <DessertCard
            dessert={dessert}
            quantity={getQuantity(dessert.name)}
            onAdd={() => addItem(dessert)}
            onIncrement={() => incrementItem(dessert.name)}
            onDecrement={() => decrementItem(dessert.name)}
          />
        </li>
      ))}
    </ul>
  )
}

export default DessertList
