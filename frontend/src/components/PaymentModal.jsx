

const PaymentModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-bgColor">{title}</h2>
        <div className="mt-4">{children}</div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
