import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    console.log(user)

    const handleLogOut = async () => {
        await logoutUser();
    }



    const navItems = <>
        <li><a>Item 1</a></li>
        <li><a>Item 3</a></li>
        {
            user && <li className="">
            </li>
        }
    </>
    return (
        <div className="bg-base-100 shadow-sm">
            <div className="container mx-auto navbar px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    {user?.email ? (<>
                        <Link className="btn btn-secondary"> {user?.email}</Link>
                        <button onClick={() => handleLogOut()} className="btn btn-primary">Logout</button>

                    </>) : (<>
                        <Link to='/login' type="" className="btn btn-primary">Login</Link>
                    </>)}
                </div>
            </div>
        </div>
    )
}

export default Navbar