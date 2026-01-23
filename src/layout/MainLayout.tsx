import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import localforage from "localforage";
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import mockUsers from '../data/users'
import styles from './MainLayout.module.css'
import type {User} from '../data/users'

import '../styles/globals.css'
import '../styles/variables.css'

localforage.config({
  name: "admin-dashboard",
  storeName: "dashboard",
});

type UseLocalForageReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type MainLayoutContext = {
  useLocalForage: <T = string>(key: string, initialValue: T) => UseLocalForageReturn<T>
  allUsers: User[]
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
  searchValue: string
}

function useLocalForage<T = string>(key: string, initialValue: T): UseLocalForageReturn<T> {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    async function load() {
      const saved = await localforage.getItem<T>(key);
      if (saved !== null) setState(saved);
    }
    load();
  }, [key]);

  useEffect(() => {
    localforage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

const MainLayout = () => {
  const [allUsers, setAllUsers] = useLocalForage<User[]>('all-users', mockUsers)
  const [corrUser] = useState('admin')
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.content}>
        <Header
          corrUser={corrUser}
          users={allUsers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <main className={styles.main}>
          <Outlet
            context={{
              useLocalForage,
              allUsers,
              setAllUsers,
              searchValue
            }}
          />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
