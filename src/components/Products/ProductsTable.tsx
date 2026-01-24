import styles from '../../pages/products/Products.module.css'
import ProductRow from './ProductRow'
import type { Product } from '../../data/products'

type ProductsTableProps = {
  Products: Product[]
  onEdit: (Product: Product) => void
  onDelete: (ProductId: number) => void
}

const ProductsTable = ({Products, onEdit, onDelete}: ProductsTableProps) => (
    <div className={styles.tableWrapper}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {Products.map((Product) => (
                    <ProductRow 
                        key={Product.id}
                        Products={Products}
                        Product={Product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    </div>
)

export default ProductsTable
