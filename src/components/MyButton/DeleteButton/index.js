import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

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
            <Button variant="contained" style={{backgroundColor: 'red', color: 'white'}} onClick={handleClickOpen} sx={{borderRadius: 3}}>
                {buttonText ? buttonText : ''}
            </Button>

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