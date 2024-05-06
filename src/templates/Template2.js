import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../components/NavBar/NavBar';


const Template2 = ({children}) => {

    return (
        <>
            <Container maxWidth="lg" style={{
                    paddingLeft: 0, 
                    paddingRight: 0
                }} 
                sx={{
                    bgcolor: '#FDFFC2',
                    
                }} 
            >
                <NavBar />  
                <Container maxWidth="lg" style={{paddingLeft: 0, paddingRight: 0}} sx={{bgcolor: '#FDFFC2', height: '90vh'}}>
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

export default Template2;