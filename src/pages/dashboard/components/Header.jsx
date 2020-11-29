import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Avatar,
    makeStyles,
    Typography,
    Box,
} from '@material-ui/core';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@material-ui/icons';
import clsx from 'clsx';

import ButtonMenu from './ButtonMenu';
import styleConstants from '../../../constants/styleConstants';

//

const drawerWidth = styleConstants.sideBarWidthExpand;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth})`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    link: {
        textDecoration: 'none',
    },
    menuBox: {
        marginLeft: '30px',
    },

    // CUSTOMIZATION
    colorPrimary: {
        color: '#fff',
    },
    colorBgPrimary: {
        backgroundColor: '#3D4977',
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const { path, url } = useRouteMatch();

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, classes.colorBgPrimary, {
                [classes.appBarShift]: !!props.open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerToggle}
                    edge="start"
                >
                    <MenuIcon className={classes.colorPrimary} />
                </IconButton>

                <Box className={classes.menuBox}>
                    <Typography variant="h6">
                        <Link className={clsx(classes.link, classes.colorPrimary)} to="/">
                            Home
                        </Link>
                    </Typography>
                </Box>

                <div className={classes.grow} />

                <IconButton>
                    <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon className={classes.colorPrimary} />
                    </Badge>
                </IconButton>

                <ButtonMenu
                    menuList={[
                        { label: 'Profile', link: `${url}/user` },
                        { label: 'Settings', link: `${url}/settings` },
                        { label: 'Logout', link: '/logout' },
                    ]}
                >
                    <Avatar
                        className={classes.colorPrimary}
                        style={{ width: '30px', height: '30px' }}
                    >
                        H
                    </Avatar>
                </ButtonMenu>
            </Toolbar>
        </AppBar>
    );
}
