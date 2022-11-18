import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'
import { useAlert } from '../Context/AlertContext'

const AlertSnackbar = () => {

    const {alert, setAlert} = useAlert();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert({
            open: false,
            message: "",
            type: ""
        });
    };

  return (
    <div>
        <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
            <Slide in={alert.open}>
                <Alert severity={alert.type} onClose={handleClose}>
                    {alert.message}
                </Alert>
            </Slide>
        </Snackbar>
    </div>
  )
}

export default AlertSnackbar