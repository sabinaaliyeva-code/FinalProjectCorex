import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Mainroute from "../pages/Mainroute";
import Registerpage from "../pages/Registerpage";



const routes = createBrowserRouter([
    {
        path: "/",
        element: <Mainroute/>,
        children:[
            {
                path: "/",
                element: <Homepage/>,
            },
            {
                path: "/login",
                element: <Loginpage/>,
            },
            {
                path : "/register",
                element : <Registerpage/>
            }

        ]
    }
]);

export default routes;