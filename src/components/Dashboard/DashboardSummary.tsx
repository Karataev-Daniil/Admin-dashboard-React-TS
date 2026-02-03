import styles from '../../styles/pages/summary.module.css';
import ProductTotalIcon from '../../assets/icons/products-total.svg?react'
import UsersTotalIcon from '../../assets/icons/users-total.svg?react'
import OrdersTotalIcon from '../../assets/icons/cart.svg?react'
import { useOutletContext } from 'react-router-dom';
import type { MainLayoutContext } from '../../layout/MainLayout'

const DashboardSummary = ({}) => {
    const { allUsers, allOrders, allProducts } = useOutletContext<MainLayoutContext>()
    
    return (
        <div className={styles.summaryContainer}>
            <div className={`${styles.summaryCard}`}>
                <UsersTotalIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Total Users</span>
                    <p className={styles.count}>{allUsers.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard}`}>
                <ProductTotalIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Total Products</span>
                    <p className={styles.count}>{allProducts.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard}`}>
                <OrdersTotalIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Total Orders</span>
                    <p className={styles.count}>{allOrders.length}</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardSummary