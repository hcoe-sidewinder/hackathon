// import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router";
import { toast } from "sonner";
import signupImage from "../assets/signupImage.svg";
import { useRef } from "react";
import { DataURL } from "../utils/dataurl";

const SignupPage = () => {
  const panImageRef = useRef();
  const profileImageRef = useRef();
  //   const navigate = useNavigate();
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
    console.log(user);
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
    console.log("signup");
    if (
      !user.fullName ||
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.companyName ||
      !user.phoneNumber ||
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
    console.log("we are here");
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      setUser((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      console.log(user);
      return;
    }
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (profile) formData.append("profilePicture", profile);
    if (panImage) formData.append("panImage", panImage);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/api/signup",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   if (response.data.success) {
    //     toast.success(response.data.message);
    //     navigate("/login");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.response.data.message);
    // }
  };

  return (
    <main className="h-screen m-0 bg-main pt-24 p-5">
      <section className="flex bg-gray-100 shadow-gray-500 transition-transform duration-700 ease-in-out shadow-lg h-[95%] p-0 md:p-10">
        <div className="hidden md:flex justify-center items-center md:w-[60%]">
          <img className="h-full" src={signupImage} alt="Login illustration" />
        </div>
        <div className="bg-white shadow-gray-500 shadow-md rounded-md p-8 w-full md:w-[40%] overflow-y-auto scrollbar-hide max-h-full">
          <div className="my-5">
            <span className="font-semibold text-3xl">Sign up</span>
            <p className="text-gray-300">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 cursor-pointer">
                Login
              </a>
            </p>
          </div>
          <form onSubmit={signupHandler} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="text"
                required
                name="fullName"
                value={user.fullName}
                onChange={changeEventHandler}
              />
            </div>
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
            <div className="flex flex-col gap-1">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phone-number"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="number"
                required
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>
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
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="password"
                required
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="confirmPassword">Select Profile picture</label>
              <div
                className="text-center rounded-lg p-2 border cursor-pointer"
                onClick={() => profileImageRef.current.click()}
              >
                Choose a profile image
              </div>
              <input
                id="profileImage"
                ref={profileImageRef}
                className="border hidden  border-gray-200 h-9 rounded-md p-2"
                type="file"
                required
                name="profileImage"
                onChange={profileImageChangeHandler}
              />
            </div>
            {profilePreview && (
              <img
                src={profilePreview}
                className="self-center w-36 h-36  rounded-full border border-1 border-gray-400 object-cover"
                alt="profile picture"
              ></img>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword">Company Name</label>
              <input
                id="companyName"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="text"
                required
                name="companyName"
                value={user.companyName}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword">PAN number</label>
              <input
                id="panNumber"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="number"
                required
                name="panNumber"
                value={user.panNumber}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="confirmPassword">PAN Image</label>
              <div
                className="text-center rounded-lg p-2 border cursor-pointer"
                onClick={() => panImageRef.current.click()}
              >
                Choose a PAN image
              </div>
              <input
                id="panImage"
                ref={panImageRef}
                className="border hidden border-gray-200 h-9 rounded-md p-2"
                type="file"
                required
                name="panImage"
                onChange={panImageChangeHandler}
              />
            </div>
            {panImagePreview && (
              <img
                src={panImagePreview}
                className="self-center w-fit max-w-72 h-36 object-cover"
                alt="panpicture"
              ></img>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="bankName">Bank name</label>
              <input
                id="bankName"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="text"
                required
                name="bankName"
                value={user.bankName}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bankAccountName">Bank Account Name</label>
              <input
                id="accountName"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="text"
                required
                name="accountName"
                value={user.accountName}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bankAccountNumber">Bank account Number</label>
              <input
                id="bankAccountNumber"
                className="border border-gray-200 h-9 rounded-md p-2"
                type="number"
                required
                name="bankAccountNumber"
                value={user.bankAccountNumber}
                onChange={changeEventHandler}
              />
            </div>
            <button
              type="submit"
              className="bg-main p-2 rounded-lg font-semibold text-lg"
            >
              Sign up
            </button>
          </form>
        </div>
      </section>

      {/* Add this CSS to your global styles or a style tag */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }`}</style>
    </main>
  );
};

export default SignupPage;
