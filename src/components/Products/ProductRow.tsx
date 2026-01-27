import styles from '../../pages/Products/Products.module.css'
import EditIcon from '../../assets/icons/edit.svg?react'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import type { Product } from '../../data/products'
import type { User } from '../../data/users'

type ProductRowProps = {
  Products: Product[]
  Product: Product
  onEdit: (Product: Product) => void
  onDelete: (ProductId: number) => void
  currUserRole: User['role'] | undefined
}

const ProductRow = ({ 
  Product, 
  onEdit, 
  onDelete, 
  currUserRole 
}: ProductRowProps) => {
  const canManageProducts = currUserRole === 'admin' || currUserRole === 'manager';

  return (
    <tr className={styles.row}>
      {canManageProducts && (
        <td>
          <span className={styles.id}>#{Product.id}</span>
        </td>
      )}

      <td>
        <span className={styles.name}>{Product.name}</span>
        <span className={styles.infoText}>
          {Product.type} | {Product.date.split('T')[0]}
        </span>
      </td>

      <td>
        <span className={styles.price}>${Product.price}</span>
      </td>

      {canManageProducts && (
        <td>
          <span className={styles.stock}>{Product.stock}</span>
          <span className={styles.stockText}>
            {Product.stock === 0 ? 'Out of Stock' : 'In Stock'}
          </span>
        </td>
      )}

      {canManageProducts && (
        <td>
          <span
            className={`${styles.badge} ${
              styles[Product.status.replace(/\s+/g, '').toLowerCase()]
            }`}
          >
            {Product.status}
          </span>
        </td>
      )}

      {canManageProducts && (
        <td className={styles.actions}>
          <button
            onClick={() => onEdit(Product)}
            className={styles.actionBtn}
          >
            <EditIcon />
            Edit
          </button>

          <button
            className={`${styles.actionBtn} ${styles.danger}`}
            onClick={() => onDelete(Product.id)}
          >
            <DeleteIcon />
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default ProductRow;
