import Lottie from "lottie-react";
import loadingAnimation from '../assets/square-loading.json'

const Loader = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center min-h-screen" >
            <Lottie animationData={loadingAnimation} loop={true} style={{ width: 150, height: 150 }} />
            <p className="text-lg font-semibold text-gray-500">Loading...</p>
        </div >
    )
}

export default Loader
