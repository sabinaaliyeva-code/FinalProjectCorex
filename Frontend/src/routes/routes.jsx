import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Mainroute from "../pages/Mainroute";
import Registerpage from "../pages/Registerpage";
import NotFoundPage from "../pages/NotFoundPage";
import Adminroute from "../pages/Adminroute";
import Wishlistpage from "../pages/Wishlistpage";
import Productspage from "../pages/Productspage";
import Cartpage from "../pages/Cartpage";
import Detailpage from "../pages/Detailpage";
import { ROUTE } from "../constants/routes.constants";
import CategoryPage from "../pages/CategoryPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import DashboardPage from "../pages/Dashboardpage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminOrderPage from "../pages/AdminOrderPage";



const routes = createBrowserRouter([
    {
       path : "*",
       element : <NotFoundPage/>
    },
    {
        path: `${ROUTE.HOME}`,
        element: <Mainroute/>,
        children:[
            {
                path:`${ROUTE.HOME}`,
                element: <Homepage/>,
            },
       

        ]
    },
    {
        path:`${ROUTE.LOGIN}`,
        element : <Loginpage/>,
    },
    {
        path: `${ROUTE.REGISTER}`,
        element : <Registerpage/>
    },
    {
        path: `${ROUTE.ADMIN}`,
        element: <Adminroute/>,
        children:[
            {
                path:"dashboard",
                element: <DashboardPage/>,
            },
            {
                path: "products",
                element: <AdminProductsPage/>,
            },
            {
                path: "users",
                element: <AdminUserPage/>,
            },
            {
                path: "orders",
                element: <AdminOrderPage/>,
            },
           
           

        ]
    },
    {
        path: `${ROUTE.CART}`,
        element: <Cartpage/>,
    },
    {
        path: `${ROUTE.WISHLIST}`,
        element: <Wishlistpage/>,
    },
    {
        path: `${ROUTE.DETAIL}`,
        element: <Detailpage/>,
    },
    {
        path:`${ROUTE.PRODUCT}`,
        element: <Productspage/>,
    },
    {
        path: `${ROUTE.CATEGORY}`,
        element: <CategoryPage/>,
    },
    {
        path:`${ROUTE.NEW_ARRIVALS}`,
        element: <Productspage/>,
    },
    {
        path:`${ROUTE.SALE}`,
        element: <Productspage/>,
    },
    {
        path: `${ROUTE.FEATURED}`,
        element: <Productspage />
    }
   
]);

export default routes;