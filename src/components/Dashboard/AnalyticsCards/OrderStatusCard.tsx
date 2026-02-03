import { Chart } from "react-google-charts";
import styles from "../../../styles/pages/AnalyticsCards/OrderStatusCard.module.css";
import type { MainLayoutContext } from '../../../layout/MainLayout'
import { useOutletContext } from 'react-router-dom';

type AnalyticsItem = {
  name: string;
  value: number;
};

const COLORS = ["#C1EAD4", "#FCF4D2", "#F5C3C4"];

const OrderStatusCard = () => {
  const { allOrders } = useOutletContext<MainLayoutContext>();

  const stats = allOrders.reduce<Record<string, number>>((acc, order) => {
    acc[order.status] = (acc[order.status] ?? 0) + 1;
    return acc;
  }, {});

  const data: AnalyticsItem[] = [
    { name: "Completed", value: stats.completed ?? 0 },
    { name: "Pending", value: stats.pending ?? 0 },
    { name: "Cancelled", value: stats.canceled ?? 0 },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const completedPercent = total ? Math.round((data[0].value / total) * 100) : 0;

  const chartData = [
    ["Status", "Count"],
    ...data.map(item => [item.name, item.value]),
  ];

  const options = {
    pieHole: 0.6,
    legend: "none",
    colors: COLORS,
    chartArea: { width: "90%", height: "90%" },
    pieSliceText: "none",
    tooltip: {
      isHtml: true,
      textStyle: { fontSize: 11 },
      trigger: 'focus',
    },
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Order Status</h3>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.pieChart}>
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width="100%"
            height="100%"
          />

          <div className={styles.centerText}>
            {completedPercent}%
          </div>
        </div>

        <div className={styles.statusList}>
          {data.map(o => (
            <div
              key={o.name}
              className={`${styles.statusItem} ${styles[o.name]}`}
            >
              <span className={styles.statusName}><b></b>{o.name}</span>
              <span className={styles.statusValue}>{o.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default OrderStatusCard;
