import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/sign-up",
                element:<Register/>
            },
            {
                path:'/login',
                element:<Login/>
            }
        ]
    },
]);

export default router;