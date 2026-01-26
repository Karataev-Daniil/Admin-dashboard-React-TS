import styles from '../../pages/users/Users.module.css'
import UserRow from './UserRow'
import type { User } from '../../data/users'

type UsersTableProps = {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: number) => void
  currUserRole: User['role'] | undefined
}

const UsersTable = ({ users, onEdit, onDelete, currUserRole }: UsersTableProps) => {
  const isAdmin = currUserRole === 'admin';
  const isManager = currUserRole === 'manager';
  const isViewer = currUserRole === 'viewer';
  
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {!isViewer && <th>ID</th>}
            <th>Name</th>
            {!isViewer && <th>Email</th>}
            {isAdmin && <th>Role</th>}
            {!isViewer && <th>Status</th>}
            {!isViewer && <th>Actions</th>}
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
              currUserRole={currUserRole}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
