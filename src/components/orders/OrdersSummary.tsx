import type { Order } from '../../data/orders'
import styles from '../../styles/pages/summary.module.css';
import OrdersActiveIcon from '../../assets/icons/status-active.svg?react'
import OrdersInactiveIcon from '../../assets/icons/status-inactive.svg?react'
import OrdersOutOfStockIcon from '../../assets/icons/status-out-of-stock.svg?react'
import CartIcon from '../../assets/icons/cart.svg?react'

type OrdersSummaryProp = {
    orders: Order[]
}

const OrdersSummary = ({
    orders
}: OrdersSummaryProp) => {
    const totalOrders = orders;
    const pendingOrders = orders.filter((o) => {
        const ordersMatch = o.status === 'pending'
        
        return ordersMatch
    });
    const completedOrders = orders.filter((o) => {
        const ordersMatch = o.status === 'completed'
        
        return ordersMatch
    });
    const canceledOrders = orders.filter((o) => {
        const ordersMatch = o.status === 'canceled'
        
        return ordersMatch
    });


    return (
        <div className={styles.summaryContainer}>
            <div className={`${styles.summaryCard} ${styles.totalCard}`}>
                <CartIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Total Orders</span>
                    <p className={styles.count}>{totalOrders.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.activeCard}`}>
                <OrdersActiveIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Completed Orders</span>
                    <p className={styles.count}>{completedOrders.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.inactiveCard}`}>
                <OrdersInactiveIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Pending Orders</span>
                    <p className={styles.count}>{pendingOrders.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.outOfStockCard}`}>
                <OrdersOutOfStockIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Canceled Orders</span>
                    <p className={styles.count}>{canceledOrders.length}</p>
                </div>
            </div>
        </div>
    )
}

export default OrdersSummary