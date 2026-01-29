import { useMemo } from 'react'
import styles from '../../pages/orders/Orders.module.css'

type OrdersPaginationProps = {
    onNextPage: () => void
    onPrevPage: () => void
    totalPages: number
    currentPage: number
    setCurrentPage: (page: number) => void
}

const OrdersPagination = ({
    onNextPage, 
    onPrevPage, 
    totalPages, 
    currentPage, 
    setCurrentPage 
}: OrdersPaginationProps) => {
    const pageNumbers = useMemo(() => {
        const pages = []

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
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

export default OrdersPagination