"use client"
import { useState } from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onDelete }) => {
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      onDelete();
      onClose();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] ${isOpen ? '' : ''
      } before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
          onClick={onClose}
        >
          {/* SVG paths go here */}
        </svg>
        <div className="my-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 fill-red-500 inline" viewBox="0 0 24 24">
            {/* SVG paths go here */}
          </svg>
          <h4 className="text-xl font-semibold mt-6">Are you sure you want to delete it?</h4>
          <p className="text-sm text-gray-500 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas
          </p>
        </div>
        <div className="flex flex-col space-y-2 ">
          <button
            type="button"
            className={`px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none text-red-600	 ${isDeleting
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 active:bg-red-500'
            }`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            type="button"
            className="text-red:500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
