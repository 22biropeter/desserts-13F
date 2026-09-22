
import orderConfirmedIcon from '../../assets/images/icon-order-confirmed.svg'
import styles from './OrderConfirmationModal.module.css'
import { useCartStore } from '../../data/CartStore'

interface OrderConfirmationModalProps {
  onStartNewOrder: () => void
}

const OrderConfirmationModal = ({
  onStartNewOrder
}: OrderConfirmationModalProps) => {

  const {items} = useCartStore() 

  const orderTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  )

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmation-title"
      >
        <img src={orderConfirmedIcon} alt="" aria-hidden="true" className={styles.icon} />

        <h2 id="order-confirmation-title" className={styles.title}>
          Order Confirmed
        </h2>
        <p className={styles.subtitle}>We hope you enjoy your food!</p>

        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item.name} className={styles.item}>
              <img
                className={styles.itemImage}
                src={item.image.thumbnail}
                alt={item.name}
              />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemMeta}>
                  <span className={styles.itemQuantity}>{item.quantity}x</span>
                  <span className={styles.itemUnitPrice}>@ ${item.price.toFixed(2)}</span>
                </p>
              </div>
              <span className={styles.itemTotalPrice}>
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.total}>
          <span>Order Total</span>
          <span className={styles.totalPrice}>${orderTotal.toFixed(2)}</span>
        </div>

        <button type="button" className={styles.startNewOrderButton} onClick={onStartNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmationModal
