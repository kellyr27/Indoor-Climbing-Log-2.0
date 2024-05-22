import { Box, Typography } from "@mui/material"
import {getDifficultyClassification, getDifficultyBackgroundColour} from '../../utils/helpers'
import chroma from 'chroma-js';

const RouteGrade = ({ grade, fontSize = 'inherit' }) => {
	const gradeClassification = getDifficultyClassification(grade);
	const backgroundColor = getDifficultyBackgroundColour(grade);
	const textColor = chroma(backgroundColor).luminance() > 0.4 ? 'black' : 'white';
    const borderColor = chroma(backgroundColor).darken(2).hex();


	const shinyEffectProps = gradeClassification === 1 ? {
		backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)',
		backgroundSize: '40px 40px',
		boxShadow: '0px 0px 15px 5px rgba(255,255,255,0.3)',
	} : {
		backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
		backgroundSize: '40px 40px',
		boxShadow: '0px 0px 15px 5px rgba(255,255,255,0.1)',
	}

    return (
        <Box 
			sx={{
				display: 'flex', 
				justifyContent: 'center',
				alignItems: 'center',
				border: '2px solid ' + borderColor,
				bgcolor: backgroundColor,
				color: textColor,
				padding: '4px',
				borderRadius: '7px',
				...shinyEffectProps,
				minWidth: 20,
				minHeight: 20
			}}
		>
            <Typography sx={{fontSize}}>
                {grade}
            </Typography>
        </Box>
    )
}

export default RouteGrade;