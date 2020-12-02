import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { dialogClose } from '../../../redux/actions/dialogFormActions';
import { tableDataRowAdd } from '../../../redux/actions/tableDataActions';

//

function DialogForm(props) {
    const [input, setInput] = useState({ firstName: null, lastName: null, age: null });
    function handleClose() {
        props.dialogFormClose();
    }
    function handleSubmit(e) {
        props.tableDataRowAdd({ id: props.tableData.length, ...input });

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
                        label="First Name"
                        fullWidth
                        onChange={handleTextChange('firstName')}
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        label="Last Name"
                        fullWidth
                        onChange={handleTextChange('lastName')}
                    />
                    <TextField
                        margin="dense"
                        id="age"
                        label="Age"
                        type="number"
                        fullWidth
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
});
export default connect(mapStatetoProps, mapDispatchToProps)(DialogForm);
