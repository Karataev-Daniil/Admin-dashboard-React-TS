import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as UsersIcon } from '../../assets/icons/users.svg'
import { ReactComponent as OrdersIcon } from '../../assets/icons/orders.svg'
import { ReactComponent as ProductsIcon } from '../../assets/icons/products.svg'

const Sidebar = () => (
  <nav className={styles.sidebar}>
    <div className={styles.header}>
      <img className={styles.logo} src="/logo.png" alt="Logo" />
      <h2 className={styles.title}>Admin Dashboard</h2>
    </div>

    <div className={styles.menu}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        <HomeIcon className={styles.icon} />
        Dashboard
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        <UsersIcon className={styles.icon} />
        Users
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''} ${styles.disabled}`
        }
        onClick={(e) => e.preventDefault()}
      >
        <OrdersIcon className={styles.icon} />
        Orders
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        <ProductsIcon className={styles.icon} />
        Products
      </NavLink>
    </div>
  </nav>
)

export default Sidebar
