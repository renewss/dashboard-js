import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper,
    Checkbox,
} from '@material-ui/core';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { connect } from 'react-redux';
import { dialogOpen, dialogClose } from '../../../redux/actions/dialogFormActions';

import DialogForm from '../components/DialogForm';
import styleConstants from '../../../constants/styleConstants';

// Data
function createData(id, lastName, firstName, age) {
    return { id, lastName, firstName, age, fullName: `${firstName ? firstName : ''} ${lastName}` };
}
const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'First name' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Last name' },
    { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
    { id: 'fullName', numeric: false, disablePadding: false, label: 'Full name' },
];
const rows = [
    createData(1, 'Snow', 'Jon', 35),
    createData(2, 'Lannister', 'Cersei', 42),
    createData(3, 'Lannister', 'Jaime', 45),
    createData(4, 'Stark', 'Arya', 16),
    createData(5, 'Targaryen', 'Daenerys', null),
    createData(6, 'Melisandre', null, 150),
    createData(7, 'Clifford', 'Ferrara', 44),
    createData(8, 'Frances', 'Rossini', 36),
    createData(9, 'Roxie', 'Harvey', 65),
    createData(10, 'Swing', 'Ember', 23),
];

// Sorting
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// HEAD
function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        variant="head"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// TABLE
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
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

function TableView(props) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);

        handleSelection();
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // My implementation
    const [activeBtns, setActiveBtns] = useState({ add: true, edit: false, delete: false });
    const [data, setData] = useState(rows);

    function handleSelection() {
        if (selected.length === 0) setActiveBtns({ add: true, edit: false, delete: false });
        else if (selected.length === 1) setActiveBtns({ add: true, edit: true, delete: true });
        else setActiveBtns({ add: true, edit: false, delete: true });
    }
    function handleClickBtn() {
        props.dialogFormOpen();
    }

    //
    return (
        <div className={classes.root}>
            <Box className={classes.boxBtns}>
                <Button
                    variant="contained"
                    color="primary"
                    className={clsx(classes.boxBtn, [!activeBtns.add && classes.hidden])}
                    startIcon={<AddIcon />}
                    onClick={handleClickBtn}
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
            <DialogForm open={props.dialogForm.open} handleData={setData} />

            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.firstName}</TableCell>
                                            <TableCell align="left">{row.lastName}</TableCell>
                                            <TableCell align="left">{row.age}</TableCell>
                                            <TableCell align="left">{row.fullName}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

// Redux
const mapStatetoProps = (state) => ({
    dialogForm: { ...state.dialogForm },
});
const mapDispatchToProps = (dispatch) => ({
    dialogFormOpen: (payload) => dispatch(dialogOpen(payload)),
    dialogFormClose: (payload) => dispatch(dialogClose(payload)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(TableView);
