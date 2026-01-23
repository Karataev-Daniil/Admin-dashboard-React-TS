import { useMemo, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import styles from '../../pages/users/Users.module.css'
import UsersHeader from '../../components/Users/UsersHeader'
import UsersControls from '../../components/Users/UsersControls'
import UsersTable from '../../components/Users/UsersTable'
import UsersPagination from '../../components/Users/UsersPagination'
import mockUsers from '../../data/users'
import UserEditModal from '../../components/Users/UserEditModal'
import type { RoleControlsProps, StatusControlsProps, SortControlsProps, User } from '../../data/users'
import type { MainLayoutContext } from '../../layout/MainLayout'

const Users = () => {
  const { useLocalForage } = useOutletContext<MainLayoutContext>();

  const [allUsers, setAllUsers] = useLocalForage<User[]>('all-users', mockUsers)

  const [corrRole, setCorrRole] = useLocalForage<RoleControlsProps['role']>('users-role', 'all')
  const [corrStatus, setCorrStatus] = useLocalForage<StatusControlsProps['status']>('users-status', 'all')
  const [corrSort, setCorrSort] = useLocalForage<SortControlsProps['sortBy']>('users-sort', 'all')

  const filteredUsers = useMemo(() => {
    let result = allUsers.filter(p => {
      const roleMatch =
        corrRole === 'all' || p.role === corrRole;

      const statusMatch =
        corrStatus === 'all' || p.status === corrStatus;

      return roleMatch && statusMatch;
    });

    if(corrSort === 'name_asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'en'));
    }

    if (corrSort === 'name_desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name, 'en'))
    }

    if (corrSort === 'date_asc') {
      result = [...result].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }

    if (corrSort === 'date_desc') {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result;
  }, [allUsers, corrRole, corrStatus, corrSort])

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [userModalState, setUserModalState] = useState<boolean>(false)

  function userModalClose() {
    setUserModalState(false);
    setSelectedUser(undefined);
  }

  function userModalHandleSave(formUser: User) {
    const userToSave = formUser;

    const updatedUsers = [...allUsers];

    const userIndex = updatedUsers.findIndex(u => u.id === userToSave.id);

    if (userIndex >= 0) {
      updatedUsers[userIndex] = userToSave;
    } else {
      updatedUsers.push(userToSave);
    }

    setAllUsers(updatedUsers);

    userModalClose();
  }

  function userHandleDelete(users: User[], userId: number) {
    const updatedUsers = users.filter((u) => userId !== u.id)
    setAllUsers(updatedUsers);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(10);

  const totalPages = Math.ceil(filteredUsers.length / visibleCount);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * visibleCount,
    currentPage * visibleCount
  )

  function handleNextPage() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className={styles.page}>
      <UsersHeader />
      <UsersControls 
        role={corrRole}
        onRoleChange={setCorrRole}
        status={corrStatus}
        onStatusChange={setCorrStatus}
        sortBy={corrSort}
        onSortChange={setCorrSort}
        onEdit={(user?: User) => { setSelectedUser(user); setUserModalState(true); }}
      />
      <UsersTable 
        users={paginatedUsers}
        onDelete={userHandleDelete}
        onEdit={(user) => { setSelectedUser(user); setUserModalState(true); }}
      />
      {userModalState && (
        <UserEditModal
          users={allUsers}
          user={selectedUser}
          onSave={userModalHandleSave}
          onClose={userModalClose}
        />
      )}
      <UsersPagination 
        onNextPage={handleNextPage}
        totalPages={totalPages}
        currentPage={currentPage}
        setCorrentPage={setCurrentPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  )
}

export default Users
