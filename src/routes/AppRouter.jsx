import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: "/",
                element: <PrivateRoute>
                    <Home />,
                </PrivateRoute>
            },

        ]
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <div>404 Not Found</div>,
    }
]);

export default router;