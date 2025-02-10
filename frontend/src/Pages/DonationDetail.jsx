import { ArrowLeft, HandCoins, Calendar } from "lucide-react";
import { useState } from "react";
import PledgeModal from "../components/PledgeModal";

import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useTrade } from "../context/tradeContext";
import { toast } from "sonner";
import TaxCalculator from "../components/TaxCalculator";

const DonationDetail = ({ donation, onBack }) => {
  const { state, dispatch } = useTrade();
  const location = useLocation();
  const current = location.pathname;
  console.log(current);
  const tradeId = current.split("/")[2];
  console.log(tradeId);

  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate = useNavigate();

  const Section = ({ title, icon, children }) => (
    <div
      className="mt-6 p-4 rounded-md transition-all duration-300 ease-in-out
      bg-white/80 hover:bg-white/90 hover:shadow-lg relative"
    >
      <div className="flex items-center gap-2 text-xl font-semibold text-textColor mb-4">
        <div className="transform transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3>{title}</h3>
      </div>
      <div className="relative">{children}</div>
    </div>
  );

  const handleProceedToPayment = () => {
    setShowPledgeModal(false);
    setShowPaymentModal(true);
  };

  const handleSendOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    alert(`Your OTP is: ${otpCode}`);
    setShowPaymentModal(false);
    setShowOtpModal(true);
  };

  const handleVerifyOtp = async () => {
    if (otp === generatedOtp) {
      alert(
        `Payment of Rs. ${donation.paymentPhases[0]} to ${donation.companyName} Successful! Waiting for BOQ verification.`
      );
      setShowOtpModal(false);
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}trade/${trade._id}/pledge`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log(response.data.data);
          dispatch({ type: "pledgeTrade", payload: response.data.data });
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
      navigate("/home");
    } else {
      alert("Incorrect OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-textColor to-transitionColor p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-md overflow-hidden w-full max-w-3xl p-8 transition-all duration-300 hover:shadow-2xl">
        <button
          onClick={onBack}
          className="group flex items-center text-textColor hover:text-hoverColor transition-all mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="transition-all duration-300 group-hover:translate-x-1">
            Back to Listings
          </span>
        </button>

        <div className="flex items-center gap-6 border-b pb-6 group">
          <div className="relative">
            <img
              src={donation.profilePicture}
              alt="Company Logo"
              className="w-20 h-20 rounded-full border-4 border-bgColor shadow-md transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-bgColor/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="transform transition-all duration-300 group-hover:translate-x-2">
            <h2 className="text-2xl font-bold text-textColor">
              {donation.companyName}
            </h2>
            <p className="text-gray-600 text-sm">PAN: {donation.panNumber}</p>
          </div>
        </div>

        <Section
          title="Donation Details"
          icon={<HandCoins className="w-6 h-6" />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-bgColor/5 rounded-md transition-all duration-300 hover:bg-bgColor/10">
              <span className="text-gray-700">Requested Amount</span>
              <span className="font-semibold text-textColor">
                Rs. {donation.requestedAmount}
              </span>
            </div>
            <div className="p-3 bg-bgColor/5 rounded-md transition-all duration-300 hover:bg-bgColor/10">
              <strong className="text-gray-700">Description</strong>
              <p className="mt-2 text-gray-700">{donation.description}</p>
            </div>
          </div>
        </Section>

        <Section title="Payment Phases" icon={<Calendar className="w-6 h-6" />}>
          <div>
            {donation.paymentPhases.length > 0 ? (
              <div className="space-y-2">
                {donation.paymentPhases.map((phase, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 bg-bgColor/5 rounded-md transition-all duration-300 
                      hover:bg-bgColor/10 hover:translate-x-1 hover:shadow-sm"
                  >
                    <span className="text-gray-700">Phase {index + 1}</span>
                    <span className="font-semibold text-textColor">
                      Rs. {phase}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No phases defined.</p>
            )}
          </div>
        </Section>

        <TaxCalculator />

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowPledgeModal(true)}
            className="group flex items-center gap-2 bg-bgColor text-white px-8 py-4 rounded-md 
            transition-all duration-300 hover:bg-hoverColor hover:shadow-lg active:scale-95"
          >
            <HandCoins className="w-14 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Pledge
            </span>
          </button>
        </div>
      </div>

      {/* Pledge Modal */}
      {showPledgeModal && (
        <PledgeModal
          donation={donation}
          onClose={() => setShowPledgeModal(false)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {showPaymentModal && (
        <Modal
          title="Confirm Payment"
          onClose={() => setShowPaymentModal(false)}
        >
          <p className="text-gray-600 mb-4">
            You are pledging to <strong>{donation.companyName}</strong> for{" "}
            <strong>Rs. {donation.paymentPhases[0]}</strong>.
          </p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgColor mb-4"
          />
          <button
            onClick={handleSendOtp}
            disabled={!password}
            className={`w-full px-6 py-2 rounded-lg text-white ${
              password
                ? "bg-bgColor hover:bg-hoverColor"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Send OTP
          </button>
        </Modal>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <Modal title="OTP Verification" onClose={() => setShowOtpModal(false)}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgColor mb-4"
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full px-6 py-2 rounded-lg bg-bgColor text-white hover:bg-hoverColor"
          >
            Verify OTP & Confirm Payment
          </button>
        </Modal>
      )}
    </div>
  );
};

export default DonationDetail;
