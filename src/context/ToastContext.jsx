import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Create the context
export const ToastContext = createContext();

// Toast Provider component
export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info'); // 'error', 'warning', 'info', 'success'

    // Function to show the toast
    const showToast = (message, severity = 'info') => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    // Function to close the toast
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return; // Don't close the toast when clicking outside
        }
        setOpen(false);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000} // Auto-close after 6 seconds
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position of the toast
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};