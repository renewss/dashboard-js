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

//

function DialogForm(props) {
    const [input, setInput] = useState(null);
    function handleClose() {
        props.dialogFormClose();
    }
    function handleSubmit(e) {
        console.log(input);

        handleClose();
    }
    function handleTextChange(e) {
        setInput(e.target.value);
    }

    return (
        <div>
            <Dialog
                open={!!props.dialogForm.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will
                        send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleTextChange}
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
});
const mapDispatchToProps = (dispatch) => ({
    dialogFormClose: (payload) => dispatch(dialogClose(payload)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(DialogForm);
