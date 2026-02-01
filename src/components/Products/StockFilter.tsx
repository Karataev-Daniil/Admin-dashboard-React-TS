import styles from '../../styles/pages/controls.module.css'
import type { StockProps } from '../../data/products'

const StockFilter = ({ stock, onStockChange }: StockProps) => (
    <label className={styles.filter}>
        <span>Stock:</span>
        <select
            className={styles.select}
            value={stock}
            onChange={e => onStockChange(e.target.value as StockProps['stock'])}
        >
            <option value='all'>All</option>
            <option value='inStock'>In Stock</option>
            <option value='outOfStock'>Out of Stock</option>
        </select>
    </label>
)

export default StockFilter