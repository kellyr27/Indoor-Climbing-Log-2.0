import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {dateToDisplay} from '../../../utils/helpers';
import TickTypeIcon from '../../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../../components/RouteGrade/RouteGrade';
import baseUrl from '../../../utils/baseUrl';
import { Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Card, CardHeader, CardContent, CardActions, List, ListItem } from '@mui/material';

const AscentCard = () => {
    const {enqueueSnackbar} = useSnackbar();
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
                enqueueSnackbar('Ascent deleted successfully', { variant: 'success' });
            })
            .catch(error => {
                console.error(error);
                enqueueSnackbar('Failed to delete ascent', { variant: 'error' });
            });
        
    }

    const handleEditClick = () => {
        navigate(`/ascents/${id}/edit`);
    };

    return (
        <Card sx={{minHeight: '300px', bgcolor: '#fefafa', borderRadius: 6}}>
            <CardHeader
                sx={{pt: 4}}
                title={
                    <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3 }}>
                        Ascended on the <span style={{ fontWeight: 'bold' }}>{dateToDisplay(ascentData.date)}</span>
                    </Typography>
                }
            />
            <CardContent>
                <List>
                    <ListItem 
                        button 
                        onDoubleClick={() => navigate(`/routes/${ascentData.route?._id}`)} 
                        sx={{display: 'flex', justifyContent: 'space-evenly'}}
                    >
                        <Typography variant="h4">
                            <TickTypeIcon tickType={ascentData.tickType} style={{ width: '1em', height: '1em' }}/>
                        </Typography>
                        <Typography variant="h4" sx={{  textAlign: 'center' }}>
                                {ascentData.route?.name}
                        </Typography>
                        <Typography variant="h4">
                            <RouteGrade grade={ascentData.route?.grade} />
                        </Typography>
                    </ListItem>
                </List>
                <Box sx={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
                    <Typography variant="body1" gutterBottom align="center" sx={{marginBottom: '30px', marginTop: '30px'}}>
                        {ascentData.notes}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'space-evenly', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleEditClick}>
                    Edit
                </Button>
                <Button variant="contained" color="warning" onClick={handleClickOpen}>
                    Delete
                </Button>
            </CardActions>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this ascent?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="warning">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default AscentCard;