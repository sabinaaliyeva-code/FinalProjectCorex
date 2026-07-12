import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ROUTE } from "../../constants/routes.constants";
import Search from "../../components/Search";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
  const {cartCount} = useContext(CartContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTE.HOME}>Corex Store</Link>
      </div>

      <nav className={styles.nav}>
        <Link to={ROUTE.PRODUCT}>Shop</Link>
        <Link to={ROUTE.CATEGORY}>Categories</Link>
        <Link to={ROUTE.NEW_ARRIVALS}>New Arrivals</Link>
        <Link to={ROUTE.SALE}>On Sale</Link>
        <Link to={ROUTE.ABOUT}>About</Link>
        <Link to={ROUTE.CONTACT}>Contact</Link>
      </nav>

      

      <div className={styles.actions}>
        <Search/>
        <Link to={ROUTE.WISHLIST}><FaHeart/></Link>
        <Link to={ROUTE.CART}><FaShoppingCart/><span>{cartCount}</span></Link>
        <Link to={ROUTE.LOGIN} className={styles.login}><FaUser/></Link>
      </div>
    </header>
  );
}

export default Header;