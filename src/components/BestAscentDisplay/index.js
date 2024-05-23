import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import TickTypeIcon from "../TickTypeIcon/TickTypeIcon"
import RouteGrade from "../RouteGrade"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const BestAscentDisplay = ({ tickType, date, routeName, routeGrade, routeId }) => {

	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box key={date} display="flex" justifyContent="space-between" flexDirection={isSmallScreen ? "column" : "row"} sx={{mb: 1}}>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} >
				<Box sx={{mr: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
					<TickTypeIcon tickType={tickType}/> 
				</Box>
				<Link to={`/routes/${routeId}`} style={{ textDecoration: 'none' }}>
					<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Box sx={{mr: 1}}>
							<RouteGrade grade={routeGrade}/>
						</Box>
						<Box> 
							{routeName}
						</Box> 
					</Box>
				</Link>
			</Box>
			<Box textAlign="right" sx={{ letterSpacing: 0.5, fontSize: 10, fontStyle: 'italic', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
				{timeAgo.format(new Date(date))}
			</Box>
		</Box>
	)
}

export default BestAscentDisplay;