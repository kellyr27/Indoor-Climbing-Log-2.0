import {useAuthContext} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const fabStyle = {
    position: 'fixed',
    bottom: 50,
    left: 50,
    opacity: 0.75
};

const CreateAscentFab = () => {
    
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();
    
    return (
        <>
            {isAuthenticated && (
                <Tooltip title="Add an ascent">
                    <Fab color="primary" aria-label="add" sx={fabStyle} size="large" onClick={() => navigate('/ascents/new')}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            )}
        </>
    )
}

export default CreateAscentFab;

