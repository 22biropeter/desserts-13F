import { useEffect, useState } from 'react'
import type { CartItem, Dessert } from './types'
import Header from './components/Header/Header'
import DessertList from './components/DessertList/DessertList'
import Cart from './components/Cart/Cart'
import OrderConfirmationModal from './components/OrderConfirmationModal/OrderConfirmationModal'
import styles from './App.module.css'
import { loadDesserts } from './data/loadDesserts'

const App = () => {
  const [desserts, setDesserts] = useState<Dessert[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    loadDesserts()
      .then((loadedDesserts) => {
        if (isMounted) {
          setDesserts(loadedDesserts)
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setLoadError(
            error instanceof Error ? error.message : 'Failed to load desserts',
          )
        }
      })

    return () => {
      isMounted = false
    }
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
        {loadError ? (
          <p role="alert">{loadError}</p>
        ) : (
          <DessertList
            desserts={desserts}
            cartItems={cartItems}
            onAdd={handleAdd}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}

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