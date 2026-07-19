import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaTags,
  FaSignOutAlt
} from "react-icons/fa";


function AdminSidebar() {

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <FaHome />
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <FaBox />
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingCart />
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <FaUsers />
    },
    {
      title: "Categories",
      path: "/admin/categories",
      icon: <FaTags />
    },
    {
      title: "Analytics",
      path: "/admin/analytics",
      icon: <FaChartBar />
    },
  ];


  return (
    <aside className={styles.sidebar}>

      <div className={styles.logo}>
        Admin Panel
      </div>


      <nav>

        {
          menuItems.map((item)=>(
            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive}) =>
                isActive 
                ? styles.active 
                : styles.link
              }
            >

              <span className={styles.icon}>
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </NavLink>
          ))
        }

      </nav>


      <button className={styles.logout}>
        <FaSignOutAlt/>
        Logout
      </button>


    </aside>
  );
}


export default AdminSidebar;