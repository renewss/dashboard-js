import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={props.onClose}
                severity={props.severity}
            >
                {props.message}
            </MuiAlert>
        </Snackbar>
    );
}
