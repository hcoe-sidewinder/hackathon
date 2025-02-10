import { useState } from "react";

const HistorySection = ({ historyView, setHistoryView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [uploadedBOQs, setUploadedBOQs] = useState({});
  const [selectedStage, setSelectedStage] = useState(null);

  const donorHistory = [
    { company: "Sidewinder Technology", stage: "ongoing" },
    { company: "Kathmandu Limitedss", stage: "ongoing" },
    { company: "Lalitpur Limitedss", stage: "completed" },
  ];

  const doneeHistory = [
    { company: "Hearald Industry", stage: "ongoing" },
    { company: "Hair Dresser", stage: "ongoing" },
    { company: "Lalitpur Jackets", stage: "completed" },
  ];

  const openModal = (company, stage) => {
    setSelectedCompany(company);
    setSelectedStage(stage);
    setIsModalOpen(true);
  };

  const handleBOQUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedBOQs((prev) => ({
        ...prev,
        [selectedCompany]: [...(prev[selectedCompany] || []), file.name],
      }));
    }
  };

  return (
    <div className="relative h-40 overflow-hidden">
      {/* Donor History */}
      <div
        className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
          historyView === "Donor"
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <ul>
          {donorHistory.map((entry, index) => (
            <li
              key={index}
              className={`flex justify-between p-3 rounded-md cursor-pointer ${
                entry.stage === "completed" ? "bg-green-200" : "bg-yellow-200"
              }`}
              onClick={() => openModal(entry.company, entry.stage)}
            >
              <span className="font-semibold">{entry.company}</span>
              <span>{entry.stage}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Donee History */}
      <div
        className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
          historyView === "Donee"
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <ul>
          {doneeHistory.map((entry, index) => (
            <li
              key={index}
              className={`flex justify-between p-3 rounded-md cursor-pointer ${
                entry.stage === "completed" ? "bg-green-200" : "bg-yellow-200"
              }`}
              onClick={() => openModal(entry.company, entry.stage)}
            >
              <span className="font-semibold">{entry.company}</span>
              <span>{entry.stage}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">BOQ - {selectedCompany}</h2>
            <div className="space-y-2">
              {[1, 2, 3].map((phase) => (
                <div key={phase} className="flex items-center gap-3">
                  <span>Phase {phase}:</span>
                  {/* Donor can only view */}
                  {historyView === "Donor" ? (
                    uploadedBOQs[selectedCompany]?.includes(
                      `Phase ${phase}`
                    ) ? (
                      <span className="text-green-600">Uploaded</span>
                    ) : (
                      <span className="text-gray-600">Not Available</span>
                    )
                  ) : (
                    // Donee can upload unless completed
                    <input
                      type="file"
                      className="border p-1"
                      disabled={
                        selectedStage === "completed" ||
                        (phase !== 1 &&
                          !uploadedBOQs[selectedCompany]?.includes(
                            `Phase ${phase - 1}`
                          ))
                      }
                      onChange={handleBOQUpload}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorySection;
