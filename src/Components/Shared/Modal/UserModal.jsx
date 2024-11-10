/* eslint-disable react/prop-types */

const UserModal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-lg font-bold">User Information</h2>
                <p>Details about the user go here.</p>
                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserModal;
