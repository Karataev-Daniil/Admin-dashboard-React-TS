import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import styles from './Header.module.css';
import SearchIcon from '../../assets/icons/search.svg?react';
import type { User } from '../../data/users';
import type { Product } from '../../data/products';

type HeaderProps = {
  openLogin: () => void
  currUser: { name: string; email: string } | null
  users: User[]
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  products: Product[]
};

const Header = ({ openLogin, currUser, users, searchValue, setSearchValue, products }: HeaderProps) => {
  const location = useLocation();

  const placeholder = location.pathname.startsWith('/users')
    ? 'Search users...'
    : location.pathname.startsWith('/products')
    ? 'Search products...'
    : location.pathname.startsWith('/orders')
    ? 'Search orders...'
    : 'Search...';

  const searchMatch = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return [];

    switch (true) {
      case location.pathname.startsWith('/users'):
        return users.filter(u =>
          u.name.toLowerCase().includes(query)
        );
      
      case location.pathname.startsWith('/products'):
        return products.filter(p =>
          p.name.toLowerCase().includes(query)
        );
      
      default:
        return [];
    }
  }, [searchValue, users]);

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

          {searchValue.trim().length > 0 && (
            <div className={styles.searchResult}>
              {searchMatch.length > 0 ? (
                searchMatch.map(u => (
                  <div key={u.id} className={styles.searchItem}>
                    <div className={styles.searchAvatar}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.searchName}>{u.name}</div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>Not found</div>
              )}
            </div>
          )}
        </div>

        <div className={styles.user} onClick={openLogin}>
          <div className={styles.avatar}>
            {currUser ? currUser.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className={styles.username}>
            {currUser ? currUser.name : 'Guest'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
