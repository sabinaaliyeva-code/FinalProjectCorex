import React, { useContext } from "react";
import styles from "./index.module.scss";
import { DashboardContext } from "../../context/DashboardContext";
import Charts from "../../components/Charts";
import AdminSidebar from "../../layouts/AdminSidebar";
import AdminHeader from "../../layouts/AdminHeader";

function DashboardPage() {
  const { dashboard, loading } = useContext(DashboardContext);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.page}>
      <AdminHeader />
      <div className={styles.main}>
      <AdminSidebar/>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Dashboard
        </h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Total Products</h3>
            <span>{dashboard?.totalProducts || 0}</span>
          </div>

          <div className={styles.card}>
            <h3>Total Orders</h3>
            <span>{dashboard?.totalOrders || 0}</span>
          </div>

          <div className={styles.card}>
            <h3>Total Users</h3>
            <span>{dashboard?.totalUsers || 0}</span>
          </div>

          <div className={styles.card}>
            <h3>Total Revenue</h3>
            <span>${dashboard?.totalRevenue || 0}</span>
          </div>
          

        </div>

      <Charts dashboard={dashboard}/>

      </div>
      
      
      </div>
    </div>
  );
}

export default DashboardPage;