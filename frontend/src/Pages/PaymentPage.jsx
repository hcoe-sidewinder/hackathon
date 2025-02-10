import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const companyName = queryParams.get("companyName");
  const amount = queryParams.get("amount");

  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setOtpSent(true);
    setIsModalOpen(true);
  };

  const handleVerifyOtp = (otp) => {
    if (otp === generatedOtp) {
      alert(
        `Payment of Rs. ${amount} to ${companyName} Successful! Waiting for BOQ verification.`
      );
      navigate("/profile");
    } else {
      alert("Incorrect OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-bgColor to-transitionColor p-6">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-bgColor">Confirm Payment</h2>
        <p className="text-gray-600 mt-2">
          You are pledging to <strong>{companyName}</strong> for{" "}
          <strong>Rs. {amount}</strong>.
        </p>

        {!otpSent && (
          <div className="mt-6">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgColor"
            />
            <button
              onClick={handleSendOtp}
              disabled={!password}
              className={`mt-4 px-6 py-2 rounded-lg text-white ${
                password
                  ? "bg-bgColor hover:bg-hoverColor"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Send OTP
            </button>
          </div>
        )}

        {otpSent && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgColor"
            />
            <button
              onClick={() => {
                handleVerifyOtp(otp);
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-bgColor text-white hover:bg-hoverColor transition-all duration-200"
            >
              Verify OTP & Confirm Payment
            </button>
          </div>
        )}
      </div>

      {/* OTP Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="OTP Sent"
      >
        <p className="text-gray-600">
          Your OTP is: <strong>{generatedOtp}</strong>
        </p>
      </PaymentModal>
    </div>
  );
};

export default PaymentPage;
