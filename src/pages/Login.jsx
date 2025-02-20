import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth"
import useAxiosPublic from './../hooks/useAxiosPublic';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {

  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {

    try {
      googleSignIn().then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName

        }
        axiosPublic.post('/users', userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success('Logged In Successfully')
            navigate('/');
          }
        })
      })


    } catch (err) {
      toast.error('Error Logging In')
    }
  };
  return (
    <div>Login

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="p-4 border border-me-brown rounded-lg flex justify-center items-center gap-4 w-full"
      >
        <FcGoogle />
        <p className="font-medium capitalize"> Sign in with google</p>
      </button>
    </div>
  )
}

export default Login