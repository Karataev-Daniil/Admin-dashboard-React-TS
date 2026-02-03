import styles from '../../styles/pages/MetricsCards/DashboardMetrics.module.css'

const DashboardMetrics = ({children} : { children: React.ReactNode }) => {

    return (
        <div
            className={styles.dashboardMetrics}
        >
            {children}
        </div>
    )
}

export default DashboardMetrics