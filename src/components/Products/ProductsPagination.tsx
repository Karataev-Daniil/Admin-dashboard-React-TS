import { useMemo } from 'react'
import styles from '../../styles/pages/pagination.module.css'

type ProductsPaginationProps = {
    onNextPage: () => void
    onPrevPage: () => void
    totalPages: number
    currentPage: number
    setCurrentPage: (page: number) => void
}

const ProductsPagination = ({ 
    onNextPage, 
    onPrevPage, 
    totalPages, 
    currentPage, 
    setCurrentPage 
}: ProductsPaginationProps) => {
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

export default ProductsPagination
