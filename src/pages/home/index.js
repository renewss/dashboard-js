import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function index() {
    return (
        <div>
            <Typography>Home</Typography>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    );
}
