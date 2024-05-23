import { Box } from '@mui/material';

const IconWithText = ({ icon, text }) => {
	
	return (
		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1}}>
				{icon}
			</Box>
			<Box>
				{text}
			</Box>
		</Box>
	)
}

export default IconWithText;