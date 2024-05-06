import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../components/NavBar/NavBar';


const Template1 = ({children}) => {

    return (
        <>
            <Container maxWidth="100vw" style={{paddingLeft: 0, paddingRight: 0}} sx={{bgcolor: '#feffde'}}>
                <Container maxWidth="lg" style={{
                        paddingLeft: 0, 
                        paddingRight: 0
                    }} 
                    sx={{
                        bgcolor: '#FDFFC2',
                        
                    }} 
                >
                    <NavBar />  
                    <Container maxWidth="sm" style={{paddingLeft: 0, paddingRight: 0}} sx={{bgcolor: '#FDFFC2', minHeight: '92vh'}}>
                        <Grid
                            container
                            direction="row"
                            sx ={{
                                height: '100%',
                                minHeight: '92vh',
                                width: '100%'
                            }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box sx={{width: '100%', mt: 5, mb: 5}}>
                                {children}
                            </Box>
                        </Grid>
                    </Container>
                </Container>
            </Container>
        </>
    );
}

export default Template1;