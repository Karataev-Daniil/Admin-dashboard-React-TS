import styles from '../../pages/users/Users.module.css'
import type { User } from '../../data/users'

type UserRowProps = {
  users: User[]
  user: User
  onEdit: (user: User) => void
  onDelete: (userId: number) => void
}

const UserRow = ({ user, onEdit, onDelete }: UserRowProps) => (
  <tr className={styles.row}>
    <td>
      <span className={styles.id}>#{user.id}</span>
    </td>
    <td>
      <span className={styles.name}>{user.name}</span>
    </td>
    <td>
      <span className={styles.email}>{user.email}</span>
    </td>
    <td>
      <span className={`${styles.badge} ${styles[user.role]}`}>
        {user.role}
      </span>
    </td>
    <td>
      <span className={`${styles.badge} ${styles[user.status]}`}>
        {user.status}
      </span>
    </td>

    <td className={styles.actions}>
      <button 
        onClick={() => onEdit(user)}
        className={styles.actionBtn}
      >
        <img className={styles.icon} src="/icons/edit.svg" alt="" />
        Edit
      </button>

      <button 
        className={`${styles.actionBtn} ${styles.danger}`}
        onClick={() => onDelete(user.id)}
      >
        <img className={styles.icon} src="/icons/delete.svg" alt="" />
        Delete
      </button>
    </td>
  </tr>
)

export default UserRow
