import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Box, Button, makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import clsx from 'clsx';

import styleConstants from '../../../constants/styleConstants';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 180,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Swing', firstName: 'Ember', age: 23 },
];

//
const useStyles = makeStyles((theme) => ({
    boxBtns: {
        marginBottom: '10px',
        display: 'flex',
    },
    boxTable: {
        height: 640,
        width: '100%',
    },

    // CUSTOM
    colorPrimary: {
        color: styleConstants.colorPrimary,
        backgroundColor: styleConstants.colorBgPrimary,
    },
}));

export default function DataTable() {
    const classes = useStyles();
    const [activeBtns, setActiveBtns] = useState({ add: true, edit: false, delete: false });

    return (
        <>
            <Box className={classes.boxBtns}>
                <Button className={classes.colorPrimary} startIcon={<AddIcon />}>
                    Add
                </Button>
            </Box>
            <Box className={classes.boxTable}>
                <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
            </Box>
        </>
    );
}
