import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export const ErrorText = ({ text = '' }) => {
    return (
        <Box sx={{ m: '1rem' }}>
            <Typography variant="h6" color="error" textAlign={'center'}>
                {text}
            </Typography>
        </Box>
    );
};