import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },

    // CUSTOMIZATION
    colorPrimary: {
        color: 'white',
    },
    colorBgPrimary: {
        backgroundColor: '#181F47',
    },
}));

export default function Navbar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/**HEADER*/}
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            {/**SIDEBAR*/}
            <Sidebar open={open} />
        </div>
    );
}
