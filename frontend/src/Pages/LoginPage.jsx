import { FaFacebook, FaGoogle } from "react-icons/fa";
import loginImage from "../assets/loginImage.svg";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    // Check if both email and password are provided
    if (!user.email || !user.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        user
      );

      // Save the authentication token in localStorage
      localStorage.setItem("auth_token", response.data.token);

      toast.success("Login successful!");

      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className="h-screen m-0 bg-main pt-24 p-5">
      <section className="flex bg-gray-100 shadow-gray-500 shadow-lg h-[95%] p-0 md:p-10 ">
        <div className="bg-white shadow-gray-500 shadow-md rounded-md p-8 w-full md:w-[40%]">
          {/* Login Fields */}
          <div className="my-5">
            <span className="font-semibold text-3xl">Login</span>
            <p className="text-gray-300">
              Don&apos;t have an account?{" "}
              <a className="text-blue-500" href="#">
                Sign Up
              </a>
            </p>
          </div>
          <form onSubmit={loginHandler} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="email"
                required
                name="email"
                value={user.email}
                onChange={changeEventHandler}
              />
            </div>
            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="password"
                required
                name="password"
                value={user.password}
                onChange={changeEventHandler}
              />
            </div>
            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input id="remember-me" type="checkbox" />
              <label htmlFor="remember-me" className="text-xs text-gray-400">
                Remember me
              </label>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="bg-main p-2 rounded-lg font-semibold text-lg"
            >
              Login
            </button>
            {/* Divider */}
            <div className="flex items-center justify-between">
              <hr className="w-[39%]" />
              <p className="text-gray-300">or login with</p>
              <hr className="w-[39%]" />
            </div>
            {/* Social Buttons */}
            <div className="flex gap-3">
              <button className="flex text-blue-600 border border-blue-600 flex-grow gap-3 items-center justify-center p-2 rounded-lg font-semibold text-lg">
                <FaFacebook size={30} /> <span>Facebook</span>
              </button>
              <button className="flex text-red-500 border border-red-500 flex-grow gap-3 items-center justify-center p-2 rounded-lg font-semibold text-lg">
                <FaGoogle size={30} /> <span>Google</span>
              </button>
            </div>
          </form>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex justify-center items-center">
          <img className="h-full" src={loginImage} alt="Login illustration" />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
