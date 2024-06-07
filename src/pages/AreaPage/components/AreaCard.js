import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, Tooltip } from '@mui/material';
import { Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { getArea } from '../../../services/apis';
import MyButton from '../../../components/MyButton';
import EditIcon from '@mui/icons-material/Edit';
import IconWithText from '../../../components/IconWithText';
import SteepnessIcon from '../../../components/SteepnessIcon';
import { Link } from 'react-router-dom';
import RouteColour from '../../../components/RouteColour/RouteColour';
import RouteGrade from '../../../components/RouteGrade';
import TickTypeIcon from '../../../components/TickTypeIcon/TickTypeIcon';
import { dateToDisplay } from '../../../utils/helpers';

const AreaCard = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [areaData, setAreaData] = useState({});
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAreaData = async () => {
            try {
                const data = await getArea(id);
				
				// For each route, I want to sort the ascents by date then by created date
				const sortedRoutes = data.routes.map(route => {
					return {
						...route,
						ascents: route.ascents.sort((a, b) => {
							const dateDifference = new Date(b.date) - new Date(a.date);
							if (dateDifference !== 0) {
								return dateDifference;
							}
							return new Date(b.createdAt) - new Date(a.createdAt);
						})
					}
				});
				// Sort the routes by latest ascent date, then by created date for the latest ascent
				sortedRoutes.sort((a, b) => {
					const dateComparison = new Date(b.ascents[0].date) - new Date(a.ascents[0].date);
					if (dateComparison !== 0) {
						return dateComparison;
					}
					return new Date(b.ascents[0].createdAt) - new Date(a.ascents[0].createdAt);
				});
				data.routes = sortedRoutes;

                setAreaData(data);
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Failed to fetch area data';
                enqueueSnackbar(errorMessage, { variant: 'error' });
                navigate('/areas');
            }
        };
    
        fetchAreaData();
    }, [id, navigate, enqueueSnackbar]);

    const handleEditClick = () => {
        navigate(`/areas/${id}/edit`);
    };

    return (
		<Card sx={{minHeight: '300px', m: 2, bgcolor: 'rgba(254, 250, 250, 0.85)', borderRadius: 6, boxShadow: 4}}>
			<CardHeader
				sx={{pt: 4}}
				title={
					<>
						<Box>
							<Typography variant="h6" gutterBottom align="center" sx={{ mb: 1 }}>
								{areaData.name}
							</Typography>
							<Box sx={{ mt: 2, overflowWrap: 'break-word', wordWrap: 'break-word', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								{areaData.steepnessTags && areaData.steepnessTags.map((tag, index) => (
									<Tooltip title={tag} key={index}>
										<Box sx={{ml: 1, mr: 1}}>
											<SteepnessIcon key={index} steepness={tag} />
										</Box>
									</Tooltip>
								))}
							</Box>
						</Box>
					</>
				}
			/>
			<CardContent>
				
				<Divider />
                <Typography variant="h6" align="center" sx={{fontWeight: 'bold'}}>List of Routes</Typography>
                <List>
                    {areaData.routes && areaData.routes.map((route, index) => {
                        return (
                            <ListItem 
                                key={index}
                                button 
                                onDoubleClick={() => navigate(`/routes/${route._id}`)} 
                            >
								<Box sx={{display: 'flex', alignItems: 'center', width: '100%' }}>
									<Box sx={{flex: 1}}>
										<Box 
											sx={{
												display: 'flex', 
												justifyContent: 'center',
												alignItems: 'center', 
												height: '100%',
												width: '100%',
											}}
										>
											<RouteGrade grade={route.grade} />
										</Box>
									</Box>
									<Box sx={{display: 'flex', alignItems: 'center', flex: 4 }}>
										<RouteColour colour={route.colour} />
										{route.name}
									</Box>
									<Box sx={{flex: 1}}>
										<Box sx={{ whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: "normal", display: 'flex', alignItems: 'center', height: '100%' }}>
											{route.ascents.map((ascent, index) => {
												return (
													<Tooltip key={index} title={dateToDisplay(ascent.date)}>
														<span>
															<TickTypeIcon tickType={ascent.tickType} />
														</span>
													</Tooltip>
												)
											})}
										</Box>
									</Box>
								</Box>
                            </ListItem>
                        )
                    })}
                </List>
            </CardContent>
			<Divider />
			<CardActions sx={{ justifyContent: 'space-evenly', mt: 1, mb: 1 }}>
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
			</CardActions>
		</Card>

    );
}

export default AreaCard;