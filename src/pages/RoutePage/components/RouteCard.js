import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, List, ListItem, Typography, Box } from '@mui/material';
import TickTypeIcon from '../../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../../components/RouteGrade';
import RouteColour from '../../../components/RouteColour/RouteColour';
import Divider from '@mui/material/Divider'
import { getRoute } from '../../../services/apis';
import MyButton from '../../../components/MyButton';
import EditIcon from '@mui/icons-material/Edit';
import IconWithText from '../../../components/IconWithText';

const RouteCard = () => {
    const [routeData, setRouteData] = useState({});
    const { id } = useParams()
    const navigate = useNavigate();


    const handleEditClick = () => {
        navigate(`/routes/${id}/edit`);
    };

    useEffect(() => {	

		const fetchRouteData = async () => {
			try {
				const data = await getRoute(id);
				
				// Sort ascents by date
                const sortedData = {
                    ...data,
                    ascents: data.ascents.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                    })
                }

                setRouteData(sortedData);

			} catch (error) {
				console.error(error);
			}
		}

		fetchRouteData();

    }, [id]);

    return (
        <Card sx={{minHeight: '300px', bgcolor: 'rgba(254, 250, 250, 0.85)', m: 2, borderRadius: 6, boxShadow: 4}}>
            <CardHeader
                sx={{pt: 4}}
                title={
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Box>
                            <RouteColour colour={routeData.colour} />
                        </Box>
                        <Box sx={{  textAlign: 'center', wordBreak: 'break-word' }}>
                            {routeData.name}
                        </Box>
                        <Box>
                            <RouteGrade grade={routeData.grade} />
                        </Box>
                    </Box>
                }
            />
            <CardContent>
				{routeData.area && <Typography variant="body1" align="center" sx={{mb: 2, fontStyle: 'italic'}}>{routeData.area.name}</Typography>}
				<Divider />
                <Typography variant="h6" align="center" sx={{fontWeight: 'bold'}}>List of Ascents</Typography>
                <List>
                    {routeData.ascents && routeData.ascents.map((ascent, index) => {
                        const date = format(parseISO(ascent.date), 'd MMM yyyy');
                        return (
                            <ListItem 
                                key={index}
                                button 
                                onDoubleClick={() => navigate(`/ascents/${ascent._id}`)} 
                            >
                                <span style={{ marginRight: '10px' }}><TickTypeIcon tickType={ascent.tickType}/></span>
                                <span style={{ marginRight: '10px', minWidth: '100px' }}>{date}</span>
                                <span>{ascent.notes}</span>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
					<MyButton 
						color="primary" 
						handleClick={handleEditClick}
						buttonText={
							<IconWithText 
								icon={<EditIcon/>}
								text="Edit"
							/>
						}
					/>
                </Box>
            </CardContent>
        </Card>
    );
}

export default RouteCard;