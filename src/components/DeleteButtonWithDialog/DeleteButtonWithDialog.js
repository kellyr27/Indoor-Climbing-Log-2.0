import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MyButton from '../MyButton';

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
			<MyButton 
				color="error" 
				handleClick={handleClickOpen}
				buttonText={buttonText}
			/>

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