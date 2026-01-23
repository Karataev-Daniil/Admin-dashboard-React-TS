import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'

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
        <img className={styles.icon} src="/logo.png" alt="" />
        Dashboard
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        <img className={styles.icon} src="/logo.png" alt="" />
        Users
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''} ${styles.disabled}`
        }
        onClick={(e) => e.preventDefault()}
      >
        <img className={styles.icon} src="/logo.png" alt="" />
        Orders
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        <img className={styles.icon} src="/logo.png" alt="" />
        Products
      </NavLink>
    </div>
  </nav>
)

export default Sidebar
