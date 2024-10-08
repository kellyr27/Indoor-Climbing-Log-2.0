import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Fab, Tooltip, Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkedAscentsModal from '../BookmarkedAscentsModal';
import { useState, useEffect } from 'react';
import { getRoutes } from '../../services/apis';

const fabStyle = {
    position: 'fixed',
    bottom: 50,
    right: 50,
    opacity: 0.75,
    zIndex: 2,
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

    const [routesData, setRoutesData] = useState([]);

  const fetchRoutesData = async () => {
    try {
      const data = await getRoutes();

      // Filter out routes that have not been bookmarked
      const bookmarkedRoutes = data.filter((item) => item.bookmarked);

      // Sort ascents (property of route) by date descending
      const sortedAscents = bookmarkedRoutes.map((item) => {
        item.ascents.sort((a, b) => {
          const dateDifference = new Date(b.date) - new Date(a.date);
          if (dateDifference !== 0) {
            return dateDifference;
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        });

        return item;
      });

      const dataWithIds = sortedAscents.map((item) => ({
        ...item,
        id: item._id,
        lastAscentDate: item.ascents.length > 0 ? item.ascents[0].date : null,
        firstAscentDate:
          item.ascents.length > 0
            ? item.ascents[item.ascents.length - 1].date
            : null,
      }));

      // Sort by last ascent date, then by created date for the last ascent
      const sortedData = dataWithIds.sort((a, b) => {
        const dateComparison =
          new Date(b.lastAscentDate) - new Date(a.lastAscentDate);
        if (dateComparison !== 0) {
          return dateComparison;
        } else {
          return (
            new Date(b.ascents[0].createdAt) -
            new Date(a.ascents[0].createdAt)
          );
        }
      });

      console.log('sortedData', sortedData);

      setRoutesData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch the ascents data from the server

    fetchRoutesData();
  }, [isModalOpen]);
    
    return (
        <>
            {isAuthenticated && (
                <>
                    <Tooltip title="View bookmarked ascents">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                                badgeContent={routesData.length}
                            color="primary"
                            sx={fabStyle}
                        >
                            <Fab color="secondary" aria-label="bookmark" sx={{zIndex: 1}} size="large" onClick={handleOpenModal}>
                                {isModalOpen ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                            </Fab>
                        </Badge>
                    </Tooltip>
                    <BookmarkedAscentsModal isOpen={isModalOpen} onClose={handleCloseModal} routesData={routesData} refresh={() => fetchRoutesData()} />
                </>
            )}
        </>
    )
}

export default BookmarkedAscentsFab;
