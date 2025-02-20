import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: "/",
                element: <div>Home</div>,
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