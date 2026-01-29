import styles from '../../pages/users/Users.module.css'
import type { RoleControlsProps } from '../../data/users'

const RoleFilter = ({ role, onRoleChange }: RoleControlsProps) => (
  <label className={styles.filter}>
    <span>Role:</span>
    <select
      className={styles.select}
      value={role}
      onChange={e => onRoleChange(e.target.value as RoleControlsProps['role'])}
    >
      <option value='all'>All</option>
      <option value='admin'>Admin</option>
      <option value='viewer'>Viewer</option>
      <option value='manager'>Manager</option>
    </select>
  </label>
)

export default RoleFilter

