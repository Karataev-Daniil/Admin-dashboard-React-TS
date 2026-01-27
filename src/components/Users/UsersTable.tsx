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
  const canManageUsers = currUserRole === 'admin' || currUserRole === 'manager';

  const isAdmin = currUserRole === 'admin';

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {canManageUsers && <th>ID</th>}
            <th>Name</th>
            {canManageUsers && <th>Email</th>}
            {isAdmin && <th>Role</th>}
            {canManageUsers && <th>Status</th>}
            {canManageUsers && <th>Actions</th>}
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
  );
};

export default UsersTable;
