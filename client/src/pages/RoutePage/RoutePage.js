import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../assets/tickTypeIcons/index';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, List, ListItem, Typography, Button, Grid, Box, Paper } from '@mui/material';
import TickTypeIcon from '../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../components/RouteGrade/RouteGrade';
import RouteColour from '../../components/RouteColour/RouteColour';
import baseUrl from '../../utils/baseUrl';

const getTickTypeSvg = (tickType) => {
    switch (tickType) {
        case 'Flash':
            return <FlashSVG />;
        case 'Redpoint':
            return <RedpointSVG />;
        case 'Hangdog':
            return <HangdogSVG />;
        case 'Attempt':
            return <AttemptSVG />;
        default:
            return null;
    }
}

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
                console.log(sortedData);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

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
                <Card sx={{ padding: 2,  maxWidth: { xs: '100%', sm: 500 }, minWidth: {xs: '100%',sm: 500} }}>
                    <CardHeader
                        title={
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Box>
                                    <RouteColour colour={routeData.colour} />
                                </Box>
                                <Box>
                                    {routeData.name}
                                </Box>
                                <Box>
                                    <RouteGrade grade={routeData.grade} />
                                </Box>
                            </Box>
                        }
                    />
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" onClick={handleEditClick} sx={{marginBottom: '30px'}}>
                                Edit Route
                            </Button>
                        </Box>
                        <Typography variant="h6" align="center">List of Ascents</Typography>
                        <List>
                            {routeData.ascents && routeData.ascents.map((ascent) => {
                                const date = format(parseISO(ascent.date), 'd MMM yyyy');
                                return (
                                    <ListItem 
                                        button 
                                        onDoubleClick={() => navigate(`/ascents/${ascent._id}`)} 
                                        key={ascent.id}
                                    >
                                        <span style={{ marginRight: '10px' }}><TickTypeIcon tickType={ascent.tickType}/></span>
                                        <span style={{ marginRight: '10px', minWidth: '100px' }}>{date}</span>
                                        <span>{ascent.notes}</span>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
}

export default RoutePage;