import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Divider, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Typed from 'react-typed';
import Particles from 'react-particles-js';
import styleConstants from '../../constants/styleConstants';

//
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
    },
    textContainer: {
        position: 'absolute',
        top: '30%',
        transform: 'translate(-50%, - 50%)',
        width: '100vw',
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
        color: styleConstants.colorPrimary,
    },
    divider: {
        width: '50%',
        marginLeft: '25%',
        marginBottom: '10px',
        backgroundColor: styleConstants.colorPrimary,
    },
    particles: {
        width: '100%',
        height: '100%',
    },

    // Customization
    colorPrimary: {
        color: styleConstants.colorPrimary,
        backgroundColor: styleConstants.colorBgPrimary,
    },
}));

//

function Home() {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, classes.colorPrimary)}>
            <Particles
                className={classes.particles}
                params={{
                    particles: {
                        number: {
                            value: 65,
                        },
                        shape: {
                            type: 'circle',
                        },
                    },
                }}
            />
            <Box className={classes.textContainer}>
                <Typography variant="h3">
                    <Typed
                        strings={['Your Company', 'Home Page']}
                        typeSpeed={80}
                        backSpeed={30}
                        loop
                    />
                </Typography>
                <Divider className={classes.divider} />
                <Link className={classes.link} to="/dashboard">
                    <Typography variant="h4">Dashboard</Typography>
                </Link>
            </Box>
        </div>
    );
}

export default Home;
