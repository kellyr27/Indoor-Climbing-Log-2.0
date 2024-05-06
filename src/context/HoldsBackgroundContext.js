import React, {createContext, useState, useEffect, useContext} from 'react'
import HoldSVG from '../assets/climbingHolds/Hold1'

const HoldsBackgroundContext = createContext()

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




const HoldsBackgroundProvider = ({children}) => {

        const [holdSVGs, setHoldSVGs] = useState([]);

        useEffect(() => {
            const holdCoords = getRandomCoordinates(60);

            const newHoldSVGs = holdCoords.map((coord, index) => {
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
                        zIndex={-1}
                    />
                );
            })
        
            setHoldSVGs(newHoldSVGs);        
        }, []);

    return (
        <HoldsBackgroundContext.Provider value={{
            holdSVGs
        }}>
            {children}
        </HoldsBackgroundContext.Provider>
    )
}

const useHoldsBackgroundContext = () => {
    return useContext(HoldsBackgroundContext)
}

export {
    HoldsBackgroundProvider,
    useHoldsBackgroundContext
}
