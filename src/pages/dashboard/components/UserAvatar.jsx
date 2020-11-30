import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Avatar, Menu, MenuItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import styleConstants from '../../../constants/styleConstants';

//
const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
    },

    // CUSTOMIZATION
    colorPrimary: {
        color: styleConstants.colorPrimary,
    },
    colorSecondary: {
        color: styleConstants.colorSecondary,
        backgroundColor: styleConstants.colorBgSecondary,
    },
    colorBgPrimary: {
        backgroundColor: styleConstants.colorBgPrimary,
    },
}));

//

export default function UserAvatar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-controls={props.label}
                aria-haspopup="true"
                onClick={handleClick}
                style={{ padding: '2px' }}
            >
                <Avatar className={classes.colorPrimary} style={{ width: '30px', height: '30px' }}>
                    H
                </Avatar>
            </IconButton>

            <Menu
                id={props.label}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link
                    className={clsx(classes.link, classes.colorSecondary)}
                    to={`${props.url}/user`}
                >
                    <MenuItem onClick={handleClose}>Profile </MenuItem>
                </Link>

                <Link
                    className={clsx(classes.link, classes.colorSecondary)}
                    to={`${props.url}/settings`}
                >
                    <MenuItem onClick={handleClose}>Settings </MenuItem>
                </Link>

                <Link className={clsx(classes.link, classes.colorSecondary)} to={`/logout`}>
                    <MenuItem onClick={handleClose}>Logout </MenuItem>
                </Link>
            </Menu>
        </div>
    );
}
