import {Button} from "@mui/material";

const MyButton = ({
	buttonText = '', 
	color = 'primary', 
	handleClick,
	disabled = false,
	fullWidth = false
}) => {

	return (
		<Button 
			variant="contained" 
			color={color} 
			sx={{
				borderRadius: 3,
				boxShadow: 3,
				minWidth: 120,
				minHeight: 40,
				textTransform: 'none',
				letterSpacing: 1,
			}}
			onClick={handleClick}
			disabled={disabled}
			fullWidth={fullWidth}
		>
			{buttonText}
		</Button>
	)
}

export default MyButton;