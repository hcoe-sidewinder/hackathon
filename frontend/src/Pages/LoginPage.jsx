import loginImage from "../assets/loginImage.svg";
import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CreditCard, Lock } from "lucide-react";
import { useAuth } from "../context/authContext.jsx";

const LoginPage = () => {
  const { auth, setAuth } = useAuth();
  console.log("auth", auth);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    panNumber: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!user.panNumber || !user.password) {
      toast.error("Please enter both PAN number and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/login`,
        user,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(typeof response.data.data);
        const string = JSON.stringify(response.data.data);

        console.log(`String: ${string}, type: ${typeof string}`);
        localStorage.setItem(
          "auth",
          String(JSON.stringify(response.data.data))
        );

        console.log(response.data.data);
        setAuth(response.data.data);
        toast.success("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      console.log("login error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-bgColor to-transitionColor flex items-center justify-center">
      <section className="bg-cardColor backdrop-blur-md shadow-xl rounded-md overflow-hidden w-full max-w-5xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8">
            <div className="mb-8 transform transition-all duration-300 hover:translate-x-2">
              <h2 className="text-3xl font-bold text-textColor mb-2">Login</h2>
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <a
                  className="text-bgColor hover:text-hoverColor transition-colors duration-300"
                  href="/signup"
                >
                  Sign Up
                </a>
              </p>
            </div>

            <form onSubmit={loginHandler} className="space-y-6">
              <div className="group">
                <label
                  htmlFor="panNumber"
                  className="flex items-center gap-2 text-textColor mb-2 font-medium"
                >
                  <CreditCard className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  PAN Number
                </label>
                <input
                  id="panNumber"
                  className="w-full bg-white/50 border border-bgColor/20 rounded-md p-3 
                           transition-all duration-300 focus:ring-2 focus:ring-bgColor/30 
                           focus:border-transparent outline-none"
                  type="number"
                  required
                  name="panNumber"
                  value={user.panNumber}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="group">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-textColor mb-2 font-medium"
                >
                  <Lock className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  Password
                </label>
                <input
                  id="password"
                  className="w-full bg-white/50 border border-bgColor/20 rounded-md p-3 
                           transition-all duration-300 focus:ring-2 focus:ring-bgColor/30 
                           focus:border-transparent outline-none"
                  type="password"
                  required
                  name="password"
                  value={user.password}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="flex items-center gap-2 group">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="rounded border-bgColor/20 text-bgColor 
                           focus:ring-bgColor/30 transition-all duration-300"
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-600 text-sm group-hover:text-textColor 
                           transition-colors duration-300"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-2 bg-bgColor text-white 
                         px-6 py-3 rounded-md transition-all duration-300 hover:bg-hoverColor 
                         hover:shadow-lg active:scale-95"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  Login
                </span>
              </button>
            </form>
          </div>

          <div
            className="hidden md:flex md:w-1/2 bg-gradient-to-br from-bgColor/10 to-transitionColor/10 
                         justify-center items-center p-8"
          >
            <img
              src={loginImage}
              alt="Login illustration"
              className="max-h-96 transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
