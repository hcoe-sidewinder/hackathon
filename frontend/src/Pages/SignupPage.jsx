import React, { useState, useRef } from "react";
import signupImage from "../assets/signupImage.svg";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  CreditCard,
  Building,
  Upload,
} from "lucide-react";
import { DataURL } from "../utils/dataurl";

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="group">
    <label className="flex items-center gap-2 text-textColor mb-2 font-medium">
      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      {label}
    </label>
    <input
      className="w-full bg-white/50 border border-bgColor/20 rounded-md p-3
               transition-all duration-300 focus:ring-2 focus:ring-bgColor/30
               focus:border-transparent outline-none"
      {...props}
    />
  </div>
);

const SignupPage = () => {
  const panImageRef = useRef();
  const profileImageRef = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    panNumber: "",
    companyName: "",
    bankName: "",
    bankAccountNumber: "",
    accountName: "",
  });

  const [panImage, setPanImage] = useState("");
  const [profile, setProfile] = useState("");
  const [panImagePreview, setPanImagePreview] = useState("");
  const [profilePreview, setProfilePreview] = useState("");

  const changeEventHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const panImageChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPanImage(file);
      const dataURL = await DataURL(file);
      setPanImagePreview(dataURL);
    }
  };

  const profileImageChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile(file);
      const dataURL = await DataURL(file);
      setProfilePreview(dataURL);
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      !user.fullName ||
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.companyName ||
      !user.phoneNumber ||
      !user.panNumber ||
      !user.bankAccountNumber ||
      !user.bankName ||
      !user.accountName
    ) {
      toast.error("Please enter all required fields.");
      return;
    }
    if (!user.phoneNumber.length === 10) {
      toast.error("Phone number should be 10 numbers long");
      return;
    }
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      setUser((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (profile) formData.append("profilePicture", profile);
    if (panImage) formData.append("panImage", panImage);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-bgColor to-transitionColor flex items-center justify-center">
      <section className="bg-cardColor backdrop-blur-md shadow-xl rounded-md overflow-hidden w-full max-w-5xl m-6 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row h-[90vh]">
          <div className="w-full md:w-[50%] p-8 overflow-y-auto scrollbar-hide">
            <div className="mb-8 transform transition-all duration-300 hover:translate-x-2">
              <h2 className="text-3xl font-bold text-textColor mb-2">
                Sign up
              </h2>
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  className="text-bgColor hover:text-hoverColor transition-colors duration-300"
                  href="/login"
                >
                  Login
                </a>
              </p>
            </div>

            <form onSubmit={signupHandler} className="space-y-6">
              <InputField
                label="Full Name"
                icon={User}
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={changeEventHandler}
                required
              />

              <InputField
                label="Email Address"
                icon={Mail}
                type="email"
                name="email"
                value={user.email}
                onChange={changeEventHandler}
                required
              />

              <InputField
                label="Phone Number"
                icon={Phone}
                type="number"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={changeEventHandler}
                required
              />

              <InputField
                label="Password"
                icon={Lock}
                type="password"
                name="password"
                value={user.password}
                onChange={changeEventHandler}
                required
              />

              <InputField
                label="Confirm Password"
                icon={Lock}
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={changeEventHandler}
                required
              />

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-textColor mb-2 font-medium">
                  <Upload className="w-5 h-5" />
                  Profile Picture
                </label>
                <div
                  className="flex items-center gap-2 p-3 border border-bgColor/20 rounded-md cursor-pointer
                           transition-all duration-300 hover:bg-bgColor/5"
                  onClick={() => profileImageRef.current.click()}
                >
                  <span>Choose a profile image</span>
                </div>
                <input
                  ref={profileImageRef}
                  type="file"
                  className="hidden"
                  onChange={profileImageChangeHandler}
                  required
                />
                {profilePreview && (
                  <img
                    src={profilePreview}
                    className="w-36 h-36 rounded-full border border-bgColor/20 object-cover mx-auto
                             transition-transform duration-300 hover:scale-105"
                    alt="Profile preview"
                  />
                )}
              </div>

              <InputField
                label="Company Name"
                icon={Building2}
                type="text"
                name="companyName"
                value={user.companyName}
                onChange={changeEventHandler}
                required
              />

              <InputField
                label="PAN Number"
                icon={CreditCard}
                type="number"
                name="panNumber"
                value={user.panNumber}
                onChange={changeEventHandler}
                required
              />

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-textColor mb-2 font-medium">
                  <Upload className="w-5 h-5" />
                  PAN Image
                </label>
                <div
                  className="flex items-center gap-2 p-3 border border-bgColor/20 rounded-md cursor-pointer
                           transition-all duration-300 hover:bg-bgColor/5"
                  onClick={() => panImageRef.current.click()}
                >
                  <span>Choose a PAN image</span>
                </div>
                <input
                  ref={panImageRef}
                  type="file"
                  className="hidden"
                  onChange={panImageChangeHandler}
                  required
                />
                {panImagePreview && (
                  <img
                    src={panImagePreview}
                    className="max-w-72 h-36 object-cover mx-auto rounded-md border border-bgColor/20
                             transition-transform duration-300 hover:scale-105"
                    alt="PAN preview"
                  />
                )}
              </div>

              <InputField
                label="Bank Name"
                icon={Building}
                type="text"
                name="bankName"
                value={user.bankName}
                onChange={changeEventHandler}
                required
              />

              <InputField
                label="Bank Account Name"
                icon={Building}
                type="text"
                name="accountName"
                value={user.accountName}
                onChange={changeEventHandler}
                required
              />

              <InputField
                label="Bank Account Number"
                icon={Building}
                type="number"
                name="bankAccountNumber"
                value={user.bankAccountNumber}
                onChange={changeEventHandler}
                required
              />

              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-2 bg-bgColor text-white
                         px-6 py-3 rounded-md transition-all duration-300 hover:bg-hoverColor
                         hover:shadow-lg active:scale-95"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  Sign up
                </span>
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div
            className="hidden md:flex md:w-[50%] bg-gradient-to-br from-bgColor/10 to-transitionColor/10 
                         justify-center items-center p-8"
          >
            <img
              src={signupImage}
              alt="Signup illustration"
              className="max-h-96 transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
