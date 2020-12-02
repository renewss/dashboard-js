import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import Navbar from './components/Navbar';
import View1 from './views/ChartView';
import View2 from './views/GraphView';
import View3 from './views/TableView';
import constStyles from '../../constants/styleConstants';

//
const drawerWidth = constStyles.sideBarWidthExpand;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
}));

//

function Dashboard() {
    const classes = useStyles();
    const { path } = useRouteMatch();

    return (
        <div className={classes.root}>
            <Navbar />
            <main className={clsx(classes.content, {})}>
                <div className={classes.drawerHeader} />
                <Switch>
                    <Route path={`${path}/overview`}>
                        <View1 />
                    </Route>
                    <Route path={`${path}/sales`}>
                        <View2 />
                    </Route>
                    <Route path={`${path}/analytics`}>
                        <View3 />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default Dashboard;
