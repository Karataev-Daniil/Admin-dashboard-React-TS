import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

import DashboardIcon from '../../assets/icons/home.svg?react'
import UsersIcon from '../../assets/icons/users.svg?react'
import OrdersIcon from '../../assets/icons/orders.svg?react'
import ProductsIcon from '../../assets/icons/products.svg?react'

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const navigate = useNavigate()

  const handleNavClick = () => {
    onClose?.();
  }

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <img className={styles.logo} src='/logo.png' alt='Logo' onClick={() => {
            navigate('/')
            handleNavClick()
          }} />
          <h2 className={styles.title} onClick={() => {
            navigate('/')
            handleNavClick()
          }}>Admin Dashboard</h2>
        </div>
      
        <div className={styles.menu}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={handleNavClick}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to='/users'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={handleNavClick}
          >
            <UsersIcon />
            <span>Users</span>
          </NavLink>
          
          <NavLink
            to='/orders'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={handleNavClick}
          >
            <OrdersIcon />
            <span>Orders</span>
          </NavLink>
          
          <NavLink
            to='/products'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={handleNavClick}
          >
            <ProductsIcon />
            <span>Products</span>
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
