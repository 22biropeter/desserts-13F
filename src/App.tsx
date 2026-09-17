import { useEffect, useState } from 'react'
import type { CartItem, Dessert } from './types'
import Header from './components/Header/Header'
import DessertList from './components/DessertList/DessertList'
import Cart from './components/Cart/Cart'
import OrderConfirmationModal from './components/OrderConfirmationModal/OrderConfirmationModal'
import styles from './App.module.css'

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)

  const [desserts, setDesserts] = useState<Dessert[]>([])

  useEffect(() => {
    fetch('data.json')
    .then((response) => response.json())
    .then((data) => setDesserts(data))
    .catch((error) => console.error('Error fetching desserts:', error))
  }, [])

  const handleAdd = (dessert: Dessert) => {
    setCartItems((current) => [...current, { ...dessert, quantity: 1 }])
  }

  const handleIncrement = (name: string) => {
    setCartItems((current) =>
      current.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const handleDecrement = (name: string) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleRemove = (name: string) => {
    setCartItems((current) => current.filter((item) => item.name !== name))
  }

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true)
  }

  const handleStartNewOrder = () => {
    setCartItems([])
    setIsOrderConfirmed(false)
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.layout}>
        <DessertList
          desserts={desserts}
          cartItems={cartItems}
          onAdd={handleAdd}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />

        <div className={styles.cartColumn}>
          <Cart
            items={cartItems}
            onRemove={handleRemove}
            onConfirm={handleConfirmOrder}
          />
        </div>
      </main>

      {isOrderConfirmed && (
        <OrderConfirmationModal
          items={cartItems}
          onStartNewOrder={handleStartNewOrder}
        />
      )}
    </div>
  )
}

export default App