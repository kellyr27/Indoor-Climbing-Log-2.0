import { styled } from "@mui/material";
import {Button} from "@mui/material";
import theme from "../../../themes";

const StyledButton = styled(Button)(({ theme }) => ({
	borderRadius: '10px',
	padding: '5px 10px',
	fontSize: '1rem',
	textTransform: 'none',
	boxShadow: 1,
	width: '100px',
	letterSpacing: '1px',
}));

export default StyledButton;