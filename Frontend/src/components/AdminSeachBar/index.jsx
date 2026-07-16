import styles from "./index.module.scss";
import { FaSearch } from "react-icons/fa";

function AdminSearchBar({ value, onChange, placeholder = "Search...",}) {
  return (
    <div className={styles.searchBar}>
      <FaSearch className={styles.icon} />
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
}

export default AdminSearchBar;