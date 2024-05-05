import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../components/NavBar/NavBar';
import { useTheme } from '@mui/material/styles';


const Template1 = ({children}) => {

    const theme = useTheme();

    return (
        <>
            <Container maxWidth="lg" style={{
                    paddingLeft: 0, 
                    paddingRight: 0
                }} 
                sx={{
                    bgcolor: '#FDFFC2',
                    borderLeft: "1px solid #888",
                    borderRight: "1px solid #888",
                    [theme.breakpoints.down('lg')]: {
                        borderLeft: "none",
                        borderRight: "none"
                    }
                }} 
            >
                <NavBar />  
                <Container maxWidth="sm" style={{paddingLeft: 0, paddingRight: 0}} sx={{bgcolor: '#FDFFC2', height: '92vh'}}>
                    <Grid
                        container
                        direction="row"
                        sx ={{
                            height: '100%',
                        }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box sx={{width: '100%'}}>
                            {children}
                        </Box>
                    </Grid>
                </Container>
            </Container>
        </>
    );
}

export default Template1;