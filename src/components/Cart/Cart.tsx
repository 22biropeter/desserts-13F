import emptyCartIllustration from '../../assets/images/illustration-empty-cart.svg'
import removeItemIcon from '../../assets/images/icon-remove-item.svg'
import carbonNeutralIcon from '../../assets/images/icon-carbon-neutral.svg'
import styles from './Cart.module.css'
import { useCartStore } from '../../data/CartStore'

interface CartProps {
  onConfirm: () => void
}

const Cart = ({ onConfirm }: CartProps) => {

  const {items,removeItem} = useCartStore()

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const orderTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  )

  return (
    <section className={styles.cart} aria-label="Your cart">
      <h2 className={styles.title}>Your Cart ({totalQuantity})</h2>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <img src={emptyCartIllustration} alt="" aria-hidden="true" />
          <p className={styles.emptyText}>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className={styles.items}>
            {items.map((item) => (
              <li key={item.name} className={styles.item}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>
                    <span className={styles.itemQuantity}>{item.quantity}x</span>
                    <span className={styles.itemUnitPrice}>@ ${item.price.toFixed(2)}</span>
                    <span className={styles.itemTotalPrice}>
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeItem(item.name)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <img src={removeItemIcon} alt="" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <span>Order Total</span>
            <span className={styles.totalPrice}>${orderTotal.toFixed(2)}</span>
          </div>

          <div className={styles.carbonNeutral}>
            <img src={carbonNeutralIcon} alt="" aria-hidden="true" />
            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <button type="button" className={styles.confirmButton} onClick={onConfirm}>
            Confirm Order
          </button>
        </>
      )}
    </section>
  )
}

export default Cart
