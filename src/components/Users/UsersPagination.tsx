import {useMemo} from 'react'
import styles from '../../pages/users/Users.module.css'

type UsersPaginationProps = {
  onNextPage: () => void
  totalPages: number
  currentPage: number
  setCorrentPage: (page: number) => void
  onPrevPage: () => void
}
const UsersPagination = ({onNextPage, totalPages, currentPage, setCorrentPage, onPrevPage}: UsersPaginationProps) => {
  const pageNumbers = useMemo(() => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCorrentPage(i)}
          disabled={i === currentPage}
          className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
        >
          {i}
        </button>
      )
    }
    return pages
  }, [totalPages, currentPage])
  
  return (
    <div className={styles.pagination}>
      <button
        className={styles.btnPrevPage}
        onClick={() => onPrevPage()}
        disabled={currentPage <= 1}
      >
        {'< Previous'}
      </button>
      {pageNumbers}
      <button
        className={styles.btnNextPage}
        onClick={() => onNextPage()}
        disabled={currentPage >= totalPages}
      >
        {'Next >'}
      </button>
    </div>
  )
}

export default UsersPagination
