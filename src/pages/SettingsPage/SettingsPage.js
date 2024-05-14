import React from 'react';

import Template1 from '../../templates/Template1';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { Paper, Typography } from '@mui/material';
import DeleteButtonWithDialog from '../../components/DeleteButtonWithDialog/DeleteButtonWithDialog';

const SettingsPage = () => {

    const handleDelete = () => {
        // TODO
        // const token = localStorage.getItem('token');
        // axios.delete(`${baseUrl}/ascents/${id}`, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        //     .then(response => {
        //         navigate('/ascents');
        //         enqueueSnackbar('Ascent deleted successfully', { variant: 'success' });
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         enqueueSnackbar('Failed to delete ascent', { variant: 'error' });
        //     });
    }

    return (
        <>

            <Template1>
                <Paper sx={{minHeight: '60vh', borderRadius: 6, m: 2, p: 3, bgcolor: 'rgba(254, 250, 250, 0.95)'}}>
                    <Typography variant="h4" align="center" sx={{ pt: 2, mb: 3, fontWeight: 'bold' }}>
                        Your Settings
                    </Typography>

                    <DeleteButtonWithDialog
                        handleDelete={handleDelete}
                        buttonText="Delete Account"
                        dialogText="Are you sure you want to delete your account? This action cannot be undone."
                    />
                </Paper>
            </Template1>
            <CreateAscentFab />
        </>
    );
}

export default SettingsPage;