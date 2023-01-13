import React from 'react';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

const AlertSnack = ({ open, onClose, message, severity }: Props) => {
  const handleClose = (_event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;

    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      classes={{ root: 'max-w-[300px]' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnack;