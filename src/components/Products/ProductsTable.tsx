import styles from '../../pages/products/Products.module.css'
import ProductRow from './ProductRow'
import type { Product } from '../../data/products'
import type { User } from '../../data/users'

type ProductsTableProps = {
    Products: Product[]
    onEdit: (Product: Product) => void
    onDelete: (ProductId: number) => void
    currUserRole: User['role'] | undefined
}

const ProductsTable = ({
    Products,
    onEdit,
    onDelete,
    currUserRole
}: ProductsTableProps) => {
    const canManageProducts = currUserRole === 'admin' || currUserRole === 'manager';

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {canManageProducts && <th>ID</th>}
                        <th>Name</th>
                        <th>Price</th>
                        {canManageProducts && <th>Stock</th>}
                        {canManageProducts && <th>Status</th>}
                        {canManageProducts && <th>Actions</th>}
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
                            currUserRole={currUserRole}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
