import { useCallback, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import ProductsHeader from '../../components/products/ProductsHeader'
import ProductsControls from '../../components/products/ProductsControls'
import ProductsTable from '../../components/products/ProductsTable'
import ProductsPagination from '../../components/products/ProductsPagination'
import ProductEditModal from '../../components/products/ProductEditModal'
import ProductsSummary from '../../components/products/ProductsSummary'
import styles from '../../styles/pages/page.module.css'
import type { CategoryProps, StockProps, DateAddProps, StatusProps, Product } from '../../data/products'
import type { MainLayoutContext } from '../../layout/MainLayout'

const Products = () => {
  const { useLocalForage, allProducts, setAllProducts, currUser, highlightedId } = useOutletContext<MainLayoutContext>()

  const [currCategory, setCurrCategory] = useLocalForage<CategoryProps['category'] | 'all'>('products-category', 'all')
  const [currStock, setCurrStock] = useLocalForage<StockProps['stock'] | 'all'>('products-stock', 'all')
  const [currDateAdd, setCurrDateAdd] = useLocalForage<DateAddProps['dateAdd'] | 'all'>('products-dateadd', 'all')
  const [currStatus, setCurrStatus] = useLocalForage<StatusProps['status'] | 'all'>('products-status', 'all')

  const [currentPage, setCurrentPage] = useState(1)
  const [visibleCount] = useState(10)

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const categoryMatch = currCategory === 'all' || p.type === currCategory;
      const stockMatch = currStock === 'all' || (currStock === 'inStock' && p.stock > 0) || (currStock === 'outOfStock' && p.stock === 0);
      const statusMatch = currStatus === 'all' || p.status === currStatus;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const productDate = new Date(p.date);
      const diffDays = Math.floor((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));

      const dateMatch = currDateAdd === 'all' || (currDateAdd === 'last24hours' && diffDays <= 1) || (currDateAdd === 'last7days' && diffDays <= 7) || (currDateAdd === 'last30days' && diffDays <= 30);

      return categoryMatch && stockMatch && statusMatch && dateMatch;
    });
  }, [allProducts, currCategory, currStock, currDateAdd, currStatus]);

  const totalPages = useMemo(() => Math.ceil(filteredProducts.length / visibleCount), [filteredProducts.length, visibleCount])

  const paginatedProduct = useMemo(() => {
    const start = (currentPage - 1) * visibleCount
    const end = currentPage * visibleCount
    return filteredProducts.slice(start, end)
  }, [filteredProducts, currentPage])

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }, [])

  const [userModalState, setUserModalState] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Product | undefined>(undefined)

  const handleEditProduct = useCallback((product?: Product) => {
    setSelectedProducts(product)
    setUserModalState(true)
  }, [])

  const productsModalClose = useCallback(() => {
    setUserModalState(false)
    setSelectedProducts(undefined)
  }, [])

  const productsModalHandleSave = useCallback((formProduct: Product) => {
    setAllProducts(prev => {
      const findIndex = prev.findIndex(p => p.id === formProduct.id)
      if (findIndex >= 0) {
        const updated = [...prev]
        updated[findIndex] = formProduct
        return updated
      } else {
        return [...prev, formProduct]
      }
    })
    productsModalClose()
    setCurrentPage(1)
  }, [])

  return (
    <div className={styles.page}>
      <ProductsHeader />
      <ProductsSummary
        products={allProducts}
      />
      <ProductsControls 
        category={currCategory}
        onCategoryChange={setCurrCategory}
        stock={currStock}
        onStockChange={setCurrStock}
        dateAdd={currDateAdd}
        onDateAddChange={setCurrDateAdd}
        status={currStatus}
        onStatusChange={setCurrStatus}
        onEdit={handleEditProduct}
        currUserRole={currUser?.role}
      />
      <ProductsTable 
        Products={paginatedProduct}
        onEdit={handleEditProduct}
        onDelete={(productId: number) => {
          setAllProducts(prevProducts => prevProducts.filter(p => p.id !== productId))
        }}
        currUserRole={currUser?.role}
        highlightedId={highlightedId}
      />
      {userModalState && (
        <ProductEditModal
          products={allProducts}
          product={selectedProducts}
          onSave={productsModalHandleSave}
          onClose={productsModalClose}
        />
      )}
      <ProductsPagination 
        onNextPage={handleNextPage}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  )
}

export default Products

