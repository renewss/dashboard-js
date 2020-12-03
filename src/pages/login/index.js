import React, { useState } from 'react';
import {
    Container,
    FormControl,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    CircularProgress,
    Paper,
    Box,
} from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Cookies from 'universal-cookie';

import Alert from '../../components/Alert';
import styleConstants from '../../constants/styleConstants';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100vw !important',
        height: '100vh',
        padding: '0',
        margin: '0',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        padding: '40px 40px 80px 40px',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginBottom: '10px',
    },
    button: {
        marginTop: '20px',
    },

    //
    colorPrimary: {
        color: styleConstants.colorPrimary,
        background: styleConstants.colorBgPrimary,
    },
    colorSecondary: {
        color: styleConstants.colorSecondary,
        background: styleConstants.colorBgSecondary,
    },
}));

export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passHidden, setPassHidden] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    function handleClickShowPassword() {
        setPassHidden(!passHidden);
    }
    function handleMouseDownPassword(e) {
        e.preventDefault();
    }
    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        const cookies = new Cookies();

        setTimeout(() => {
            if (username === 'user' && password === '1') {
                setAlert({ open: true, severity: 'success', message: 'Successfully Signed In' });
                cookies.set('auth', true, { path: '/', expires: new Date(Date.now() + 100000) });
                window.location = '/home';
            } else {
                setAlert({
                    open: true,
                    severity: 'error',
                    message: 'Incorrect username or password',
                });
                setUsername('');
                setPassword('');
                setSubmitted(false);
            }
        }, 700);
    }
    function handleAlertClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ ...alert, open: false });
    }

    return (
        <Container className={clsx(classes.root, classes.colorPrimary)}>
            <Paper elevation={3}>
                <Box className={classes.paper}>
                    <form onSubmit={handleSubmit}>
                        <FormControl variant="outlined">
                            <TextField
                                className={classes.input}
                                required
                                id="username"
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AccountCircle className={classes.colorSecondary} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={classes.input}
                                required
                                id="password"
                                label="Password"
                                variant="outlined"
                                value={password}
                                type={passHidden ? 'password' : 'text'}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                className={classes.colorSecondary}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {passHidden ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                className={clsx(classes.button, classes.colorPrimary)}
                                variant="contained"
                                type="submit"
                                size="large"
                                disabled={submitted}
                            >
                                {submitted ? (
                                    <CircularProgress size={28} style={{ color: 'white' }} />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </FormControl>
                    </form>
                </Box>
            </Paper>

            <Alert
                open={alert.open}
                severity={alert.severity}
                message={alert.message}
                onClose={handleAlertClose}
            />
        </Container>
    );
}
