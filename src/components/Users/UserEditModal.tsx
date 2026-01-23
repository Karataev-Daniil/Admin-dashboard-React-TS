import { useState } from 'react' 
import styles from '../../pages/users/Users.module.css'
import type { User } from '../../data/users'

type UserEditProps = {
    user?: User
    onSave: (newUser: User) => void
    onClose: () => void
    users: User[]
}

const UserEditModal = ({users, user, onSave, onClose}: UserEditProps) => {
    function generateUniqueID(existingIDs: number[]): number {
        let id: number;
        do {
            id = Math.floor(Math.random() * 900) + 100;
        } while (existingIDs.includes(id));
        return id;
    }

    const existingIDs = users.map(u => u.id)

    const [formUser, setFormUser] = useState<User>(
        user ?? {
            id: generateUniqueID(existingIDs),
            name: '',
            email: '',
            role: 'viewer',
            status: 'active',
            createdAt: new Date().toISOString(),
            password: '12345'
        }
    );

    return (
        <div className={styles.modal}>
            <h1 className={styles.title}>Edit User</h1>
            <button
                onClick={onClose}
                className={styles.closeBtn}
            >
                <img className={styles.icon} src="/logo.png" alt="" />
            </button>
            <hr className={styles.divider} />

            <div className={styles.formGroup}>
                <label className={styles.label}>Name:</label>
                <input 
                    className={styles.input}
                    type='text'
                    onChange={(e) => setFormUser(prev => ({...prev, name: e.target.value as string}))}
                    value={formUser.name} 
                />
            </div>

            <div className={styles.formGroup}>
                <label
                    className={styles.label}
                >
                    Email:
                </label>
                <input 
                    className={styles.input}
                    type='email'
                    onChange={(e) => setFormUser(prev => ({...prev, email: e.target.value as string}))}
                    value={formUser.email} 
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Role:</label>
                <select 
                    className={styles.select}
                    onChange={(e) => setFormUser(prev => ({...prev, role: e.target.value as "admin" | "viewer" | "manager"}))}
                    value={formUser.role}
                >
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                    <option value="manager">Manager</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Status:</label>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input 
                            type="radio" 
                            onChange={() => setFormUser(prev => ({...prev, status: 'active' }))}
                            checked={formUser.status === 'active'} 
                        /> Active
                    </label>

                    <label className={`${styles.radioLabel} ${styles.radioMargin}`}>
                        <input 
                            type="radio" 
                            onChange={() => setFormUser(prev => ({...prev, status: 'inactive' }))}
                            checked={formUser.status === 'inactive'} 
                        /> Inactive
                    </label>
                </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.modalActions}>
                <button 
                    className={styles.saveBtn}
                    onClick={() => onSave(formUser)}
                >
                    Save Changes
                </button>
                <button 
                    className={styles.cancelBtn} 
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UserEditModal