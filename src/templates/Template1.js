import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const Template1 = ({children}) => {
    return (

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
    );
}

export default Template1;