import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../components/NavBar/NavBar';
import {useHoldsBackgroundContext} from '../context/HoldsBackgroundContext';


const Template2 = ({children}) => {

    const {holdSVGs} = useHoldsBackgroundContext();


    return (
        <>
            <div style={{position: 'relative', overflow: 'hidden', width: '100vw', height: '100vh'}}>
                {holdSVGs}
                <Container maxWidth="100vw" style={{paddingLeft: 0, paddingRight: 0}} sx={{bgcolor: '#feffde'}}>

                    <Container maxWidth="lg" style={{
                            paddingLeft: 0, 
                            paddingRight: 0
                        }} 
                        sx={{
                            bgcolor: '#FDFFC2',
                            
                        }} 
                    >
                        <Box sx={{ opacity: 0.95, zIndex: 0}}>
                            <NavBar /> 
                        </Box>  
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
                                <Box sx={{width: '100%', zIndex: 0}}>
                                    {children}
                                </Box>
                            </Grid>
                        </Container>
                    </Container>
                </Container>
            </div>
        </>
    );
}

export default Template2;