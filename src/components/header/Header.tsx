import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import styles from './Header.module.css';
import SearchIcon from '../../assets/icons/search.svg?react';
import CloseIcon from '../../assets/icons/close.svg?react'
import type { User } from '../../data/users';
import type { Product } from '../../data/products';
import type { Order } from '../../data/orders';

type HeaderProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  openLogin: () => void;
  users: User[];
  products: Product[];
  orders: Order[];
  currUser: { name: string; email: string } | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setHighlightedId: React.Dispatch<React.SetStateAction<number | null>>;
  highlightedId: number | null;
};

const Header = ({
  setSearchValue,
  searchValue,
  openLogin,
  users,
  products,
  orders,
  currUser,
  setUsers,
  setProducts,
  setOrders,
  setHighlightedId,
  highlightedId,
}: HeaderProps) => {
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
        return users.filter(u => u.name.toLowerCase().includes(query));

      case location.pathname.startsWith('/products'):
        return products.filter(p => p.name.toLowerCase().includes(query));

      case location.pathname.startsWith('/orders'):
        return orders.filter(o =>
          o.id.toString().includes(String(query))
        );

      default:
        return [];
    }
  }, [searchValue, users, products, orders, location.pathname]);

  const onClickItem = (id: number) => {
    setHighlightedId(id);

    if (location.pathname.startsWith('/users')) {
      setUsers(prev => {
        const index = prev.findIndex(u => u.id === id);
        if (index === -1) return prev;
        const item = prev[index];
        return [item, ...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    } else if (location.pathname.startsWith('/products')) {
      setProducts(prev => {
        const index = prev.findIndex(p => p.id === id);
        if (index === -1) return prev;
        const item = prev[index];
        return [item, ...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    } else if (location.pathname.startsWith('/orders')) {
      setOrders(prev => {
        const index = prev.findIndex(o => o.id === id);
        if (index === -1) return prev;
        const item = prev[index];
        return [item, ...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    }

    setTimeout(() => setHighlightedId(null), 5000);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.search}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={placeholder}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
    
            {searchValue && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setSearchValue('')}
              >
                <CloseIcon />
              </button>
            )}
          </div>
          <SearchIcon />

          {searchValue.trim().length > 0 && (
            <div className={styles.searchResult}>
              {searchMatch.map(item => {
                const isOrder = location.pathname.startsWith('/orders');
                const displayName = isOrder
                  ? `Order #${(item as Order).id}`
                  : (item as User | Product).name;
                            
                const avatarLetter = isOrder
                  ? (item as Order).id.toString().charAt(0).toUpperCase()
                  : (item as User | Product).name.charAt(0).toUpperCase();
                            
                return (
                  <div
                    key={item.id}
                    className={styles.searchItem}
                    onClick={() => onClickItem(item.id)}
                  >
                    <div className={styles.searchAvatar}>{avatarLetter}</div>
                    <div className={styles.searchName}>{displayName}</div>
                  </div>
                );
              })}
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
