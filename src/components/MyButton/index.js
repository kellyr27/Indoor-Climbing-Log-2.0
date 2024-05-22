import {Button} from "@mui/material";

const MyButton = ({
	buttonText = '', 
	color = 'primary', 
	handleClick
}) => {

	return (
		<Button 
			variant="contained" 
			color={color} 
			sx={{
				borderRadius: 3,
				boxShadow: 3,
				minWidth: 100,
			}}
			onClick={handleClick}
		>
			{buttonText}
		</Button>
	)
}

export default MyButton;