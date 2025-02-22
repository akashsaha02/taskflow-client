import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // Apply theme on mount
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    // Redirect users based on authentication state
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
        const newTheme = isDark ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setIsDark(!isDark);

        // Dispatch event to notify other components of theme change
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="bg-white dark:bg-gray-900 shadow-sm">
            <div className="container mx-auto navbar px-4 sticky top-0 z-50 flex justify-between items-center">
                {/* Left Side (Logo) */}
                <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                    TaskFlow
                </Link>

                {/* Right Side (Theme Toggle & Auth Buttons) */}
                <div className="flex items-center gap-4">
                    {/* Dark Mode Toggle */}
                    <button onClick={handleToggleDark} className="btn btn-ghost">
                        {isDark ? (
                            <FiSun className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <FiMoon className="w-6 h-6 text-gray-600" />
                        )}
                    </button>

                    {/* Authentication */}
                    {user?.email ? (
                        <div className="flex items-center gap-3">
                            <p className="text-black dark:text-white font-medium whitespace-nowrap">
                                Welcome, {user?.displayName?.split(" ")[0]}
                            </p>
                            <button onClick={handleLogOut} className="btn btn-primary">
                                Logout
                            </button>
                        </div>
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
