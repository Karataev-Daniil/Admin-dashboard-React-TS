import DashboardHeader from '../../components/dashboard/DashboardHeader'
import DashboardSummary from '../../components/dashboard/DashboardSummary'
import DashboardRecentActivity from '../../components/dashboard/DashboardRecentActivity'
import styles from '../../styles/pages/page.module.css'

import DashboardAnalytics from '../../components/dashboard/DashboardAnalytics'
import RevenueCard from '../../components/dashboard/analytics-cards/RevenueCard'
import OrderStatusCard from '../../components/dashboard/analytics-cards/OrderStatusCard'
import SalesByCategoryCard from '../../components/dashboard/analytics-cards/SalesByCategoryCard'

import DashboardMetrics from '../../components/dashboard/DashboardMetrics'
// import CancelledOrders from '../../components/dashboard/metrics-cards/CancelledOrders'
import LowStockAlert from '../../components/dashboard/metrics-cards/LowStockAlert'
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