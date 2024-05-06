import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {dateToDisplay} from '../../utils/helpers';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import baseUrl from '../../utils/baseUrl';
import { Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import Template1 from '../../templates/Template1';
import AscentCard from './components/AscentCard';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';

const AscentPage = () => {
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
        <>
            <Template1>
                <AscentCard />
            </Template1>
            <CreateAscentFab />
        </>
    );
}

export default AscentPage;