import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {dateToDisplay} from '../../utils/helpers';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import baseUrl from '../../utils/baseUrl';

const AscentPage = () => {
    const [ascentData, setAscentData] = useState({});
    const { id } = useParams()
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`${baseUrl}/ascents/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAscentData(response.data);

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [id]);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`${baseUrl}/ascents/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                navigate('/ascents');
            })
            .catch(error => {
                console.error(error);
            });
        
    }

    const handleEditClick = () => {
        navigate(`/ascents/${id}/edit`);
    };

    return (
        <Grid container justifyContent="center">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    minHeight: '92vh',
                }}
            >
                <Box sx={{ my: 4, padding: 2,  maxWidth: { xs: '100%', sm: 500 }, minWidth: {xs: '100%', sm: 500} }}>

                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            {dateToDisplay(ascentData.date)}
                        </Typography>
                        <Link to={`/routes/${ascentData.route?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Typography variant="h4">
                                    <TickTypeIcon tickType={ascentData.tickType} style={{ width: '1em', height: '1em' }}/>
                                </Typography>
                                <Typography variant="h4">
                                        {ascentData.route?.name}
                                </Typography>
                                <Typography variant="h4">
                                    <RouteGrade grade={ascentData.route?.grade} />
                                </Typography>
                            </Box>
                        </Link>
                        <Typography variant="body1" gutterBottom sx={{marginBottom: '30px', marginTop: '30px'}}>
                            {ascentData.Notes}
                        </Typography>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button variant="contained" color="primary" onClick={handleEditClick}>
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                Delete
                            </Button>
                        </Box>
                    </Paper>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>
                            Delete ascentData
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this ascentData?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} color="secondary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Grid>
    );
}

export default AscentPage;