import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (user) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
