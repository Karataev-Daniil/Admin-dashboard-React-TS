import { useState, useEffect, type FormEvent } from "react";
import styles from "./LoginModal.module.css";
import CloseIcon from '../../assets/icons/close.svg?react'
import mockUsers from "../../data/users";

type LoginModalProps = {
  setCurrUser: React.Dispatch<React.SetStateAction<{ name: string; email: string, role: string } | null>>;
  isOpen: boolean;
  onClose: () => void;
};

function LoginModal({ setCurrUser, isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const user = mockUsers.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      setError("User not found");
      return;
    }

    if (user.password !== password) {
      setError("Invalid password");
      return;
    }

    setCurrUser({
      name: user.name,
      email: user.email,
      role: user.role
    });
    handleClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Sign in</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.submit} type="submit" disabled={!email || !password}>
            Log in
          </button>
        </form>

        <button className={styles.close} onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
