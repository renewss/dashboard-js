import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { dialogClose } from '../../../redux/actions/dialogFormActions';
import { tableDataRowAdd, tableDataRowEdit } from '../../../redux/actions/tableDataActions';

//

function DialogForm(props) {
    const [fieldData, setFieldData] = useState({
        id: null,
        firstName: null,
        lastName: null,
        age: null,
    });
    const [input, setInput] = useState({ firstName: null, lastName: null, age: null });

    useEffect(() => {
        if (props.dialogForm.isNew) {
            return;
        } else if (props.dialogForm.id) {
            const { id, firstName, lastName, age } = props.tableData.filter(
                (el) => el.id === props.dialogForm.id
            )[0];
            setFieldData({ id, firstName, lastName, age });
            setInput({ firstName, lastName, age });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.dialogForm]);

    function handleClose() {
        props.dialogFormClose();
    }
    function handleSubmit(e) {
        if (props.dialogForm.isNew) props.tableDataRowAdd({ id: props.tableData.length, ...input });
        else props.tableDataRowEdit({ id: fieldData.id, ...input });

        handleClose();
    }
    function handleTextChange(field) {
        return function (e) {
            const obj = { ...input };
            obj[field] = e.target.value;
            setInput(obj);
        };
    }

    return (
        <div>
            <Dialog
                open={!!props.dialogForm.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add </DialogTitle>
                <DialogContent>
                    <DialogContentText>To add new row fill the form below.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="Required"
                        fullWidth
                        defaultValue={fieldData.firstName}
                        onChange={handleTextChange('firstName')}
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        label="Required"
                        fullWidth
                        defaultValue={fieldData.lastName}
                        onChange={handleTextChange('lastName')}
                    />
                    <TextField
                        margin="dense"
                        id="age"
                        label="Required"
                        type="number"
                        fullWidth
                        defaultValue={fieldData.age}
                        onChange={handleTextChange('age')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

// Redux
const mapStatetoProps = (state) => ({
    dialogForm: { ...state.dialogForm },
    tableData: [...state.tableData],
});
const mapDispatchToProps = (dispatch) => ({
    dialogFormClose: (payload) => dispatch(dialogClose(payload)),
    tableDataRowAdd: (payload) => dispatch(tableDataRowAdd(payload)),
    tableDataRowEdit: (payload) => dispatch(tableDataRowEdit(payload)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(DialogForm);
