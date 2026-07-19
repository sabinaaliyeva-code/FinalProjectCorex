import react from "react";
import styles from "./index.module.scss";
import ProductGrid from "../../components/ProductGrid";
import { ROUTE } from "../../constants/routes.constants";
import { Link } from "react-router-dom";
import { FaAngleRight, FaBalanceScale, FaCircle, FaDotCircle, FaMoneyBill, FaShieldAlt, FaUndo } from "react-icons/fa";
import CategoryGrid from "../../components/CategoryGrid";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import CustomerReviews from "../../components/CustomerReviews";
 



function Homepage() {
  
  const categories = useCategories();
  const featuredProducts = useProducts({filters: { featured: true },});
  const newProducts = useProducts({filters: { newArrival: true },});
  


  return (
  <>
    {/* Categories */}
    <section className={styles.homeCategories}>
      <div className={styles.header}>
        <div className={styles.text}>
        <h2>Shop By Category</h2>
        <p>Find the perfect pair for every occasion</p>
        </div>
        <div className={styles.link}>
        <Link to={ROUTE.PRODUCT}>View All</Link><FaAngleRight className={styles.icon}/>
        </div>
      </div>
       <CategoryGrid  categories={categories} variant="home" />
    </section>

    {/* Featured */}
    <section className={styles.featuredSection} >
      <div className={styles.flex}>
        <div className={styles.header}>
          <div className={styles.text}>
             <h2>Featured Products</h2>
             <p>Our most popular styles handpicked for you</p>
          </div>
          <div className={styles.link}>
           <Link to={ROUTE.FEATURED}>View All Featured</Link><FaAngleRight className={styles.icon}/>
          </div>
       </div>
       <div className={styles.container}>
        <ProductGrid products={featuredProducts.slice(0, 8)} />
      </div>
      </div>
    </section>
    <section className={styles.whyShop}>
      <div className={styles.container}>
       <div className={styles.content}>
        <div className={styles.icon}><FaMoneyBill /></div>
            <div className={styles.text}>
              <h3>Free Shipping</h3>
              <p>Free standard shipping on all orders over $75. Express options available.</p>
            </div>
        </div>
        <div className={styles.content}>
        <div className={styles.icon}><FaUndo /></div>
            <div className={styles.text}>
              <h3>60-Day Returns</h3>
              <p>Changed your mind? Return unworn items within 60 days, no questions asked.</p>
            </div>
        </div>
        <div className={styles.content}>
        <div className={styles.icon}><FaBalanceScale/></div>
            <div className={styles.text}>
              <h3>Size Guarantee</h3>
              <p>Not the right fit? Exchange for a different size at no extra cost.</p>
            </div>
        </div>
        <div className={styles.content}>
        <div className={styles.icon}><FaShieldAlt /></div>
            <div className={styles.text}>
              <h3>Secure Checkout</h3>
              <p>Your payment information is encrypted and secure. Shop with confidence.</p>
            </div>
        </div>
        </div>
    </section>

    {/* New Arrivals */}
    <section className={styles.newSection}>
      <div className={styles.flex}>
       <div className={styles.header}>
         <div className={styles.text}>
          <span className={styles.badge}><FaCircle className={styles.iconCircle}/> Just Dropped</span>
          <h2>New Arrivals</h2>
          <p>Fresh styles just landed — be the first to rock them</p>
        </div>
        <div className={styles.link}>
        <Link to={ROUTE.NEW_ARRIVALS}>Shop New Arrivals</Link><FaAngleRight className={styles.icon}/>
        </div>
      </div >
      <div className={styles.container}>
        <ProductGrid products={newProducts.slice(0, 8)} />
      </div>
      </div>
    </section>
    <section className={styles.customerReviews}>
      <div className={styles.flex}>
        <span>Customer Love</span>
        <h1>What Our Customers Say</h1>
        <p>Join thousands of happy customers who have made Stride their go-to footwear brand</p>
        <CustomerReviews/>
        <div className={styles.boxes}>
          <div className={styles.box1}>
            <h2>500K +</h2>
            <p>Happy customers</p>
          </div>
          <div className={styles.box2}>
            <h2>4.9/5</h2>
            <p>Average Rating</p>
          </div>
          <div className={styles.box3}>
            <h2>15K+</h2>
            <p>5-Star Reviews</p>
          </div>
          <div className={styles.box4}>
            <h2>98%</h2>
            <p>Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
    <section className={styles.newsletterSection}>
       <div className={styles.newsletter}>
        <h1 className={styles.title}>Ready to Step Up Your Game?</h1>
        <p className={styles.description}> Join the Stride community and get 15% off your first order. Plus, early access to new releases and exclusive member-only deals.</p>
        <div className={styles.subscribe}>
          <input className={styles.input} type="email" placeholder="Enter your email" />
          <button className={styles.button}> Get 15% Off</button>
        </div>
        <p className={styles.note}>No spam, ever. Unsubscribe anytime.</p>
        <div className={styles.download}>
          <p className={styles.downloadTitle}> Download Our App</p>
          <div className={styles.storeButtons}>
            <a  href="https://play.google.com/store/apps?hl=ru&ysclid=mrsbcux8j7984373053" className={styles.storeButton}>
              <img src="https://i.pinimg.com/originals/1a/3e/18/1a3e18a5737bb0c6c38696831e69f839.webp?nii=t" alt="Google Play"/>
            </a>
            <a href="https://www.apple.com/store" className={styles.storeButton} >
              <img src="https://w7.pngwing.com/pngs/714/877/png-transparent-app-store-google-play-iphone-electronics-text-logo.png" alt="App Store"/>
            </a>
          </div>
        </div>
      </div>
    </section>
    
    
  </>
);
}

export default Homepage;