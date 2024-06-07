import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { getArea } from '../../../services/apis';
import MyButton from '../../../components/MyButton';
import EditIcon from '@mui/icons-material/Edit';
import IconWithText from '../../../components/IconWithText';
import SteepnessIcon from '../../../components/SteepnessIcon';

const AreaCard = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [areaData, setAreaData] = useState({});
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAreaData = async () => {
            try {
                const data = await getArea(id);
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
					<Typography variant="h6" gutterBottom align="center" sx={{ mb: 1 }}>
						{areaData.name}
					</Typography>
				}
			/>
			<CardContent>
				<Box sx={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
					<Typography variant="body1" gutterBottom align="center" sx={{marginBottom: '30px', marginTop: '30px'}}>
						{areaData.steepnessTags && areaData.steepnessTags.map((tag, index) => (
							<SteepnessIcon key={index} steepness={tag} />
						))}
					</Typography>
				</Box>
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