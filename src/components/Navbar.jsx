import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(false);

    // Initialize dark mode based on localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    // Redirect based on user state and current path
    useEffect(() => {
        if (!user && location.pathname !== "/login") {
            navigate("/login");
        } else if (user && location.pathname === "/login") {
            navigate("/");
        }
    }, [user, location, navigate]);

    const handleLogOut = async () => {
        await logoutUser();
    };

    const handleToggleDark = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    const navItems = (
        <>
        
        </>
    );

    return (
        <div className="bg-white dark:bg-gray-900 shadow-sm">
            <div className="container mx-auto navbar px-4 sticky top-0 z-50">
                <div className="navbar-start">
                    {/* <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-900 dark:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box mt-3 w-52 p-2 shadow"
                        >
                            {navItems}
                        </ul>
                    </div> */}
                    <Link to="/" className=" text-2xl font-bold text-gray-900 dark:text-white">
                        TaskFlow
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navItems}</ul>
                </div>
                <div className="navbar-end gap-2">
                    <button onClick={handleToggleDark} className="btn btn-ghost">
                        {isDark ? <FiSun className="w-6 h-6 text-yellow-400" /> : <FiMoon className="w-6 h-6 text-gray-600" />}
                    </button>
                    {user?.email ? (
                        <>
                            <p className="text-black dark:text-white font-medium mr-2 whitespace-nowrap">Welcome, {user?.displayName.split(" ")[0]}</p >
                            <button onClick={handleLogOut} className="btn btn-primary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
