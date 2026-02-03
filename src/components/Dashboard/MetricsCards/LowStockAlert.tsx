import type { MainLayoutContext } from '../../../layout/MainLayout'
import { useOutletContext, useNavigate } from 'react-router-dom'
import StockProducts from '../../../assets/icons/status-out-of-stock.svg?react'
import styles from '../../../styles/pages/MetricsCards/LowStockAlert.module.css'

const LowStockAlert = () => {
    const navigate = useNavigate()
    const { allProducts } = useOutletContext<MainLayoutContext>()

    const lowStockProducts = allProducts.filter(p => p.stock <= 5 && p.stock > 0)
    const outStockProducts = allProducts.filter(p => p.stock <= 0)

    const iconClass =
        outStockProducts.length > 0
            ? styles.iconDanger
            : lowStockProducts.length > 0
                ? styles.iconWarning
                : styles.iconNormal

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>
                <StockProducts className={`${styles.icon} ${iconClass}`} />
                Low Stock Alert
            </h2>

            <div className={styles.info}>
                {lowStockProducts.length}{' '}
                {lowStockProducts.length === 1 ? 'product' : 'products'} below 5 in stock
            </div>

            <div className={styles.info}>
                {outStockProducts.length}{' '}
                {outStockProducts.length === 1 ? 'product' : 'products'} are out of stock
            </div>

            <button
                className={styles.button}
                onClick={() => navigate('/products')}
            >
                View All
            </button>
        </div>
    )
}

export default LowStockAlert
