import { ArrowLeft, HandCoins, Calendar } from "lucide-react";

const DonationDetail = ({ donation, onBack }) => {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-textColor to-transitionColor p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-md overflow-hidden w-full max-w-3xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* back to listings of donation requests */}
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


{/* phases section */}
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

       

        <div className="flex justify-center mt-8">
          <button
            className="group flex items-center gap-2 bg-bgColor text-white px-8 py-4 rounded-md 
            transition-all duration-300 hover:bg-hoverColor hover:shadow-lg active:scale-95"
          >
            <HandCoins className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Donate Now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
