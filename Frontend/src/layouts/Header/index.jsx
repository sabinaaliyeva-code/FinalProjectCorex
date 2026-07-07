import { Link } from "react-router-dom";
import styles from "./index.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Corex Store</Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className={styles.search}>
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

      <div className={styles.actions}>
        <Link to="/wishlist">❤️</Link>
        <Link to="/cart">🛒</Link>
        <Link to="/login" className={styles.loginBtn}>
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;