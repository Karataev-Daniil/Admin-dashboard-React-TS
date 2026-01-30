import { useCallback, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import OrdersHeader from '../../components/Orders/OrdersHeader'
import OrdersControls from '../../components/Orders/OrdersControls'
import OrdersTable from '../../components/Orders/OrdersTable'
import OrdersPagination from '../../components/Orders/OrdersPagination'
import OrdersSummary from '../../components/Orders/OrdersSummary'
import OrderEditModal from '../../components/Orders/OrderEditModal'
import styles from './Orders.module.css'
import type { Order } from '../../data/orders'
import type { MainLayoutContext } from '../../layout/MainLayout'


const Orders = () => {
    const { useLocalForage, allOrders, setAllOrders, highlightedId } = useOutletContext<MainLayoutContext>()
    const [currentPage, setCurrentPage] = useState(1)
    const [visibleCount] = useState(10)

    const [currStatus, setCurrStatus] = useLocalForage<Order['status'] | 'all'>('order-status', 'all')

    const filteredOrders = useMemo(() => {
        return allOrders.filter((p) => {
            const statusMatch = currStatus === 'all' || p.status === currStatus
            
            return statusMatch
        })
    }, [allOrders, currStatus])


    const totalPages = useMemo(() => Math.ceil(filteredOrders.length / visibleCount), [filteredOrders.length, visibleCount])
    
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * visibleCount
        const end = currentPage * visibleCount
        return filteredOrders.slice(start, end)
    }, [filteredOrders, currentPage, visibleCount])

    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }, [totalPages])

    const handlePrevPage = useCallback(() => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }, [])

    const [orderModalState, setOrderModalState] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined)

    const handleEditOrder = useCallback((order?: Order) => {
        setSelectedOrder(order)
        setOrderModalState(true)
    }, [])

    const orderModalClose = useCallback(() => {
        setSelectedOrder(undefined)
        setOrderModalState(false)
    }, [])

    const orderModalHandleSave = useCallback((formOrder: Order) => {
        setAllOrders(prev => {
            const findIndex = prev.findIndex(p => p.id === formOrder.id)
            if (findIndex >= 0) {
                const updated = [...prev]
                updated[findIndex] = formOrder
                return updated
            } else {
                return [...prev, formOrder]
            }
        })
    }, [])

    return (
        <div className={styles.page}>
            <OrdersHeader />
            <OrdersSummary 
                orders={allOrders}
            /> 
            <OrdersControls 
                status={currStatus}
                onStatusChange={setCurrStatus}
            />
            <OrdersTable 
                Orders={paginatedOrders}
                onDelete={() => {}}
                highlightedId={highlightedId}
                onEdit={handleEditOrder}
            />
            {orderModalState && (
                <OrderEditModal
                    order={selectedOrder}
                    onSave={orderModalHandleSave}
                    onClose={orderModalClose}
                />
            )}
            <OrdersPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                setCurrentPage={setCurrentPage} 
            />
        </div>
    )
}

export default Orders
