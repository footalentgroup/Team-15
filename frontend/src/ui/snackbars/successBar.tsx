import React, { useEffect } from 'react';

type SnackbarProps = {
    message: string;
    onClose: () => void;
    type?: 'success' | 'error' | 'warning';
};

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose, type }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div>
            {type === "error" ? (
                <div className="snackbar error">
                    <div className='text-3xl text-red-500'>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                    <span className="mx-4">
                        {message}
                    </span>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
            ) : type === "warning" ? (
                <div className="snackbar info">
                    <div className='text-3xl text-yellow-500'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <span className="mx-4">
                        {message}
                    </span>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
            ) : (
                <div className="snackbar success">
                    <div className='text-3xl text-green-500'>
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <span className="mx-4">
                        {message}
                    </span>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
            )
            }
        </div>
    );
};

export default Snackbar;
