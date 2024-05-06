import React from 'react';

const Hold2SVG = ({ width = '100%', height = '100%', color = 'black', orientation = '0', position = 'static', top = 'auto', left = 'auto' }) => (
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
        viewBox="35.95 10.13 25.16 18.4"
    >
        <g>
            <path 
                fill={color}
                d="M42.55,25.48c3.37,3.11,7.31,3.05,7.31,3.05c4.82,0.01,9.08-3.62,9.08-3.62c4.18-3.94,1.27-4.92,0-5.22c-3.33-0.78-4.42-1.45-5.46-3.7c-1.39-2.99-3.38-4.04-4.63-4.41c-1.34-0.39-4.04-1.06-4.04-1.06c-7.47-1.61-8.52,2.25-8.52,2.25C34.19,19.21,42.55,25.48,42.55,25.48z M47.76,19.34c0.67,0,1.21,0.54,1.21,1.21s-0.54,1.21-1.21,1.21s-1.21-0.54-1.21-1.21S47.1,19.34,47.76,19.34z"
            />
        </g>
    </svg>
);

export default Hold2SVG;