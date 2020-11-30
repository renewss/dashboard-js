import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Badge, makeStyles } from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import clsx from 'clsx';
import ListMaker from './ListMaker';

import styleConstants from '../../../constants/styleConstants';

//

const useStyles = makeStyles((theme) => ({
    // CUSTOMIZATION
    colorPrimary: {
        color: styleConstants.colorPrimary,
    },
    colorBgPrimary: {
        backgroundColor: styleConstants.colorBgPrimary,
    },
}));

//

export default function Notifications(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [counter, setCounter] = useState(3);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setCounter(0);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={props.style} onClick={!!props.onClick ? props.onClick : null}>
            <IconButton
                aria-controls="notifications"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ padding: '2px' }}
            >
                <Badge badgeContent={counter} color="secondary">
                    <NotificationsIcon className={classes.colorPrimary} />
                </Badge>
            </IconButton>

            <Menu
                id="notifications"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <ListMaker list={['update v.1', 'update v.2', 'update v.3']} />
                </MenuItem>
            </Menu>
        </div>
    );
}
