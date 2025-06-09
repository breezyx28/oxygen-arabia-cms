import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import RefreshIcon from '@mui/icons-material/Refresh';

// Prop types validation
ResponsiveIframe.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default function ResponsiveIframe({ src, title = 'Iframe', height = '500px' }) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [iframeKey, setIframeKey] = useState(0); // Key to force iframe reload

    // Toggle full-screen mode
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    // Refresh the iframe
    const refreshIframe = () => {
        setIframeKey((prevKey) => prevKey + 1); // Change the key to force re-render
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: isFullScreen ? '100vh' : height,
                overflow: 'hidden',
                borderRadius: 1,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                position: 'relative',
            }}
        >
            {/* Toolbar */}
            <Toolbar
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 2, // Ensure toolbar stays above overlay
                    backgroundColor: 'background.paper',
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                }}
            >
                {/* Refresh Button */}
                <Tooltip title="Refresh">
                    <IconButton onClick={refreshIframe}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
                {/* Fullscreen Toggle Button */}
                <Tooltip title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                    <IconButton onClick={toggleFullScreen}>
                        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                </Tooltip>
            </Toolbar>


            {/* Iframe with sandbox attribute */}
            <iframe
                key={iframeKey} // Key to force re-render
                title={title}
                src={src}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                allowFullScreen
            />

            {/* Transparent Overlay to Block Interactions */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '98%',
                    height: '100%',
                    zIndex: 1, // Ensure overlay is above iframe but below toolbar
                    backgroundColor: 'transparent', // Transparent background
                    pointerEvents: 'auto', // Allow the overlay to block mouse events
                    overflow: 'auto'
                }}
            />
        </Box>
    );
}