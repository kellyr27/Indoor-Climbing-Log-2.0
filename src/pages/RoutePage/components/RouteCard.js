import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  List,
  ListItem,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import TickTypeIcon from "../../../components/TickTypeIcon/TickTypeIcon";
import RouteGrade from "../../../components/RouteGrade";
import RouteColour from "../../../components/RouteColour/RouteColour";
import Divider from "@mui/material/Divider";
import { getRoute, bookmarkRoute } from "../../../services/apis";
import MyButton from "../../../components/MyButton";
import EditIcon from "@mui/icons-material/Edit";
import IconWithText from "../../../components/IconWithText";
import { Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const RouteCard = () => {
  const [routeData, setRouteData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/routes/${id}/edit`);
  };

  const fetchRouteData = async () => {
    try {
      const data = await getRoute(id);

      // Sort ascents by date
      const sortedData = {
        ...data,
        ascents: data.ascents.sort((a, b) => {
          const dateDifference = new Date(b.date) - new Date(a.date);
          if (dateDifference !== 0) {
            return dateDifference;
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        }),
      };

      setRouteData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRouteData();
  }, [id]);

  return (
    <Card
      sx={{
        minHeight: "300px",
        bgcolor: "rgba(254, 250, 250, 0.85)",
        m: 2,
        borderRadius: 6,
        boxShadow: 4,
      }}
    >
      <CardHeader
        sx={{ pt: 4 }}
        title={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box>
              <RouteColour colour={routeData.colour} />
            </Box>
            <Box sx={{ textAlign: "center", wordBreak: "break-word" }}>
              {routeData.name}
            </Box>
            <Box>
              <RouteGrade grade={routeData.grade} />
            </Box>
          </Box>
        }
      />
      {routeData.area && (
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 2, fontStyle: "italic" }}
        >
          <Link
            to={`/areas/${routeData.area?.id}`}
            style={{ textDecoration: "none" }}
          >
            {routeData.area.name}
          </Link>
        </Typography>
      )}
      <Divider />
      <CardContent>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          List of Ascents
        </Typography>
        <List
          sx={{
            maxHeight: "200px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {routeData.ascents &&
            routeData.ascents.map((ascent, index) => {
              const date = format(parseISO(ascent.date), "d MMM yyyy");
              return (
                <ListItem
                  key={index}
                  button
                  onDoubleClick={() => navigate(`/ascents/${ascent._id}`)}
                >
                  <span style={{ marginRight: "10px" }}>
                    <TickTypeIcon tickType={ascent.tickType} />
                  </span>
                  <span style={{ marginRight: "10px", minWidth: "100px" }}>
                    {date}
                  </span>
                  <span style={{ wordWrap: "break-word" }}>{ascent.notes}</span>
                </ListItem>
              );
            })}
        </List>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-evenly", mt: 1, mb: 1 }}>
        {routeData.bookmarked ? (
          <Tooltip title="Remove from Bookmarks" arrow>
            <IconButton onClick={async () => {await bookmarkRoute(id); await fetchRouteData()}}>
              <BookmarkIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add to Bookmarks" arrow>
            <IconButton onClick={async () => {await bookmarkRoute(id); await fetchRouteData()}}>
              <BookmarkBorderIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
        <MyButton
          color="primary"
          handleClick={handleEditClick}
          buttonText={<IconWithText icon={<EditIcon />} text="Edit" />}
        />
      </CardActions>
    </Card>
  );
};

export default RouteCard;
