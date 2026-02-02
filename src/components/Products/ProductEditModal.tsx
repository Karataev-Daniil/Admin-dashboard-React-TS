import { useState } from 'react';
import styles from '../../styles/pages/modal.module.css';
import CloseIcon from '../../assets/icons/close.svg?react'
import type { Product } from '../../data/products';

type ProductEditProps = {
    product?: Product
    products: Product[]
    onSave: (formProduct: Product) => void
    onClose: () => void
};

const ProductEditModal = ({
    product,
    products,
    onSave,
    onClose,
}: ProductEditProps) => {
    // const isAdmin = currUserRole === 'admin';
    // const isManager = currUserRole === 'manager';

    
    const isEditing = Boolean(true);

    // const canEditTarget = isAdmin || (isManager && user?.role === 'viewer');

    // if (!canEditTarget) {
    //   return null;
    // }

    function generateUniqueID(existingIDs: number[]): number {
        let id: number;
        do {
            id = Math.floor(Math.random() * 9000) + 1000;
        } while (existingIDs.includes(id));
        return id;
    }

    const existingIDs = products.map(p => p.id)

    const [formProduct, setformProduct] = useState<Product>(
        product ?? {
            id: generateUniqueID(existingIDs),
            name: '',
            type: undefined,
            date: new Date().toISOString(),
            price: 0,
            stock: 0,
            status: 'active'
        }
    );


    return (
        <div className={styles.overlay} onClick={onClose}>
            <div 
                className={styles.modal}
                onClick={e => e.stopPropagation()}
            >
                <h1 className={styles.title}>
                    {isEditing ? 'Edit Product' : 'Add Product'}
                </h1>

                <button onClick={onClose} className={styles.closeBtn}>
                    <CloseIcon />
                </button>

                <hr className={styles.divider} />

                <div className={styles.formGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        type='text'
                        value={formProduct.name}
                        onChange={e =>
                            setformProduct(prev => ({ ...prev, name: e.target.value }))
                        }
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Type</label>
                    <select
                        className={styles.input}
                        value={formProduct.type}
                        onChange={e =>
                            setformProduct(prev => ({ ...prev, type: e.target.value as Product['type'] }))
                        }
                    >
                        <option value=''>Select Type</option>
                        <option value='Smartphones'>Smartphones</option>
                        <option value='Laptops'>Laptops</option>
                        <option value='Tablets'>Tablets</option>
                        <option value='Accessories'>Accessories</option>
                        <option value='Headphones'>Headphones</option>
                        <option value='Wearables'>Wearables</option>
                        <option value='Camera'>Camera</option>
                        <option value='Home Appliances'>Home Appliances</option>
                        <option value='Footwear'>Footwear</option>
                        <option value='Speakers'>Speakers</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Gaming'>Gaming</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Price</label>
                    <input
                        className={styles.input}
                        type='number'
                        value={formProduct.price}
                        onChange={e =>
                            setformProduct(prev => ({ ...prev, price: Number(e.target.value) }))
                        }
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Stock</label>
                    <input
                        className={styles.input}
                        type='number'
                        value={formProduct.stock}
                        onChange={e =>
                            setformProduct(prev => ({ ...prev, stock: Number(e.target.value) }))
                        }
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Status</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type='radio'
                                checked={formProduct.status === 'active'}
                                onChange={() =>
                                    setformProduct(prev => ({ ...prev, status: 'active' }))
                                }
                            />
                            Active
                        </label>
                        <label>
                            <input
                                type='radio'
                                checked={formProduct.status === 'outOfStock'}
                                onChange={() =>
                                    setformProduct(prev => ({ ...prev, status: 'outOfStock' }))
                                }
                            />
                            Out of Stock
                        </label>
                        <label>
                            <input
                                type='radio'
                                checked={formProduct.status === 'inactive'}
                                onChange={() =>
                                    setformProduct(prev => ({ ...prev, status: 'inactive' }))
                                }
                            />
                            Inactive
                        </label>
                    </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.modalActions}>
                    <button
                        className={styles.saveBtn}
                        onClick={() => onSave(formProduct)}
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

export default ProductEditModal;