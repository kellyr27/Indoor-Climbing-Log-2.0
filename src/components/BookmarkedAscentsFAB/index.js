import {useAuthContext} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkedAscentsModal from '../BookmarkedAscentsModal';
import { useState } from 'react';


const fabStyle = {
    position: 'fixed',
    bottom: 50,
    right: 50,
    opacity: 0.75
};

const BookmarkedAscentsFab = () => {
    
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <>
            {isAuthenticated && (
                <>
                    <Tooltip title="View bookmarked ascents">
                        <Fab color="secondary" aria-label="bookmark" sx={fabStyle} size="large" onClick={handleOpenModal}>
                          {isModalOpen ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </Fab>
                    </Tooltip>
                    <BookmarkedAscentsModal isOpen={isModalOpen} onClose={handleCloseModal} />
                </>
            )}
        </>
    )
}

export default BookmarkedAscentsFab;

