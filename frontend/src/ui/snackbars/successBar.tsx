import React, { useEffect } from 'react';

type SnackbarProps = {
    message: string;
    onClose: () => void;
};

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div>
            <div className="snackbar">
                <div className='text-[30px] text-[#00CF7F]'>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                <span className="mx-4">
                    {message}
                </span>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default Snackbar;
