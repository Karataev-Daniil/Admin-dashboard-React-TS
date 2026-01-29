import styles from '../../pages/Orders/Orders.module.css'
import OrderRow from './OrderRow'
import type { Order } from '../../data/orders'
import type { User } from '../../data/users'

type OrdersTableProps = {
    Orders: Order[]
    onDelete: (OrderId: number) => void
    currUserRole: User['role'] | undefined
    highlightedId: number | null
}

const OrdersTable = ({
    Orders,
    onDelete,
    currUserRole,
    highlightedId
}: OrdersTableProps) => {
    const canManageOrders = currUserRole === 'admin' || currUserRole === 'manager';

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Order_ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {Orders.map((Order) => (
                        <OrderRow 
                            key={Order.id}
                            // Orders={Orders}
                            order={Order}
                            // onDelete={onDelete}
                            currUserRole={currUserRole}
                            highlightedId={highlightedId}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
