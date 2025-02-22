import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
        photo: res.user?.photoURL,
      };

      console.log(userInfo);

      const response = await axiosPublic.post("/users/set-user", userInfo);
      if (response.data.insertedId) {
        toast.success("Logged In Successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error("Error Logging In");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md text-center border border-white/20">
        <h2 className="text-2xl font-semibold text-white mb-4">Welcome Back</h2>
        <p className="text-gray-300 mb-6">Sign in to continue</p>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full bg-white text-gray-900 font-medium py-3 rounded-lg shadow-md transition-all hover:bg-gray-200"
        >
          <FcGoogle className="text-2xl" />
          <span>Sign in with Google</span>
        </button>

        <p className="text-gray-400 text-sm mt-6">
          By signing in, you agree to our{" "}
          <span className="text-blue-400 hover:underline cursor-pointer">
            Terms & Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
