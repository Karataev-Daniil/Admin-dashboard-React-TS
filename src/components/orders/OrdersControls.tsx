import type { Dispatch, SetStateAction } from 'react'
import type { Order } from '../../data/orders'
import StatusFilter from './StatusFilter'
import styles from '../../styles/pages/controls.module.css'

type OrdersControlsProps = {
    status: Order['status'] | 'all'
    onStatusChange: Dispatch<SetStateAction<Order['status'] | 'all'>>
    onEdit: () => void
}
const OrdersControls = ({
    status,
    onStatusChange,
    onEdit
}: OrdersControlsProps) => {

    return (
        <div className={styles.controls}>
            <div className={styles.filters}>
                <StatusFilter
                    status={status} 
                    onStatusChange={onStatusChange}
                />
            </div>
            <button 
                className={styles.addButton}
                onClick={() => onEdit()}
            >
                Add Order
            </button>
        </div>
    )
}

export default OrdersControls