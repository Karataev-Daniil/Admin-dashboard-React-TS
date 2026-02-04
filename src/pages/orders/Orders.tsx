import { useCallback, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import OrdersHeader from '../../components/orders/OrdersHeader'
import OrdersControls from '../../components/orders/OrdersControls'
import OrdersTable from '../../components/orders/OrdersTable'
import OrdersPagination from '../../components/orders/OrdersPagination'
import OrdersSummary from '../../components/orders/OrdersSummary'
import OrderEditModal from '../../components/orders/OrderEditModal'
import styles from '../../styles/pages/page.module.css'
import type { Order } from '../../data/orders'
import type { MainLayoutContext } from '../../layout/MainLayout'


const Orders = () => {
    const { useLocalForage, allOrders, setAllOrders, setAllProducts, highlightedId } = useOutletContext<MainLayoutContext>()
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

    const orderHandleDelete = useCallback((orderID: Order['id']) => {
        setAllOrders(prevOrders => (
            prevOrders.filter(o => o.id !== orderID)
        ))
    }, [])

    const orderModalHandleSave = useCallback((formOrder: Order) => {
        const oldOrder = allOrders.find(o => o.id === formOrder.id)
        const notCompleted = oldOrder?.status !== 'completed'
        const nowCompleted = formOrder.status === 'completed'

        if (notCompleted && nowCompleted && formOrder.products.length > 0) {
            setAllProducts(prevProducts => (
                prevProducts.map(product => {
                    const orderProduct = formOrder.products.find((p) => p.id === product.id)

                    if (!orderProduct) return product

                    return {
                        ...product,
                        stock: product.stock - 1
                        
                    }
                })
            ))
        }

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
        orderModalClose()
        setCurrentPage(1)
    }, [setAllProducts, setAllOrders, allOrders])

    return (
        <div className={styles.page}>
            <OrdersHeader />
            <OrdersSummary 
                orders={allOrders}
            /> 
            <OrdersControls 
                status={currStatus}
                onStatusChange={setCurrStatus}
                onEdit={handleEditOrder}
            />
            <OrdersTable 
                Orders={paginatedOrders}
                onDelete={orderHandleDelete}
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
