import React, { useState } from 'react';
import {
    Container,
    FormControl,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    CircularProgress,
} from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Cookies from 'universal-cookie';

import styleConstants from '../../constants/styleConstants';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
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

    function handleClickShowPassword() {
        setPassHidden(!passHidden);
    }
    function handleMouseDownPassword(e) {
        e.preventDefault();
    }
    function handleSubmit() {
        setSubmitted(true);
        const cookies = new Cookies();

        setTimeout(() => {
            cookies.set('myCat', 'Pacman', { path: '/' });
            window.location = '/home';
        }, 300);
    }

    return (
        <Container className={classes.root}>
            <FormControl variant="outlined">
                <TextField
                    className={classes.input}
                    required
                    id="username"
                    label="Username"
                    variant="outlined"
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
                    type={passHidden ? 'password' : 'text'}
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
                    htmlType="submit"
                    size="large"
                    disabled={submitted}
                    onClick={handleSubmit}
                >
                    {submitted ? (
                        <CircularProgress size={28} style={{ color: 'white' }} />
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </FormControl>
        </Container>
    );
}
