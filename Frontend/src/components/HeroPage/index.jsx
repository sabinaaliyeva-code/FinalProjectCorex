import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

function HeroPage({ title, description, background, currentPage,}) {
    const location=useLocation()

    const heroData = {
        "/products": {
            title: "Shop All",
            currentPage: "Shop All",
            description: "Browse our complete collection of premium footwear",
            
        },
        "/sale": {
            title: "Sale",
            currentPage: "Sale",
            description: "Save big on your favorite products.",
            
        },
        "/new-arrivals": {
            title: "New Arrivals",
            currentPage: "New Arrivals",
            description: "Discover the latest styles.",
        
        },
        "/category": {
            title: "Shop by Category",
            currentPage: "categories",
            description: "Find the perfect shoes for every occasion and activity",
            
        },
    };
    const hero = heroData[location.pathname] || heroData["/products"];
    
    return (
        
        <section className={styles.pageHero} >
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <div className={styles.breadcrumb}>
            <h2>Home</h2>
            <span>/</span>
            <span> {hero.currentPage}</span>
          </div>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
        </div>
        </section>
    );
}

export default HeroPage;