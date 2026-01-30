import { useState } from 'react'
import styles from '../../pages/orders/Orders.module.css'
import type { Order } from '../../data/orders'
import type { Product } from '../../data/products'
import mockUsers from '../../data/users'
import mockProducts from '../../data/products'
import CloseIcon from '../../assets/icons/close.svg?react'

type OrderEditModalProps = {
    order?: Order
    onSave: (order: Order) => void
    onClose: () => void
}

const OrderEditModal = ({ 
    order, 
    onSave, 
    onClose 
}: OrderEditModalProps) => {
    const isEditing = Boolean(order)

    const [formOrder, setFormOrder] = useState<Order>(
        order ?? {
            id: Math.floor(Math.random() * 9000) + 1000,
            userId: 0,
            userName: '',
            userEmail: '',
            date: new Date().toISOString(),
            status: 'pending',
            products: [],
            total: 0,
        }
    )

    const [search, setSearch] = useState('')

    const filteredProducts = mockProducts.filter(
        p =>
            p.status === 'active' &&
            p.name.toLowerCase().includes(search.toLowerCase())
    )

    const addProduct = (product: Product) => {
        if (formOrder.products.some(p => p.id === product.id)) return

        const products = [...formOrder.products, product]
        const total = products.reduce((sum, p) => sum + p.price, 0)

        setFormOrder({ ...formOrder, products, total })
        setSearch('')
    }

    const removeProduct = (id: number) => {
        const products = formOrder.products.filter(p => p.id !== id)
        const total = products.reduce((sum, p) => sum + p.price, 0)

        setFormOrder({ ...formOrder, products, total })
    }

    const handleUserChange = (id: number) => {
        const user = mockUsers.find(u => u.id === id)
        if (!user) return

        setFormOrder({
            ...formOrder,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
        })
    }

    return (
        <div className={styles.modal}>
            <h1 className={styles.title}>
                {isEditing ? 'Edit Order' : 'Add Order'} <span>#{formOrder.id}</span>
            </h1>

            <button className={styles.closeBtn} onClick={onClose}>
                <CloseIcon />
            </button>

            <div className={styles.formGroup}>
                <label>User</label>
                <select
                    value={formOrder.userId}
                    onChange={e => handleUserChange(Number(e.target.value))}
                >
                    <option value={0}>Select User</option>
                    {mockUsers.map(u => (
                        <option key={u.id} value={u.id}>
                            {u.name} ({u.email})
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Add Products</label>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <div className={styles.searchResults}>
                    {filteredProducts.map(p => (
                        <div key={p.id} onClick={() => addProduct(p)}>
                            {p.name} ({p.price}$)
                        </div>
                    ))}
                </div>
            </div>

            {formOrder.products.length > 0 && (
                <div className={styles.formGroup}>
                    <label>Selected Products:</label>
                    <ul>
                        {formOrder.products.map(p => (
                            <li key={p.id}>
                                {p.name} ({p.price}$)
                                <button onClick={() => removeProduct(p.id)}>×</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={styles.formGroup}>
                <label>Status</label>
                <select
                    value={formOrder.status}
                    onChange={e =>
                        setFormOrder({ ...formOrder, status: e.target.value as Order['status'] })
                    }
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Total:</label>
                <span>{formOrder.total}$</span>
            </div>

            <div className={styles.modalActions}>
                <button onClick={() => onSave(formOrder)}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default OrderEditModal
