import styles from '../../pages/users/Users.module.css'
import type {SortControlsProps} from '../../data/users'

const SortFilter = ({sortBy, onSortChange}: SortControlsProps) => (
  <label className={styles.filter}>
    <span>Sort:</span>
    <select 
      className={styles.select}
      value={sortBy}
      onChange={e => onSortChange(e.target.value as SortControlsProps['sortBy'])}
    >
      <option value='name_asc'>Name (A–Z)</option>
      <option value='name_desc'>Name (Z–A)</option>
      <option value='date_asc'>Date Joined (Oldest)</option>
      <option value='date_desc'>Date Joined (Newest)</option>
    </select>
  </label>
)

export default SortFilter
