import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import styles from './Header.module.css'
import SearchIcon from '../../assets/icons/search.svg?react'
import type { User } from '../../data/users'

type HeaderProps = {
  corrUser: string
  users: User[]
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ corrUser, users, searchValue, setSearchValue }: HeaderProps) => {
  const location = useLocation()

  const placeholder =
    location.pathname.startsWith('/users')
      ? 'Search users...'
      : location.pathname.startsWith('/products')
      ? 'Search products...'
      : location.pathname.startsWith('/orders')
      ? 'Search orders...'
      : 'Search...'

  const searchMatch = useMemo(() => {
    const qwery = searchValue.trim().toLowerCase()

    let result = users.filter((u) => {
      const nameMatch = u.name.trim().toLowerCase().includes(qwery)

      return nameMatch
    })

    return result.length > 0 ? result : []
  }, [setSearchValue, searchValue])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={placeholder}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <SearchIcon />
          
          {searchValue.length > 0 ? <div className={styles.searchResult}>
            {searchMatch.length > 0 ? (
              searchMatch.map(u => (
                <div key={u.id} className={styles.searchItem}>
                  <div className={styles.searchAvatar}>
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.searchName}>{u.name}</div>
                </div>
              ))
            ) : searchValue.trim() ? (
              <div className={styles.noResults}>Not found</div>
            ) : null}
          </div> : null}
        </div>


        <div className={styles.user}>
          <div className={styles.avatar}>
            {corrUser.charAt(0).toUpperCase()}
          </div>
          <div className={styles.username}>
            {corrUser}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
