import styles from '../../pages/users/Users.module.css'
import type { User } from '../../data/users'

type UserRowProps = {
  users: User[]
  user: User
  onEdit: (user: User) => void
  onDelete: (users: User[], userId: number) => void
}

const UserRow = ({ users, user, onEdit, onDelete }: UserRowProps) => (
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
        <img className={styles.icon} src="/logo.png" alt="" />
        Edit
      </button>

      <button 
        className={`${styles.actionBtn} ${styles.danger}`}
        onClick={() => onDelete(users, user.id)}
      >
        <img className={styles.icon} src="/logo.png" alt="" />
        Delete
      </button>
    </td>
  </tr>
)

export default UserRow
