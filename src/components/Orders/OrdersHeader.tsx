import styles from '../../styles/pages/common.module.css'

const OrdersHeader = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Order Management</h1>
            <hr className={styles.divider} />
        </div>
    )
}

export default OrdersHeader