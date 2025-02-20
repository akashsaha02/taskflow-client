import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Main = () => {
    return (
        <div className="">
            <div className=""><Navbar /></div>
            <div className=" min-h-screen"><Outlet /></div>
            <div className=""><Footer /></div>
        </div>
    )
}

export default Main