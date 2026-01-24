import { useMemo, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import ProductsHeader from "../../components/Products/ProductsHeader"
import ProductsControls from "../../components/Products/ProductsControls"
import ProductsTable from "../../components/Products/ProductsTable"
import styles from './Products.module.css'
import type { CategoryProps, StockProps, DateAddProps, StatusProps, Product } from "../../data/products"
import type { MainLayoutContext } from '../../layout/MainLayout'

const Products = () => {
  const { useLocalForage, allProducts, setAllProducts } = useOutletContext<MainLayoutContext>()

  const [corrCategory, setCorrCategory] = useLocalForage<CategoryProps['category']>('products-category', 'all')
  const [corrStock, setCorrStock] = useLocalForage<StockProps['stock']>('products-stock', 'all')
  const [corrDateAdd, setCorrDateAdd] = useLocalForage<DateAddProps['dateAdd']>('products-dateadd', 'all')
  const [corrStatus, setCorrStatus] = useLocalForage<StatusProps['status']>('products-status', 'all')

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const categoryMatch = corrCategory === 'all' || p.type === corrCategory;
      const stockMatch = corrStock === 'all' 
        || (corrStock === 'inStock' && p.stock > 0) 
        || (corrStock === 'outOfStock' && p.stock === 0);
      const statusMatch = corrStatus === 'all' || p.status === corrStatus;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const productDate = new Date(p.date);
      const diffDays = Math.floor((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));

      const dateMatch = corrDateAdd === 'all'
        || (corrDateAdd === 'last24hours' && diffDays <= 1)
        || (corrDateAdd === 'last7days' && diffDays <= 7)
        || (corrDateAdd === 'last30days' && diffDays <= 30);


      return categoryMatch && stockMatch && statusMatch && dateMatch;
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