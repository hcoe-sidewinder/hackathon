import { useState } from "react";
import { Edit, Phone, Building2, CreditCard, Building } from "lucide-react";
import { useAuth } from "../context/authContext";

const ProfilePage = ({ user }) => {
  const auth2 = JSON.parse(localStorage.getItem("auth"));
  const test = localStorage.getItem("auth");
  const auth = JSON.parse(test);
  // console.log(test);
  // console.log(typeof test);
  // console.log(auth);
  // console.log(auth.name);
  // // console.log(auth);
  // console.log(auth2);
  console.log(auth)
  const [activeSection, setActiveSection] = useState("Contact Details");

  const Section = ({ title, icon, children }) => (
    <div
      className={`mt-6 p-4 rounded-md transition-all duration-300 ease-in-out
        ${
          activeSection === title
            ? "bg-activeCardColor shadow-lg"
            : "bg-inactiveCardColor hover:bg-activeCardColor"
        }
        cursor-pointer relative overflow-hidden`}
      onClick={() => setActiveSection(activeSection === title ? null : title)}
    >
      <div
        className={`absolute inset-0 bg-bgColor/5 transition-opacity duration-500
        ${activeSection === title ? "opacity-100" : "opacity-0"}`}
      />

      <div className="flex items-center gap-2 text-xl font-semibold text-textColor relative">
        <div
          className={`transform transition-all duration-300
          ${activeSection === title ? "scale-110" : "scale-100"}`}
        >
          {icon}
        </div>
        <h3 className="transition-all duration-300">{title}</h3>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out relative
        ${
          activeSection === title ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>

      <div
        className={`transition-all duration-300
        ${activeSection !== title ? "block" : "hidden"}`}
      >
        <div className="h-1 w-6 bg-bgColor/20 rounded-full mt-2" />
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-bgColor to-transitionColor p-6">
      <div className="bg-cardColor backdrop-blur-md shadow-xl rounded-md overflow-hidden w-full max-w-4xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* for profile picture */}
        <div className="flex items-center gap-6 border-b pb-6 group">
          <div className="relative">
            <img
              src={auth.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-[#134E5E] shadow-md transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-[#134E5E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="transform transition-all duration-300 group-hover:translate-x-2">
            <h2 className="text-3xl font-bold text-[#134E5E] mb-1">
              {auth.name}
            </h2>
            <p className="text-gray-600 text-sm">{auth.email}</p>
          </div>
        </div>

        {/* for other details */}
        <Section title="Contact Details" icon={<Phone className="w-6 h-6" />}>
          <div className="space-y-2 pt-4">
            <p className="text-gray-700">
              <strong>Phone:</strong> {auth.phNo}
            </p>
            <p className="text-gray-700">
              <strong>Company:</strong> {auth.nob}
            </p>
          </div>
        </Section>

        <Section
          title="PAN Information"
          icon={<CreditCard className="w-6 h-6" />}
        >
          <div className="space-y-4 pt-4">
            <p className="text-gray-700">
              <strong>PAN Number:</strong> {auth.panNo}
            </p>
            {/* <div className="flex justify-center">
              <img
                src={auth.panImage}
                alt="PAN Card"
                className="w-full max-w-sm border rounded-md shadow-md transition-all duration-300 hover:scale-105"
              />
            </div> */}
          </div>
        </Section>

        <Section
          title="Bank Information"
          icon={<Building className="w-6 h-6" />}
        >
          <div className="space-y-2 pt-4">
            <p className="text-gray-700">
              <strong>Bank Name:</strong> {auth.bankId.bankName}
            </p>
            <p className="text-gray-700">
              <strong>Account Number:</strong> {auth.bankId.accNo}
            </p>
            <p className="text-gray-700">
              <strong>Account Name:</strong> {auth.bankId.accName}
            </p>
          </div>
        </Section>

        {/* buttons */}
        <div className="flex justify-end mt-6">
          <button
            className="group flex items-center gap-2 bg-bgColor text-white px-6 py-3 rounded-md 
            transition-all duration-300 hover:bg-hoverColor hover:shadow-lg active:scale-95"
          >
            <Edit className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Edit Profile
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
