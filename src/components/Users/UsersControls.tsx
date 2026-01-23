import styles from '../../pages/users/Users.module.css'
import RoleFilter from './RoleFilter'
import StatusFilter from './StatusFilter'
import SortFilter from './SortFilter'
import type { RoleControlsProps, StatusControlsProps, SortControlsProps, User } from '../../data/users'

type UsersControlsProps = {
  role: RoleControlsProps['role']
  onRoleChange: RoleControlsProps['onRoleChange']
  status: StatusControlsProps['status']
  onStatusChange: StatusControlsProps['onStatusChange']
  sortBy: SortControlsProps['sortBy']
  onSortChange: SortControlsProps['onSortChange']
  onEdit: (user?: User) => void
}
const UsersControls = ({role, onRoleChange, status, onStatusChange, sortBy, onSortChange, onEdit }: UsersControlsProps) => (
  <div className={styles.controls}>
    <div className={styles.filters}>
      <RoleFilter 
        role={role}
        onRoleChange={onRoleChange}
      />
      <StatusFilter 
        status={status}
        onStatusChange={onStatusChange}
      />
      <SortFilter 
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
    </div>
    <button 
      onClick={() => onEdit()}
      className={styles.addButton}
    >
      Add User
    </button>
  </div>
)

export default UsersControls