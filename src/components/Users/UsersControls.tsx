import styles from '../../styles/pages/controls.module.css'
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
  currUserRole: User['role'] | undefined
}
const UsersControls = ({
  role, 
  onRoleChange, 
  status, 
  onStatusChange, 
  sortBy, 
  onSortChange, 
  onEdit, 
  currUserRole 
}: UsersControlsProps) => {
  const canManageUsers = currUserRole === 'admin' || currUserRole === 'manager';
  const isAdmin = currUserRole === 'admin';

  return (
    <div className={styles.controls}>
      <div className={styles.filters}>
        {canManageUsers && (
          <RoleFilter 
            role={role}
            onRoleChange={onRoleChange}
          />
        )}

        {canManageUsers && (
          <StatusFilter 
            status={status}
            onStatusChange={onStatusChange}
          />
        )}

        <SortFilter 
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
      </div>

      {isAdmin && (
        <button 
          onClick={() => onEdit()}
          className={styles.addButton}
        >
          Add User
        </button>
      )}
    </div>
  );
};

export default UsersControls;
