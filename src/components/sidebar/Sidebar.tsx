import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

import DashboardIcon from '../../assets/icons/home.svg?react'
import UsersIcon from '../../assets/icons/users.svg?react'
import OrdersIcon from '../../assets/icons/orders.svg?react'
import ProductsIcon from '../../assets/icons/products.svg?react'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <nav className={styles.sidebar}>
      <div className={styles.header}>
        <img className={styles.logo} src='/logo.png' alt='Logo' onClick={() => navigate('/')} />
        <h2 className={styles.title} onClick={() => navigate('/')}>Admin Dashboard</h2>
      </div>
    
      <div className={styles.menu}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to='/users'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <UsersIcon />
          <span>Users</span>
        </NavLink>
        
        <NavLink
          to='/orders'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <OrdersIcon />
          <span>Orders</span>
        </NavLink>
        
        <NavLink
          to='/products'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <ProductsIcon />
          <span>Products</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Sidebar
