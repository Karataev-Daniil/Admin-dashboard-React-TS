import styles from '../../pages/users/Users.module.css'
import EditIcon from '../../assets/icons/edit.svg?react'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import type { User } from '../../data/users'

type UserRowProps = {
  users: User[]
  user: User
  onEdit: (user: User) => void
  onDelete: (userId: number) => void
  currUserRole: User['role'] | undefined
  highlightedId: number | null
}

const UserRow = ({ 
  user, 
  onEdit, 
  onDelete, 
  currUserRole,
  highlightedId
}: UserRowProps) => {
  const canManageUsers = currUserRole === 'admin' || currUserRole === 'manager';
  const isAdmin = currUserRole === 'admin';

  return (
    <tr className={`${styles.row} ${highlightedId === user.id ? styles.highlight : ''}`}>
      {canManageUsers && (
        <td>
          <span className={styles.id}>#{user.id}</span>
        </td>
      )}

      <td>
        <span className={styles.name}>{user.name}</span>
      </td>

      {canManageUsers && (
        <td>
          <span className={styles.email}>{user.email}</span>
        </td>
      )}

      {isAdmin && (
        <td>
          <span className={`${styles.badge} ${styles[user.role]}`}>
            {user.role}
          </span>
        </td>
      )}

      {canManageUsers && (
        <td>
          <span className={`${styles.badge} ${styles[user.status]}`}>
            {user.status}
          </span>
        </td>
      )}

      {canManageUsers && (
        <td className={styles.actions}>
          <button
            onClick={() => onEdit(user)}
            className={styles.actionBtn}
          >
            <EditIcon />
            Edit
          </button>

          <button
            className={`${styles.actionBtn} ${styles.danger}`}
            onClick={() => onDelete(user.id)}
          >
            <DeleteIcon />
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default UserRow;
