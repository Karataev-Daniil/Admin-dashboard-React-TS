import { useMemo, useState, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom';
import styles from '../../pages/users/Users.module.css'
import UsersHeader from '../../components/Users/UsersHeader'
import UsersControls from '../../components/Users/UsersControls'
import UsersTable from '../../components/Users/UsersTable'
import UsersPagination from '../../components/Users/UsersPagination'
import UserEditModal from '../../components/Users/UserEditModal'
import type { RoleControlsProps, StatusControlsProps, SortControlsProps, User } from '../../data/users'
import type { MainLayoutContext } from '../../layout/MainLayout'

const Users = () => {
  const { useLocalForage, allUsers, setAllUsers, currUser, highlightedId } = useOutletContext<MainLayoutContext>()

  const [currRole, setCurrRole] = useLocalForage<RoleControlsProps['role']>('users-role', 'all')
  const [currStatus, setCurrStatus] = useLocalForage<StatusControlsProps['status']>('users-status', 'all')
  const [currSort, setCurrSort] = useLocalForage<SortControlsProps['sortBy']>('users-sort', 'name_asc')

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [userModalState, setUserModalState] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(10)

  const filteredUsers = useMemo(() => {
    let result = allUsers.filter(u => {
      const roleMatch = currRole === 'all' || u.role === currRole
      const statusMatch = currStatus === 'all' || u.status === currStatus
      return roleMatch && statusMatch
    })

    switch (currSort) {
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'en'))
        break
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name, 'en'))
        break
      case 'date_asc':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'date_desc':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return result
  }, [allUsers, currRole, currStatus, currSort])

  const totalPages = useMemo(() => (
    Math.ceil(filteredUsers.length / visibleCount)
  ), [filteredUsers.length, visibleCount])

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * visibleCount
    const end = currentPage * visibleCount
    return filteredUsers.slice(start, end)
  }, [filteredUsers, currentPage, visibleCount])

  const userModalClose = useCallback(() => {
    setUserModalState(false)
    setSelectedUser(undefined)
  }, [])

  const userModalHandleSave = useCallback((formUser: User) => {
    setAllUsers(prev => {
      const userIndex = prev.findIndex(u => u.id === formUser.id)
      if (userIndex >= 0) {
        const updated = [...prev]
        updated[userIndex] = formUser
        return updated
      } else {
        return [...prev, formUser]
      }
    })
    userModalClose()
  }, [userModalClose, setAllUsers])

  const userHandleDelete = useCallback((userId: number) => {
    setAllUsers(prev => prev.filter(u => u.id !== userId))
  }, [setAllUsers])

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }, [])

  const handleEditUser = useCallback((user?: User) => {
    setSelectedUser(user)
    setUserModalState(true)
  }, [])

  return (
    <div className={styles.page}>
      <UsersHeader />
      <UsersControls 
        role={currRole}
        onRoleChange={setCurrRole}
        status={currStatus}
        onStatusChange={setCurrStatus}
        sortBy={currSort}
        onSortChange={setCurrSort}
        onEdit={handleEditUser}
        currUserRole={currUser?.role}
      />
      <UsersTable 
        users={paginatedUsers}
        onDelete={userHandleDelete}
        onEdit={handleEditUser}
        currUserRole={currUser?.role}
        highlightedId={highlightedId}
      />
      {userModalState && (
        <UserEditModal
          users={allUsers}
          user={selectedUser}
          onSave={userModalHandleSave}
          onClose={userModalClose}
          currUserRole={currUser?.role}
        />
      )}
      <UsersPagination 
        onNextPage={handleNextPage}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  )
}

export default Users
