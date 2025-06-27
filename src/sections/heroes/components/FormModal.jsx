import React, { useState, Suspense } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

const FormComponent = React.lazy(() => import('src/sections/form'));

const FormSection = () => (
    <Suspense fallback={<div>Loading form...</div>}>
        <FormComponent />
    </Suspense>
);


export default function FormModal() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Edit Form Section
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle id="form-dialog-title">
                    Form Section
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <FormSection />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
} 