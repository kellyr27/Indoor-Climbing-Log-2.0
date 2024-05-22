import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import {dateToDisplay} from '../../../utils/helpers';
import TickTypeIcon from '../../../components/TickTypeIcon/TickTypeIcon';
import RouteGrade from '../../../components/RouteGrade/RouteGrade';
import { Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Card, CardHeader, CardContent, CardActions, List, ListItem } from '@mui/material';
import DeleteButtonWithDialog from '../../../components/DeleteButtonWithDialog/DeleteButtonWithDialog';
import { getAscent, deleteAscent } from '../../../services/apis';
import StyledButton from '../../../themes/components/StyledButton';

const AscentCard = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [ascentData, setAscentData] = useState({});
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAscentData = async () => {
            try {
                const data = await getAscent(id);
                setAscentData(data);
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Failed to fetch ascent data';
                enqueueSnackbar(errorMessage, { variant: 'error' });
                navigate('/ascents');
            }
        };
    
        fetchAscentData();
    }, [id, navigate, enqueueSnackbar]);

    const handleDelete = async () => {
        try {
            await deleteAscent(id);
            enqueueSnackbar('Ascent deleted successfully', { variant: 'success' });
            navigate('/ascents');
        } catch (error) {
            enqueueSnackbar('Failed to delete ascent', { variant: 'error' });
        }
    }

    const handleEditClick = () => {
        navigate(`/ascents/${id}/edit`);
    };

    return (
		<Card sx={{minHeight: '300px', m: 2, bgcolor: 'rgba(254, 250, 250, 0.85)', borderRadius: 6, boxShadow: 4}}>
			<CardHeader
				sx={{pt: 4}}
				title={
					<Typography variant="h6" gutterBottom align="center" sx={{ mb: 1 }}>
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
			<CardActions sx={{ justifyContent: 'space-evenly', mt: 1, mb: 1 }}>
				<StyledButton variant="contained" color="primary" onClick={handleEditClick}>
					Edit
				</StyledButton>
				<DeleteButtonWithDialog
					handleDelete={handleDelete}
					buttonText="Delete"
					dialogText="Are you sure you want to delete this ascent?"
				/>
			</CardActions>
		</Card>

    );
}

export default AscentCard;