import styles from '../../pages/products/Products.module.css'
import type { DateAddProps } from '../../data/products'

const DateAddFilter = ({ dateAdd, onDateAddChange }: DateAddProps) => (
    <label className={styles.filter}>
        <span>DateAdd:</span>
        <select
            className={styles.select}
            value={dateAdd}
            onChange={e => onDateAddChange(e.target.value as DateAddProps['dateAdd'])}
        >
            <option value='all'>All</option>
            <option value='last24hours'>Last 24 hours</option>
            <option value='last7days'>Last 7 days</option>
            <option value='last30days'>Last 30 days</option>
        </select>
    </label>
)

export default DateAddFilter
