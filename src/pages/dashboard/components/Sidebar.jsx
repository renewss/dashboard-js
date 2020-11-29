import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';
import {
    Drawer,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Icon,
    Paper,
    makeStyles,
} from '@material-ui/core';
import { MoveToInbox as InboxIcon, Mail as MailIcon } from '@material-ui/icons';
import logoSvg from '../../../assets/images/logo.svg';
import styleConstants from '../../../constants/styleConstants';

//
const menuList = [
    { label: 'Overview', link: 'overview' },
    { label: 'Sales', link: 'sales' },
    { label: 'Analytics', link: 'analytics' },
    { label: 'Drafts', link: 'drafts' },
];

const drawerWidth = styleConstants.sideBarWidthExpand;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    paper: {
        height: '100%',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    icon: {
        height: '35px',
        width: '35px',
    },
    logoImg: {
        height: '100%',
        width: '100%',
    },
    link: {
        textDecoration: 'none',
    },

    // CUSTOMIZATION
    colorPrimary: {
        color: '#263055',
    },
    colorBgPrimary: {
        background: 'linear-gradient(rgba(255,255,255,1) 0%, rgba(224,228,231,1) 100%);',
    },
}));

//

export default function Sidebar(props) {
    const classes = useStyles();
    const { path, url } = useRouteMatch();

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, classes.colorBgPrimary, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}
        >
            <Paper className={clsx(classes.paper, classes.colorBgPrimary)}>
                <div className={classes.toolbar}>
                    <Icon className={clsx(classes.icon, classes.colorPrimary)}>
                        <img className={classes.logoImg} src={logoSvg} alt="logo" />
                    </Icon>
                    <Typography className={clsx(classes.colorPrimary)} variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </div>

                <Divider />
                <List>
                    {menuList.map((item, index) => (
                        <Link
                            className={clsx(classes.link, classes.colorPrimary)}
                            to={`${url}/${item.link}`}
                            key={item.label}
                        >
                            <ListItem button key={item.label}>
                                <ListItemIcon className={classes.colorPrimary}>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
            </Paper>
        </Drawer>
    );
}
