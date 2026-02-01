import type { Product } from '../../data/products'
import styles from '../../styles/pages/summary.module.css';
import ProductTotalIcon from '../../assets/icons/products-total.svg?react'
import ProductsActiveIcon from '../../assets/icons/products-active.svg?react'
import ProductsInactiveIcon from '../../assets/icons/products-inactive.svg?react'
import ProductsOutOfStockIcon from '../../assets/icons/products-out-of-stock.svg?react'

type ProductsSummaryProps = {
    products: Product[]
}
const ProductsSummary = ({products}: ProductsSummaryProps) => {
    const totalProducts = products
    const activeProducts = products.filter((p) => {
        const productMatch = p.status === 'active'
        
        return productMatch
    })
    const inactiveProducts = products.filter((p) => {
        const productMatch = p.status === 'inactive'

        return productMatch
    })
    const outOfStockProducts = products.filter((p) => {
        const productMatch = p.status === 'outOfStock'

        return productMatch
    })

     return (
        <div className={styles.summaryContainer}>
            <div className={`${styles.summaryCard} ${styles.totalCard}`}>
                <ProductTotalIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Total Products</span>
                    <p className={styles.count}>{totalProducts.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.activeCard}`}>
                <ProductsActiveIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Active Products</span>
                    <p className={styles.count}>{activeProducts.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.inactiveCard}`}>
                <ProductsInactiveIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Inactive Products</span>
                    <p className={styles.count}>{inactiveProducts.length}</p>
                </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.outOfStockCard}`}>
                <ProductsOutOfStockIcon 
                    className={styles.icon}
                />
                <div className={styles.content}>
                    <span className={styles.label}>Out Of Stock Products</span>
                    <p className={styles.count}>{outOfStockProducts.length}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductsSummary