import PropTypes from 'prop-types';
import { Box, IconButton, Toolbar, Tooltip, Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ResponsiveIframe from './ResponsiveIframe';
import { CloseIcon } from '../modals/forms/service';


export default function IframeModal({ open, onClose, src, title }) {
    return (

        <Modal open={open} onClose={onClose} sx={{ width: "100%" }}>
            <Box
                maxWidth={"90vw"}
                width={"100%"}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 2,
                }}
            >
                <DialogTitle>{title}

                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <ResponsiveIframe src={src} title={title} height="80vh" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Box>
        </Modal>
    );
}

IframeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
};