import { useMemo, useState, useCallback } from 'react'
import { useOutletContext } from "react-router-dom";
import ProductsHeader from "../../components/Products/ProductsHeader"
import ProductsControls from "../../components/Products/ProductsControls"
import ProductsTable from "../../components/Products/ProductsTable"
import styles from './Products.module.css'
import type { CategoryProps, StockProps, DateAddProps, StatusProps, Product } from "../../data/products"
import type { MainLayoutContext } from '../../layout/MainLayout'

const Products = () => {
  const { useLocalForage, allProducts, setAllProducts } = useOutletContext<MainLayoutContext>()

  const [corrCategory, setCorrCategory] = useState<CategoryProps['category']>('all')
  const [corrStock, setCorrStock] = useState<StockProps['stock']>('all')
  const [corrDateAdd, setCorrDateAdd] = useState<DateAddProps['dateAdd']>('all')
  const [corrStatus, setCorrStatus] = useState<StatusProps['status']>('all')

const filteredProducts = useMemo(() => {
  const now = new Date();

  return allProducts.filter((p) => {
    const categoryMatch = corrCategory === 'all' || p.type === corrCategory;
    const stockMatch = corrStock === 'all' || (corrStock === 'inStock' && p.stock > 0) || (corrStock === 'outOfStock' && p.stock === 0);

    let dateAddMatch = true;
    if (corrDateAdd !== 'all') {
      const productDate = new Date(p.date);
      const daysMap: Record<string, number> = {
        last24hours: 1,
        last7days: 7,
        last30days: 30,
      };
      const daysAgo = daysMap[corrDateAdd];
      if (daysAgo) {
        const compareDate = new Date();
        compareDate.setDate(now.getDate() - daysAgo);
        dateAddMatch = productDate >= compareDate;
      }
    }

    // Статус
    const statusMatch = corrStatus === 'all' || p.status.toLowerCase() === corrStatus;

    return categoryMatch && stockMatch && dateAddMatch && statusMatch;
  });
}, [allProducts, corrCategory, corrStock, corrDateAdd, corrStatus]);


  return (
    <div className={styles.page}>
      <ProductsHeader />
      <ProductsControls 
        category={corrCategory}
        onCategoryChange={setCorrCategory}
        stock={corrStock}
        onStockChange={setCorrStock}
        dateAdd={corrDateAdd}
        onDateAddChange={setCorrDateAdd}
        status={corrStatus}
        onStatusChange={setCorrStatus}
        onEdit={() => {}}
      />
      <ProductsTable 
        Products={filteredProducts}
        onEdit={() => {}}
        onDelete={(productId: number) => {
          setAllProducts(prevProducts => prevProducts.filter(p => p.id !== productId))
        }}
      />
    </div>
  )
}

export default Products