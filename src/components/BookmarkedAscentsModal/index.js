import React, { useEffect, useState } from "react";
import { getRoutes, bookmarkRoute } from "../../services/apis";
import { Modal, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import RouteColour from "../RouteColour/RouteColour";
import RouteGrade from "../RouteGrade";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const BookmarkedAscentsModal = ({ isOpen, onClose }) => {
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
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          maxHeight: "80%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: "scroll",
          // marginLeft: '10px',
          // marginRight: '10px',
          borderRadius: 4,
          pl: 2,
          pr: 2,
          bgcolor: "rgba(255, 255, 255, 0.9)"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >
          {routesData.length === 0 && (
            <Box sx={{width: '100%', alignContent: 'center', display: 'flex', justifyContent: 'center'}}>
              No bookmarked routes.
              </Box>
              )}

          {routesData.length > 0 && routesData.map((route) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box sx={{mr: 1}}>
                  {route.bookmarked ? (
                    <IconButton onClick={async () => {await bookmarkRoute(route.id); await fetchRoutesData()}}>
                      <BookmarkIcon color="primary" fontSize="large" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={async () => {await bookmarkRoute(route.id); await fetchRoutesData()}}>
                      <BookmarkBorderIcon color="primary" fontSize="large"/>
                    </IconButton>
                  )
                  }
                </Box>

                  <Box
                    sx={{
                      width: '100%',
                      alignItems: "center",
                      display: "flex",
                      // flexDirection: "column",
                      // justifyContent: "space-between",
                    }}
                  >
                    <Link to={`/routes/${route.id}`} style={{ textDecoration: 'none', alignItems: "center", width: '100%' }} onClick={onClose}>
                      <Box
                        sx={{
                          minWidth: '100%',
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <RouteColour colour={route.colour} />
                        </Box>
                        <Box sx={{ textAlign: "center", wordBreak: "break-word" }}>
                          {route.name}
                        </Box>
                        <Box>
                          <RouteGrade grade={route.grade} />
                        </Box>
                      </Box>
                    </Link>
                  </Box>
                </Box>
            )
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default BookmarkedAscentsModal;
