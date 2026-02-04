import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import DashboardSummary from '../../components/Dashboard/DashboardSummary'
import DashboardRecentActivity from '../../components/Dashboard/DashboardRecentActivity'
import styles from '../../styles/pages/page.module.css'

import DashboardAnalytics from '../../components/Dashboard/DashboardAnalytics'
import RevenueCard from '../../components/Dashboard/analytics-cards/RevenueCard'
import OrderStatusCard from '../../components/Dashboard/analytics-cards/OrderStatusCard'
import SalesByCategoryCard from '../../components/Dashboard/analytics-cards/SalesByCategoryCard'

import DashboardMetrics from '../../components/Dashboard/DashboardMetrics'
// import CancelledOrders from '../../components/dashboard/metrics-cards/CancelledOrders'
import LowStockAlert from '../../components/Dashboard/metrics-cards/LowStockAlert'
// import CompletedOrders from '../../components/dashboard/metrics-cards/CompletedOrders'

const Dashboard = ({

}) => {

  return (
    <div className={styles.page}>
      <DashboardHeader />
      <DashboardSummary />
      <DashboardRecentActivity />
      <DashboardAnalytics>
        <RevenueCard />
        <OrderStatusCard />
        <SalesByCategoryCard />
      </DashboardAnalytics>
      <DashboardMetrics>
        {/* <CancelledOrders /> */}
        <LowStockAlert />
        {/* <CompletedOrders /> */}
      </DashboardMetrics>
    </div>
  )
}

export default Dashboard