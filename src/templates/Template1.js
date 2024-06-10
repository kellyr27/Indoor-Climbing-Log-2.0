import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../components/NavBar/NavBar';
import {useHoldsBackgroundContext} from '../context/HoldsBackgroundContext';

const Template1 = ({children}) => {

    const {holdSVGs} = useHoldsBackgroundContext();

    return (
        <>
            <div style={{position: 'relative', overflow: 'hidden', width: '100vw', height: '100vh', backgroundColor: '#feffde'}}>

                {holdSVGs}
                <Container maxWidth="100vw" style={{paddingLeft: 0, paddingRight: 0}} >
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
                                <Box sx={{width: '100%',  mt: 5, mb: 5, zIndex: 0, overflow: 'auto', maxHeight: '80vh'}}>
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

export default Template1;