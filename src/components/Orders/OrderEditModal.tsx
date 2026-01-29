import { useState } from 'react'
import styles from '../../pages/orders/Orders.module.css'
import type { Order } from '../../data/orders'
import type { Product } from '../../data/products'
import type { User } from '../../data/users' 

type OrderEditModalProps = {
    orders: Order[]
    order?: Order
    onSave: (order: Order) => void
    onClose: () => void
}

const OrderEditModal = ({
    orders,
    order,
    onSave,
    onClose,
}: OrderEditModalProps) => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [selectedUser, setSelectedUser] = useState<User | undefined>()

    const existingIDs = orders.map((o) => o.id)

    const [formOrder, setFormOrder] = useState<Order>(
        order ?? {
            id: generateUniqueID(existingIDs),
            userId: 0,
            userName: '',
            userEmail: '',
            date: new Date().toISOString(),
            status: 'pending',
            products: selectedProducts,
            total: 0,
        }
    )

    function generateUniqueID(existingIDs: number[]) {
        let id: number

        do {
            id = Math.floor(Math.random() * 9000) + 1000
        } while (existingIDs.includes(id))

        return id
    }

    return (
        <div className={styles.modal}>
            <h1 className={styles.title}>
                {isEditing ? 'Edit Product' : 'Add Product'}
            </h1>

            <button onClick={onClose} className={styles.closeBtn}>
                <CloseIcon />
            </button>
        </div>
    )
}
