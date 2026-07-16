import React, { useContext } from "react";
import styles from "./index.module.scss";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

function AdminNavbar({ toggleSidebar }) {

  const { logout } = useContext(AuthContext);


  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button  className={styles.menuBtn} onClick={toggleSidebar}> <FaBars /></button>
        <h2> Admin Panel</h2>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn}><FaBell /></button>
        <div className={styles.profile}><FaUserCircle />
          <div>
            <span> Admin</span>
            <small>Administrator</small>
          </div>
        </div>
        <button  className={styles.logout} onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}


export default AdminNavbar;