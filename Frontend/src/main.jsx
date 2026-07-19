import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx'
import WishlistProvider from './context/WishlistContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import ProductProvider from './context/ProductsContext.jsx'
import OrderProvider from './context/OrderContext.jsx'
import DashboardProvider from './context/DashboardContext.jsx'

createRoot(document.getElementById('root')).render(
  < AuthProvider>
  <DashboardProvider >
  <OrderProvider>
  <ProductProvider>
   <CartProvider>
    <WishlistProvider>
    <App />
    </WishlistProvider>
  </CartProvider>
  </ProductProvider>
  </OrderProvider>
    </DashboardProvider>
  </AuthProvider>
  
)
