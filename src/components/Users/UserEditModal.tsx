import { useState } from 'react';
import styles from '../../pages/users/Users.module.css';
import CloseIcon from '../../assets/icons/close.svg?react'
import type { User } from '../../data/users';

type UserEditProps = {
    user?: User;
    onSave: (newUser: User) => void;
    onClose: () => void;
    users: User[];
    currUserRole: User['role'] | undefined;
};

const UserEditModal = ({
    users,
    user,
    onSave,
    onClose,
    currUserRole,
}: UserEditProps) => {
    const isAdmin = currUserRole === 'admin';
    const isManager = currUserRole === 'manager';

    const isEditing = Boolean(user);

    const canEditTarget = isAdmin || (isManager && user?.role === 'viewer');

    if (!canEditTarget) {
      return null;
    }

    function generateUniqueID(existingIDs: number[]): number {
        let id: number;
        do {
            id = Math.floor(Math.random() * 900) + 100;
        } while (existingIDs.includes(id));
        return id;
    }

    const existingIDs = users.map(u => u.id);

    const [formUser, setFormUser] = useState<User>(
        user ?? {
            id: generateUniqueID(existingIDs),
            name: '',
            email: '',
            role: 'viewer',
            status: 'active',
            createdAt: new Date().toISOString(),
            password: '12345',
        }
    );

    const canEditRole = isAdmin && !isEditing;
    const canEditStatus = isAdmin || isManager;

    return (
        <div className={styles.modal}>
            <h1 className={styles.title}>
                {isEditing ? 'Edit User' : 'Add User'}
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
                    value={formUser.name}
                    onChange={e =>
                        setFormUser(prev => ({ ...prev, name: e.target.value }))
                    }
                />
            </div>
              
            <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                    className={styles.input}
                    type='email'
                    value={formUser.email}
                    onChange={e =>
                        setFormUser(prev => ({ ...prev, email: e.target.value }))
                    }
                />
            </div>
              
            {canEditRole && (
                <div className={styles.formGroup}>
                    <label className={styles.label}>Role</label>
                    <select
                        className={styles.select}
                        value={formUser.role}
                        onChange={e =>
                            setFormUser(prev => ({
                                ...prev,
                                role: e.target.value as User['role'],
                            }))
                        }
                    >
                        <option value='admin'>Admin</option>
                        <option value='manager'>Manager</option>
                        <option value='viewer'>Viewer</option>
                    </select>
                </div>
            )}

            {canEditStatus && (
                <div className={styles.formGroup}>
                    <label className={styles.label}>Status</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type='radio'
                                checked={formUser.status === 'active'}
                                onChange={() =>
                                    setFormUser(prev => ({ ...prev, status: 'active' }))
                                }
                            />
                            Active
                        </label>
                          
                        <label>
                            <input
                                type='radio'
                                checked={formUser.status === 'inactive'}
                                onChange={() =>
                                    setFormUser(prev => ({ ...prev, status: 'inactive' }))
                                }
                            />
                            Inactive
                        </label>
                    </div>
                </div>
            )}

            <hr className={styles.divider} />
          
            <div className={styles.modalActions}>
                <button
                    className={styles.saveBtn}
                    onClick={() => onSave(formUser)}
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
    );
};

export default UserEditModal;
