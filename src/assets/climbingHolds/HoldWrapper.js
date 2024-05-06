import React from 'react';

const Hold1 = ({ width = '100%', height = '100%', color = 'black', orientation = '0', position = 'static', top = 'auto', left = 'auto' }) => (
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
            left: left
        }} 
        viewBox="14.43 6.85 19.22 18.91"
    >
        <g>
            <path 
                fill={color}
                d="M28.7,25.7c6.67,0.72,4.66-4.82,4.66-4.82c-1.04-3.21-0.64-6.51-0.64-6.51C32.88,4.65,23,7.14,23,7.14c-2.03,0.33-3.69,1.17-4.89,1.99c-1.52,1.03-2.64,2.55-3.19,4.3C11.32,24.92,28.7,25.7,28.7,25.7z M24.04,15.1c0.67,0,1.21,0.54,1.21,1.21c0,0.67-0.54,1.21-1.21,1.21c-0.67,0-1.21-0.54-1.21-1.21C22.83,15.64,23.37,15.1,24.04,15.1z"
            />
        </g>
    </svg>
);

export default Hold1;