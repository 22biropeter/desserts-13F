import type { Dessert } from '../../types'
import addToCartIcon from '../../assets/images/icon-add-to-cart.svg'
import decrementIcon from '../../assets/images/icon-decrement-quantity.svg'
import incrementIcon from '../../assets/images/icon-increment-quantity.svg'
import styles from './DessertCard.module.css'

interface DessertCardProps {
  dessert: Dessert
  quantity: number
  onAdd: () => void
  onIncrement: () => void
  onDecrement: () => void
}

const DessertCard = ({
  dessert,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: DessertCardProps) => {
  const isInCart = quantity > 0

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={dessert.image.desktop} />
          <source media="(min-width: 600px)" srcSet={dessert.image.tablet} />
          <img
            className={`${styles.image} ${isInCart ? styles.imageSelected : ''}`}
            src={dessert.image.mobile}
            alt={dessert.name}
          />
        </picture>

        {isInCart ? (
          <div className={styles.quantityControl} role="group" aria-label={`${dessert.name} quantity`}>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={onDecrement}
              aria-label={`Decrease quantity of ${dessert.name}`}
            >
              <img src={decrementIcon} alt="" aria-hidden="true" />
            </button>
            <span className={styles.quantityValue}>{quantity}</span>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={onIncrement}
              aria-label={`Increase quantity of ${dessert.name}`}
            >
              <img src={incrementIcon} alt="" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button type="button" className={styles.addButton} onClick={onAdd}>
            <img src={addToCartIcon} alt="" aria-hidden="true" />
            Add to Cart
          </button>
        )}
      </div>

      <p className={styles.category}>{dessert.category}</p>
      <h3 className={styles.name}>{dessert.name}</h3>
      <p className={styles.price}>${dessert.price.toFixed(2)}</p>
    </article>
  )
}

export default DessertCard
