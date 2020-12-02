import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Box, Button, makeStyles } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { dialogOpen, dialogClose } from '../../../redux/actions/dialogFormActions';
import { tableDataRowAdd, tableDataRowRemove } from '../../../redux/actions/tableDataActions';

import DialogForm from '../components/DialogForm';
import styleConstants from '../../../constants/styleConstants';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    {
        field: 'fullName',
        headerName: 'Full name',
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

//

function TableView(props) {
    // Hooks
    const classes = useStyles();
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        props.dialogFormClose();

        rows.forEach((row) => {
            props.tableDataRowAdd(row);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [0]);

    // Handlers
    function handleSelection(newSelection) {
        setSelected(newSelection.rowIds);
    }

    function handleClickAddBtn() {
        props.dialogFormOpen();
    }
    function handleClickDeleteBtn() {
        console.log(selected);
        selected.forEach((id) => {
            props.tableDataRowRemove({ id: id * 1 });
        });
    }

    //
    return (
        <>
            <Box className={classes.boxBtns}>
                <Button
                    variant="contained"
                    color="primary"
                    className={clsx(classes.boxBtn)}
                    startIcon={<AddIcon />}
                    onClick={handleClickAddBtn}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    className={clsx(classes.boxBtn, [selected.length !== 1 && classes.hidden])}
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={clsx(classes.boxBtn, [selected.length < 1 && classes.hidden])}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickDeleteBtn}
                >
                    Delete
                </Button>
            </Box>
            <DialogForm />

            <Box className={classes.boxTable}>
                <DataGrid
                    rows={Object.values(props.tableData)}
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

// Redux
const mapStatetoProps = (state) => ({
    dialogForm: { ...state.dialogForm },
    tableData: { ...state.tableData },
});
const mapDispatchToProps = (dispatch) => ({
    dialogFormOpen: (payload) => dispatch(dialogOpen(payload)),
    dialogFormClose: (payload) => dispatch(dialogClose(payload)),
    tableDataRowAdd: (payload) => dispatch(tableDataRowAdd(payload)),
    tableDataRowRemove: (payload) => dispatch(tableDataRowRemove(payload)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(TableView);
