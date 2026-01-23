import styles from '../../pages/users/Users.module.css'
import UserRow from './UserRow'
import type { User } from '../../data/users'

type UsersTableProps = {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: number) => void
}

const UsersTable = ({users, onEdit, onDelete}: UsersTableProps) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow 
            key={user.id} 
            users={users}
            user={user} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  </div>
)

export default UsersTable
