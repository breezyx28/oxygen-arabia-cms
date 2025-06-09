import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    success: { main: '#22c55e' },
    error: { main: '#f43f5e' },
    warning: { main: '#f59e0b' },
    info: { main: '#2563eb' },
  },
});

export default function Toast({
  openModal = false,
  message = 'something went wrong',
  type = 'success',
}) {
  const [open, setOpen] = React.useState(openModal);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return <ThemeProvider theme={theme}>{ToastTypes({ ...props, handleClose })}</ThemeProvider>;
}

const ToastComponent = (props) => (
  <div>
    {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
      <Alert
        onClose={props?.handleClose}
        severity={props?.type ?? 'success'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {props?.message}
      </Alert>
    </Snackbar>
  </div>
);

const ToastTypes = (props) => {
  switch (props.type) {
    case 'success':
      return <ToastComponent {...props} />;
    case 'error':
      return <ToastComponent {...props} />;
    default:
      return <ToastComponent {...props} />;
  }
};
