import styles from '../../pages/orders/Orders.module.css'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import CalendarIcon from '../../assets/icons/calendar.svg?react'
import type { Order } from "../../data/orders"
import type { User } from "../../data/users"
import Orders from '../../pages/orders/Orders'

type OrderRowProps = {
    // orders: Order[]
    order: Order
    // onDelete: () => void
    currUserRole: User['role'] | undefined
    highlightedId: number | null
}

const OrderRow = ({
    // orders,
    order,
    // onDelete,
    currUserRole,
    highlightedId,
}: OrderRowProps) => {

    return (
        <tr className={`${styles.row} ${highlightedId === order.id ? styles.highlight : ''}`}>
            <td>
                <span className={styles.id}>#{order.id}</span>
            </td>
            <td
                className={styles.userInfo}
            >
                <span className={styles.userName}>{order.userName}</span>
                <span className={styles.userEmail}>{order.userEmail}</span>
            </td>
            <td>
                <span className={styles.date}>{order.date}</span>
            </td>
            <td>
                <span className={styles.total}>${order.total}</span>
            </td>
            <td>
                <span className={`${styles.badge} ${styles[order.status.replace(/\s+/g, '').toLowerCase()]}`}>{order.status}</span>
            </td>
            <td
                className={styles.actions}
            >
                <button
                    className={styles.actionBtn}
                >
                    <CalendarIcon />
                    View details
                </button>
                <button
                    className={`${styles.actionBtn} ${styles.danger}`}
                >
                    <DeleteIcon />
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default OrderRow