import React from 'react';

const Hold3SVG = ({ width = '100%', height = '100%', color = 'black', orientation = '0', position = 'static', top = 'auto', left = 'auto' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        version="1.1" 
        x="0px" 
        y="0px" 
        style={{ 
            enableBackground: 'new 0 0 100 100', 
            transform: `rotate(${orientation}deg)`,
            width: width,
            height: height,
            position: position,
            top: top,
            left: left,
        }} 
        viewBox="60.85 8.17 13.64 13.41"
    >
        <g>
            <path 
                fill={color}
                d="M62.3,16.11c0,0,3.36,0.83,4.28,4.09c0.24,0.86,1.22,2.28,3.53,0.57c0,0,2.73-1.88,3.9-5.86c0.35-1.19,0.79-2.87,0.17-5.07c0,0-0.45-2.31-3.32-1.5c0,0-7.39,1.96-9.64,5.36C60.86,14.25,60.26,15.52,62.3,16.11z M69.28,12.46c0.67,0,1.21,0.54,1.21,1.21s-0.54,1.21-1.21,1.21s-1.21-0.54-1.21-1.21S68.61,12.46,69.28,12.46z"
            />
        </g>
    </svg>
);

export default Hold3SVG;