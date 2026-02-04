import { useState } from 'react'
import styles from '../../styles/pages/modal.module.css'
import type { Order } from '../../data/orders'
import type { Product } from '../../data/products'
import mockUsers from '../../data/users'
import mockProducts from '../../data/products'
import CloseIcon from '../../assets/icons/close.svg?react'

type Props = {
    order?: Order
    onSave: (order: Order) => void
    onClose: () => void
}

const OrderEditModal = ({ order, onSave, onClose }: Props) => {
    const isEditing = Boolean(order)

    const [formOrder, setFormOrder] = useState<Order>(
        order ?? {
            id: Math.floor(Math.random() * 9000) + 1000,
            userId: 0,
            userName: '',
            userEmail: '',
            date: new Date().toISOString().slice(0, 10),
            status: 'pending',
            products: [],
            total: 0,
        }
    )

    const [search, setSearch] = useState('')

    const filteredProducts = mockProducts.filter(
        p =>
            p.status === 'active' &&
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            !formOrder.products.some(fp => fp.id === p.id)
    )

    const recalcTotal = (products: Product[]) => products.reduce((sum, p) => sum + p.price, 0)

    const addProduct = (product: Product) => {
        const products = [...formOrder.products, product]

        setFormOrder({
            ...formOrder,
            products,
            total: recalcTotal(products),
        })

        setSearch('')
    }

    const removeProduct = (id: number) => {
        const products = formOrder.products.filter(p => p.id !== id)

        setFormOrder({
            ...formOrder,
            products,
            total: recalcTotal(products),
        })
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
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={e => e.stopPropagation()}
            >
                <h1 className={styles.title}>
                    {isEditing ? 'Edit Order' : 'Add Order'} <span>#{formOrder.id}</span>
                </h1>

                <button className={styles.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>

                <hr className={styles.divider} />
                
                <div className={styles.formGroup}>
                    <label>User</label>
                    <select
                        value={formOrder.userId}
                        onChange={e => handleUserChange(Number(e.target.value))}
                    >
                        <option value={0}>Select user</option>
                        {mockUsers.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name} ({u.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Date</label>
                    <input type="text" value={formOrder.date} disabled />
                </div>

                <div className={styles.formGroup}>
                    <label>Add product</label>
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {search && filteredProducts.length > 0 && (
                    <div className={styles.searchResults}>
                        {filteredProducts.map(p => (
                            <div
                                key={p.id}
                                className={styles.searchItem}
                                onClick={() => addProduct(p)}
                            >
                                {p.name} -- ${p.price}
                            </div>
                        ))}
                    </div>
                )}

                {formOrder.products.length > 0 && (
                    <div className={styles.formGroup}>
                        <label>Products</label>
                        <ul className={styles.productsList}>
                            {formOrder.products.map(p => (
                                <li key={p.id}>
                                    <span>{p.name}</span>
                                    <span>
                                        <span>${p.price}</span>
                                        <button onClick={() => removeProduct(p.id)}>×</button>
                                    </span>
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
                            setFormOrder({
                                ...formOrder,
                                status: e.target.value as Order['status'],
                            })
                        }
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Total</label>
                    <strong>${formOrder.total}</strong>
                </div>

                <hr className={styles.divider} />

                <div className={styles.modalActions}>
                    <button
                        className={styles.saveBtn}
                        onClick={() => onSave(formOrder)}
                        disabled={!formOrder.userId}
                    >
                        Save
                    </button>
                    <button
                        className={styles.cancelBtn}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderEditModal
