import type { Dispatch, SetStateAction } from 'react'
import type { Order } from '../../data/orders'
import StatusFilter from './StatusFilter'
import styles from '../../styles/pages/controls.module.css'

type OrdersControlsProps = {
    status: Order['status'] | 'all'
    onStatusChange: Dispatch<SetStateAction<Order['status'] | 'all'>>
}
const OrdersControls = ({
    status,
    onStatusChange
}: OrdersControlsProps) => {

    return (
        <div className={styles.controls}>
            <div className={styles.filters}>
                <StatusFilter
                    status={status} 
                    onStatusChange={onStatusChange}
                />
            </div>
        </div>
    )
}

export default OrdersControls