import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import StyledButton from '../../themes/components/StyledButton';

const DeleteButtonWithDialog = (props) => {

    const { handleDelete, buttonText, dialogText } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <StyledButton variant="contained" color="error" onClick={handleClickOpen} >
                {buttonText ? buttonText : ''}
            </StyledButton>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogText ? dialogText : ''}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteButtonWithDialog;