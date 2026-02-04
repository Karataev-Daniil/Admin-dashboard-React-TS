import type { Dispatch, SetStateAction } from 'react'
import styles from '../../styles/pages/controls.module.css'
import type { Order } from '../../data/orders'

type StatusFilterProp = {
    status: Order['status'] | 'all'
    onStatusChange: Dispatch<SetStateAction<Order['status'] | 'all'>>
}

const StatusFilter = ({
    status,
    onStatusChange
}: StatusFilterProp) => {
    return (
        <label className={styles.filter}>
            <span>Status:</span>
            <select
                className={styles.select}
                value={status}
                onChange={e => onStatusChange(e.target.value as StatusFilterProp['status'])}
            >
                <option value={'all'}>All</option>
                <option value={'completed'}>Completed</option>
                <option value={'pending'}>Pending</option>
                <option value={'canceled'}>Canceled</option>
            </select>
        </label>
    )
}

export default StatusFilter