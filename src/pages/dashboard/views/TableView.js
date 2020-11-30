import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Box, Button, makeStyles } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import clsx from 'clsx';

import DialogForm from '../components/DialogForm';
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
    boxBtn: {
        marginRight: '5px',
    },
    boxTable: {
        height: 640,
        width: '100%',
        marginTop: '10px',
    },
    hidden: {
        display: 'none',
    },

    // CUSTOM
    colorPrimary: {
        color: styleConstants.colorPrimary,
        backgroundColor: styleConstants.colorBgPrimary,
    },
}));

export default function DataTable() {
    // Hooks
    const classes = useStyles();
    const [activeBtns, setActiveBtns] = useState({ add: true, edit: false, delete: false });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [data, setData] = useState(rows);

    // Handlers
    function handleSelection(newSelection) {
        console.log(newSelection);
        if (newSelection.rowIds.length === 0)
            setActiveBtns({ add: true, edit: false, delete: false });
        else if (newSelection.rowIds.length === 1)
            setActiveBtns({ add: true, edit: true, delete: true });
        else setActiveBtns({ add: true, edit: false, delete: true });
    }

    function handleClickBtn() {
        setDialogOpen(true);
    }
    function handleCloseBtn() {
        setDialogOpen(false);
    }

    //

    return (
        <>
            <Box className={classes.boxBtns}>
                <Button
                    variant="contained"
                    color="primary"
                    className={clsx(classes.boxBtn, [!activeBtns.add && classes.hidden])}
                    startIcon={<AddIcon />}
                    onClick={handleClickBtn}
                    closeform={handleCloseBtn}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    className={clsx(classes.boxBtn, [!activeBtns.edit && classes.hidden])}
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={clsx(classes.boxBtn, [!activeBtns.delete && classes.hidden])}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </Box>
            <DialogForm open={dialogOpen} />

            <Box className={classes.boxTable}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    onSelectionChange={(newSelection) => {
                        handleSelection(newSelection);
                    }}
                />
            </Box>
        </>
    );
}
