import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

const Main = () => {
    return (
        <div className="">
            <Navbar />
            <div className=" min-h-screen"><Outlet /></div>
            <div className=""><Footer /></div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default Main