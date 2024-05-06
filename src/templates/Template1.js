import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../components/NavBar/NavBar';
import HoldSVG from '../assets/climbingHolds/Hold1';
import { useState } from 'react';

function getRandomCoordinates(n) {
    const coordinates = [];
  
    for (let i = 0; i < n; i++) {
      const x = Math.random(); // Random x-coordinate within screen width
      const y = Math.random(); // Random y-coordinate within screen height
  
      coordinates.push([x, y]);
    }
  
    return coordinates;
}

function getRandomColor() {
    const popularColors = ['black', 'white', 'blue', 'red', 'gray', 'green', 'yellow', 'purple', 'orange', 'pink'];
    return popularColors[Math.floor(Math.random() * popularColors.length)];
}

function getRandomOrientation() {
    return Math.floor(Math.random() * 360);
}

const Template1 = ({children}) => {
    const [holdCoords, setHoldCoords] = useState(getRandomCoordinates(60));


    return (
        <>
            {holdCoords.map((coord, index) => {
            const randomPercentage = Math.random() * (6 - 5) + 5;                
                
                return (
                    <HoldSVG 
                        key={index} 
                        width={`${randomPercentage}%`}
                        height={`${randomPercentage}%`} 
                        color={getRandomColor()} 
                        orientation={getRandomOrientation()}
                        position='absolute' 
                        top={`${coord[1] * 100}vh`} 
                        left={`${coord[0] * 100}vw`} 
                        holdIndex={Math.floor(Math.random() * 16)}
                    />
                );
            })}
            <Container maxWidth="100vw" style={{paddingLeft: 0, paddingRight: 0}} sx={{bgcolor: '#feffde'}}>
                <Container maxWidth="lg" style={{
                        paddingLeft: 0, 
                        paddingRight: 0
                    }} 
                    sx={{
                        bgcolor: '#FDFFC2',
                        
                    }} 
                >
                    <Box sx={{ opacity: 0.9}}>
                        <NavBar /> 
                    </Box>  
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
                            <Box sx={{width: '100%', opacity: 0.85,  mt: 5, mb: 5}}>
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