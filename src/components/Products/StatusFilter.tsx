import styles from '../../pages/products/Products.module.css'
import type { StatusProps } from '../../data/products'

const StatusFilter = ({ status, onStatusChange }: StatusProps) => (
    <label className={styles.filter}>
        <span>Status:</span>
        <select
            className={styles.select}
            value={status}
            onChange={e => onStatusChange(e.target.value as StatusProps['status'])}
        >
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='outOfStock'>Out of Stock</option>
            <option value='inactive'>Inactive</option>
        </select>
    </label>
)

export default StatusFilter