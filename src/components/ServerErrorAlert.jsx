import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function ErrorsAlert({ errors }) {
    // errors: array of error objects (can be undefined/null)
    const errorObj = Array.isArray(errors)
        ? errors.find(e => !!e)
        : errors;

    if (!errorObj) return null;

    // Try to extract a message
    const message = errorObj?.data?.message || errorObj?.message || 'An error occurred.';

    return (
        <Collapse in={!!errorObj}>
            <Alert severity="error" sx={{ mb: 2 }}>
                {message}
            </Alert>
        </Collapse>
    );
} 