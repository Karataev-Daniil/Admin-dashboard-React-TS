import styles from '../../pages/users/Users.module.css'
import type { StatusControlsProps } from '../../data/users'

const StatusFilter = ({status, onStatusChange}: StatusControlsProps) => (
  <label className={styles.filter}>
    <span>Status:</span>
    <select 
      className={styles.select}
      value={status}
      onChange={e => onStatusChange(e.target.value as StatusControlsProps['status'])}
    >
      <option value='all'>All</option>
      <option value='active'>Active</option>
      <option value='inactive'>Inactive</option>
    </select>
  </label>
)

export default StatusFilter
