import { Chart } from 'react-google-charts';
import { useState, useMemo } from 'react';
import styles from '../../../styles/pages/AnalyticsCards/RevenueCard.module.css';
import type { MainLayoutContext } from '../../../layout/MainLayout'
import { useOutletContext } from 'react-router-dom';

type Period = '1W' | '1M' | '3M' | '1Y';

const PERIODS: Record<Period, number> = {
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '1Y': 365,
};

const PERIOD_LIST: Period[] = ['1W', '1M', '3M', '1Y'];

const RevenueCard = () => {
  const { allOrders } = useOutletContext<MainLayoutContext>()
  const [period, setPeriod] = useState<Period>('1M');

  const { chartData, totalRevenue } = useMemo(() => {
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - PERIODS[period]);
    startDate.setHours(0, 0, 0, 0);

    const revenueMap = new Map<string, number>();
    let total = 0;

    allOrders.forEach(order => {
      if (order.status !== 'completed') return;

      const orderDate = new Date(order.date);
      if (orderDate < startDate || orderDate > now) return;

      const day = orderDate.toLocaleDateString('ru-RU');

      revenueMap.set(day, (revenueMap.get(day) || 0) + order.total);
      total += order.total;
    });

    const sorted = Array.from(revenueMap.entries())
      .map(([date, total]) => [date, total])
      .sort(
        (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
      );

    return {
      chartData: [
        ['Date', 'Revenue'],
        ...sorted,
      ],
      totalRevenue: total,
    };
  }, [period]);

  const options = {
    legend: 'none',
    chartArea: {
      width: '85%',
      height: '85%',
    },
    colors: ['#dbe4ff'],
    bar: { groupWidth: '80%' },
    vAxis: {
      format: 'short',
      gridlines: { color: '#EDEEEE' },
      textStyle: { fontSize: 12, color: '#6B6F73' },
    },
    tooltip: {
      isHtml: true,
      textStyle: { fontSize: 14 },
      trigger: 'focus',
    },
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Revenue Over Time</h3>
      </div>

      <div className={styles.metric}>
        <span className={styles.value}>
          {totalRevenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>

      <div className={styles.chart}>
        <Chart
          chartType='ColumnChart'
          data={chartData}
          options={options}
          width='100%'
          height='100px'
        />
      </div>

      <div className={styles.tabs}>
        {PERIOD_LIST.map(p => (
          <button
            key={p}
            className={`${styles.tabButton} ${
              period === p ? styles.active : ''
            }`}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RevenueCard;
