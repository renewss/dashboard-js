import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

export default function ButtonMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls="avatar-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ padding: '2px' }}
            >
                {props.children}
            </IconButton>

            <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.menuList.map((item) => {
                    return (
                        <Link to={item.link} key={item.label}>
                            <MenuItem onClick={handleClose}>{item.label}</MenuItem>
                        </Link>
                    );
                })}
            </Menu>
        </>
    );
}
