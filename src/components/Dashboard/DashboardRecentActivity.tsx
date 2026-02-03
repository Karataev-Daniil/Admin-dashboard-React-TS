import { useOutletContext, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import styles from '../../styles/pages/common.module.css';
import type { MainLayoutContext } from '../../layout/MainLayout'

const DashboardRecentActivity = ({}) => {
    const navigate = useNavigate();

    const { allOrders, allProducts } = useOutletContext<MainLayoutContext>()

    const recentProducts = useMemo(() => {
        return allProducts.slice(-5).reverse();
    }, [allProducts]);

    const recentOrders = useMemo(() => {
        return allOrders.slice(-5).reverse();
    }, [allOrders]);

    return (
        <div className={styles.activityContainer}>
            <div className={styles.activitySection}>
                <h2 className={styles.sectionTitle}>Recent Products</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <span className={styles.id}>#{product.id}</span>
                                    </td>
                                    <td>
                                        <span className={styles.name}>{product.name}</span>
                                    </td>
                                    <td>
                                        <span className={styles.price}>${product.price}</span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[product.status.replace(/\s+/g, '').toLowerCase()]}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button 
                                        className={styles.tableButton}
                                        onClick={() => navigate('/products')}
                                    >
                                        View All
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className={styles.activitySection}>
                <h2 className={styles.sectionTitle}>Recent Orders</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <span className={styles.id}>#{order.id}</span>
                                    </td>
                                    <td>
                                        <span className={styles.customer}>{order.userName}</span>
                                    </td>
                                    <td>
                                        <span className={styles.price}>${order.total}</span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[order.status.replace(/\s+/g, '').toLowerCase()]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button 
                                        className={styles.tableButton}
                                        onClick={() => navigate('/orders')}
                                    >
                                        View All
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashboardRecentActivity