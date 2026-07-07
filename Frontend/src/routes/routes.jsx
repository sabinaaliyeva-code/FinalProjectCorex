import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Mainroute from "../pages/Mainroute";
import Registerpage from "../pages/Registerpage";
import NotFoundPage from "../pages/NotFoundPage";
import Adminroute from "../pages/Adminroute";
import Dashboard from "../pages/Dashboardpage";
import Products from "../pages/Productspage";
import CartPage from "../pages/Cartpage";
import WishlistPage from "../pages/Wishlistpage";



const routes = createBrowserRouter([
    {
       path : "*",
       element : <NotFoundPage/>
    },
    {
        path: "/",
        element: <Mainroute/>,
        children:[
            {
                path: "/",
                element: <Homepage/>,
            },
            {
                path: "/products",
                element: <Products/>,
            },
            
           
           

        ]
    },
    {
        path:"/login",
        element : <Loginpage/>,
    },
    {
        path: "/register",
        element : <Registerpage/>
    },
    {
        path: "/admin",
        element: <Adminroute/>,
        children:[
            {
                path: "dashboard",
                element: <Dashboard/>,
            },
           
           

        ]
    },
    {
        path: "/cart",
        element: <CartPage/>,
    },
    {
        path: "/wishlist",
        element: <WishlistPage/>,
    },
]);

export default routes;