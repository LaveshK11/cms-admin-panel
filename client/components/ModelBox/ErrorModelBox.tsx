
import React, { useEffect, useState } from 'react';

interface ErrorModalProps {
    isOpen: boolean;
    // onClose: () => void;
    errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, errorMessage }) => {

    const [modelState, setmodelState] = useState<boolean>(isOpen)

    useEffect(() => {
        if (isOpen) {
            setmodelState(true)
            setTimeout(() => {
                setmodelState(false)
            }, 2000);
        }
    }, [isOpen])

    return (
        <div className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] ${modelState ? '' : 'hidden'}`}>
            <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
                <div className="my-8 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-20 h-20 mx-auto text">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h4 className="text-xl font-semibold mt-6">Error</h4>
                    <p className="text-sm text-gray-500 mt-4">
                        {errorMessage}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
