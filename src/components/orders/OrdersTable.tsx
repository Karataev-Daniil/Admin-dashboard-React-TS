import styles from '../../styles/pages/table.module.css'
import OrderRow from './OrderRow'
import type { Order } from '../../data/orders'

type OrdersTableProps = {
    Orders: Order[]
    onDelete: (OrderId: number) => void
    highlightedId: number | null
    onEdit: (order: Order) => void
}

const OrdersTable = ({
    Orders,
    onDelete,
    highlightedId,
    onEdit
}: OrdersTableProps) => {
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
                            onDelete={onDelete}
                            highlightedId={highlightedId}
                            onEdit={onEdit}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
