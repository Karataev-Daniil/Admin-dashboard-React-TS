import styles from '../../../styles/pages/analytics-cards/SalesByCategoryCard.module.css';
import type { MainLayoutContext } from '../../../layout/MainLayout';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';

const SalesByCategoryCard = () => {
  const { allOrders } = useOutletContext<MainLayoutContext>();

  const topCategories = useMemo(() => {
    const salesByCategory: Record<
      string,
      { count: number; total: number }
    > = {};

    allOrders.forEach(order => {
      order.products.forEach(item => {
        if (order.status !== 'completed') return;

        if (!item.type) return;

        if (!salesByCategory[item.type]) {
          salesByCategory[item.type] = { count: 0, total: 0 };
        }

        salesByCategory[item.type].count += 1;
        salesByCategory[item.type].total += item.price;
      });
    });

    const sorted = Object.entries(salesByCategory)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 3);

    const maxCount = sorted[0]?.[1].count || 1;

    return sorted.map(([category, stats]) => ({
      category,
      count: stats.count,
      total: stats.total,
      percent: Math.round((stats.count / maxCount) * 100),
    }));
  }, [allOrders]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Sales By Category</h3>
      </div>

      <div className={styles.list}>
        {topCategories.map(item => (
          <div key={item.category} className={styles.row}>
            <div className={styles.rowHeader}>
              <span className={styles.category}>{item.category}</span>
              <span className={styles.percent}>{item.percent}%</span>
            </div>

            <div className={styles.bar}>
              <div
                className={styles.fill}
                style={{ width: `${item.percent}%` }}
              />
            </div>

            <div className={styles.meta}>
              <span>{item.count} sales</span>
              <span>
                {item.total.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesByCategoryCard;
