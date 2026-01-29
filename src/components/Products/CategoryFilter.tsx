import styles from '../../pages/products/Products.module.css'
import type { CategoryProps } from '../../data/products'

const CategoryFilter = ({ category, onCategoryChange }: CategoryProps) => (
    <label className={styles.filter}>
        <span>Categorie:</span>
        <select
            className={styles.select}
            value={category}
            onChange={e => onCategoryChange(e.target.value as CategoryProps['category'])}
        >
            <option value='all'>All</option>
            <option value='Smartphones'>Smartphones</option>
            <option value='Laptops'>Laptops</option>
            <option value='Tablets'>Tablets</option>
            <option value='Accessories'>Accessories</option>
        </select>
    </label>
)

export default CategoryFilter
