import { useState } from "react";

const PledgeModal = ({ donation, onClose, onProceedToPayment }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleProceed = () => {
    if (isConfirmed) {
      onProceedToPayment();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-textColor">
          Confirm Your Pledge
        </h2>
        <p className="text-gray-600 mt-2">
          You are pledging to donate for <strong>{donation.companyName}</strong>
          .
        </p>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-textColor">
            Phase 1 Payment
          </h3>
          <p className="text-gray-700">
            <strong>Amount:</strong> Rs. {donation.paymentPhases[0]}
          </p>
        </div>

        <label className="flex items-center gap-2 mt-4 text-gray-700">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            className="w-4 h-4"
          />
          I understand that future payments depend on verification of project
          progress.
        </label>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            disabled={!isConfirmed}
            onClick={handleProceed}
            className={`px-4 py-2 rounded-lg text-white ${
              isConfirmed
                ? "bg-bgColor hover:bg-hoverColor"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PledgeModal