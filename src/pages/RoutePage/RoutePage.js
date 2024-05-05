import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, List, ListItem, Typography, Button, Box } from '@mui/material';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import RouteColour from '../../components/RouteColour/RouteColour';
import baseUrl from '../../utils/baseUrl';
import Divider from '@mui/material/Divider'
import Template1 from '../../templates/Template1';
import RouteCard from './components/RouteCard';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';


const RoutePage = () => {
    const [routeData, setRouteData] = useState({});
    const { id } = useParams()
    const navigate = useNavigate();


    const handleEditClick = () => {
        navigate(`/routes/${id}/edit`);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        axios.get(`${baseUrl}/routes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data;

                // Sort ascents by date
                const sortedData = {
                    ...data,
                    ascents: data.ascents.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                    })
                }

                setRouteData(sortedData);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (
        <>
            <Template1>
                <RouteCard />
            </Template1>
            <CreateAscentFab />
        </>
    );
}

export default RoutePage;