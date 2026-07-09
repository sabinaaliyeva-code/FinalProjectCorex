import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Mainroute from "../pages/Mainroute";
import Registerpage from "../pages/Registerpage";
import NotFoundPage from "../pages/NotFoundPage";
import Adminroute from "../pages/Adminroute";
import Dashboard from "../pages/Dashboardpage";
import Products from "../pages/Productspage";
import Wishlistpage from "../pages/Wishlistpage";
import Productspage from "../pages/Productspage";
import Cartpage from "../pages/Cartpage";
import Detailpage from "../pages/Detailpage";



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
        path: "/products",
        element: <Productspage/>,
    },
    {
        path: "/cart",
        element: <Cartpage/>,
    },
    {
        path: "/wishlist",
        element: <Wishlistpage/>,
    },
    {
        path: "/detail/:id",
        element: <Detailpage/>,
    },
]);

export default routes;