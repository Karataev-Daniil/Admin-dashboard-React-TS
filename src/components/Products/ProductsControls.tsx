import styles from '../../pages/products/Products.module.css'
import CategoryFilter from './CategoryFilter'
import StockFilter from './StockFilter'
import DateAddFilter from './DateAddFilter'
import StatusFilter from './StatusFilter'
import type { CategoryProps, StockProps, DateAddProps, StatusProps, Product } from '../../data/products'
import type { User } from '../../data/users'

type ProductsControlsProps = {
    category: CategoryProps['category']
    onCategoryChange: CategoryProps['onCategoryChange']
    stock: StockProps['stock']
    onStockChange: StockProps['onStockChange']
    dateAdd: DateAddProps['dateAdd']
    onDateAddChange: DateAddProps['onDateAddChange']
    status: StatusProps['status']
    onStatusChange: StatusProps['onStatusChange']
    onEdit: (product?: Product) => void
    currUserRole: User['role'] | undefined
}
const ProductsControls = ({ 
    category, 
    onCategoryChange, 
    stock, 
    onStockChange, 
    dateAdd, 
    onDateAddChange, 
    status, 
    onStatusChange, 
    onEdit,
    currUserRole
}: ProductsControlsProps) => {
    const canManageProducts = currUserRole === 'admin' || currUserRole === 'manager';
    return (
        <div className={styles.controls}>
            <div className={styles.filters}>
                <CategoryFilter
                    category={category} 
                    onCategoryChange={onCategoryChange}
                />
                {canManageProducts && <StockFilter 
                    stock={stock}
                    onStockChange={onStockChange}
                />}
                <DateAddFilter 
                    dateAdd={dateAdd}
                    onDateAddChange={onDateAddChange}
                />
                <StatusFilter 
                    status={status}
                    onStatusChange={onStatusChange}
                />
            </div>
            {canManageProducts && <button 
                className={styles.addButton}
                onClick={() => onEdit()}
            >
                Add Product
            </button>}
        </div>
    )
}

export default ProductsControls