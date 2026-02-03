import styles from '../../styles/pages/AnalyticsCards/DashboardAnalytics.module.css'

const DashboardAnalytics = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className={styles.dashboardAnalytics}
    >
      {children}
    </div>
  )
}
export default DashboardAnalytics