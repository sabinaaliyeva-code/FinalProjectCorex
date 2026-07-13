import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/routes.constants";

function NotFoundPage() {
  return (
    <section className={styles.notFound}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <Link to={ROUTE.HOME}>Go Home </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;