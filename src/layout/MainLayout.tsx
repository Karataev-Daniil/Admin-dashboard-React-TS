import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import localforage from "localforage";
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import LoginModal from '../components/modal/LoginModal';
import mockUsers from '../data/users';
import mockProducts from '../data/products';
import mockOrders from '../data/orders';
import styles from './MainLayout.module.css';
import type { User } from '../data/users';
import type { Product } from '../data/products';
import type { Order } from '../data/orders';

import '../styles/globals.css';
import '../styles/variables.css';

localforage.config({
  name: "admin-dashboard",
  storeName: "dashboard",
});

type UseLocalForageReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type MainLayoutContext = {
  useLocalForage: <T = string>(key: string, initialValue: T) => UseLocalForageReturn<T>;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  searchValue: string;
  allProducts: Product[];
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  allOrders: Order[]
  setAllOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  currUser: { name: string; email: string; role: User['role'] | undefined } | null;
  highlightedId: number | null;
};

function useLocalForage<T>(key: string, initialValue: T): UseLocalForageReturn<T> {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    async function load() {
      const saved = await localforage.getItem(key);

      if (saved !== null) {
        if (Array.isArray(initialValue)) {
          if (Array.isArray(saved)) {
            setState(saved as T);
          } else {
            console.warn(`${key} is not array, fallback to initialValue`);
            setState(initialValue);
          }
        } else {
          setState(saved as T);
        }
      }
    }
    load();
  }, [key]);

  useEffect(() => {
    localforage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

const MainLayout = () => {
  const [allUsers, setAllUsers] = useLocalForage<User[]>('all-users', mockUsers);
  const [allProducts, setAllProducts] = useLocalForage<Product[]>('all-products', mockProducts);
  const [allOrders, setAllOrders] = useLocalForage<Order[]>('all-orders', mockOrders)
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const [currUser, setCurrUser] = useLocalForage<{ name: string; email: string; role: string } | null>('data-user', null);

  const [searchValue, setSearchValue] = useState('');

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);

  const closeLogin = () => setIsLoginOpen(false);

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.content}>
        <Header
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          openLogin={openLogin}
          products={allProducts}
          users={allUsers}
          orders={allOrders}
          currUser={currUser}
          setUsers={setAllUsers}
          setProducts={setAllProducts}
          setOrders={setAllOrders}
          setHighlightedId={setHighlightedId}
          highlightedId={highlightedId}
        />

        <LoginModal
          setCurrUser={setCurrUser}
          isOpen={isLoginOpen}
          onClose={closeLogin}
        />

        <main className={styles.main}>
          <Outlet
            context={{
              useLocalForage,
              allUsers,
              setAllUsers,
              allOrders,
              setAllOrders,
              allProducts,
              setAllProducts,
              searchValue,
              currUser,
              highlightedId,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
