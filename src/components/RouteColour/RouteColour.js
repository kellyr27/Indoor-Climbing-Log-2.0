

const RouteColour = ({ colour }) => {
    return (
        <div style={{ 
            backgroundColor: colour, 
            width: '20px', 
            height: '20px', 
            marginRight: '10px',
            border: '1px solid grey',
			borderRadius: '2px'
        }} />
    )
}

export default RouteColour;