import { useMemo, useState, useCallback } from 'react'
import { useOutletContext } from "react-router-dom";
import styles from '../../pages/users/Users.module.css'
import UsersHeader from '../../components/Users/UsersHeader'
import UsersControls from '../../components/Users/UsersControls'
import UsersTable from '../../components/Users/UsersTable'
import UsersPagination from '../../components/Users/UsersPagination'
import UserEditModal from '../../components/Users/UserEditModal'
import type { RoleControlsProps, StatusControlsProps, SortControlsProps, User } from '../../data/users'
import type { MainLayoutContext } from '../../layout/MainLayout'

const Users = () => {
  const { useLocalForage, allUsers, setAllUsers, currUser } = useOutletContext<MainLayoutContext>()

  const [corrRole, setCorrRole] = useLocalForage<RoleControlsProps['role']>('users-role', 'all')
  const [corrStatus, setCorrStatus] = useLocalForage<StatusControlsProps['status']>('users-status', 'all')
  const [corrSort, setCorrSort] = useLocalForage<SortControlsProps['sortBy']>('users-sort', 'name_asc')

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [userModalState, setUserModalState] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(10)

  const filteredUsers = useMemo(() => {
    let result = allUsers.filter(u => {
      const roleMatch = corrRole === 'all' || u.role === corrRole
      const statusMatch = corrStatus === 'all' || u.status === corrStatus
      return roleMatch && statusMatch
    })

    switch (corrSort) {
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
  }, [allUsers, corrRole, corrStatus, corrSort])

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
        role={corrRole}
        onRoleChange={setCorrRole}
        status={corrStatus}
        onStatusChange={setCorrStatus}
        sortBy={corrSort}
        onSortChange={setCorrSort}
        onEdit={handleEditUser}
        currUserRole={currUser?.role}
      />
      <UsersTable 
        users={paginatedUsers}
        onDelete={userHandleDelete}
        onEdit={handleEditUser}
        currUserRole={currUser?.role}
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
        setCorrentPage={setCurrentPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  )
}

export default Users
