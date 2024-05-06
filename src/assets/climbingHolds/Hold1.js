import React from 'react';

const HoldSVGData = [
    {
        // 16
        viewBox: "82.27 31.03 9.6 15.78",
        d: "M82.88,43.02c-0.61,1.07,0.08,1.59,0.08,1.59c1.71,1.85,3.33,2.16,4.33,2.2c0.53,0.02,1.03-0.19,1.49-0.44   c3.1-1.7,3.09-7.11,3.09-7.11c0.11-4.04-3.05-7.51-3.05-7.51c-0.66-0.86-1.38-0.71-1.38-0.71c-2.79,0.2-4.12,2.15-4.12,2.15   c-0.55,0.63-0.29,1.21-0.23,1.56c0.25,1.57-0.1,2.46-0.57,3.09c-0.52,0.7-0.09,1.16,0.11,1.5C83.89,41.56,82.88,43.02,82.88,43.02z    M87.06,38.4c0.67,0,1.21,0.54,1.21,1.21s-0.54,1.21-1.21,1.21c-0.67,0-1.21-0.54-1.21-1.21S86.39,38.4,87.06,38.4z"
    },
    {
        // 4
        viewBox: "60.85 22.82 20.92 23.68",
        d: "M61.24,41.13c-1.18,3.47,0.7,3.96,0.7,3.96l2.22,1c2.03,1.35,4.45-1.11,4.45-1.11c8.59-9.1,12.01-17.46,12.01-17.46c3.8-7.12-3-4.04-3-4.04C63.69,29.11,61.24,41.13,61.24,41.13z M71.31,33.44c0.67,0,1.21,0.54,1.21,1.21s-0.54,1.21-1.21,1.21c-0.67,0-1.21-0.54-1.21-1.21S70.65,33.44,71.31,33.44z"
    },
    {
        // 3
        viewBox: "60.85 8.17 13.64 13.41",
        d: "M62.3,16.11c0,0,3.36,0.83,4.28,4.09c0.24,0.86,1.22,2.28,3.53,0.57c0,0,2.73-1.88,3.9-5.86c0.35-1.19,0.79-2.87,0.17-5.07c0,0-0.45-2.31-3.32-1.5c0,0-7.39,1.96-9.64,5.36C60.86,14.25,60.26,15.52,62.3,16.11z M69.28,12.46c0.67,0,1.21,0.54,1.21,1.21s-0.54,1.21-1.21,1.21s-1.21-0.54-1.21-1.21S68.61,12.46,69.28,12.46z"
    },
    {
        // 2
        viewBox: "35.95 10.13 25.16 18.4",
        d: "M42.55,25.48c3.37,3.11,7.31,3.05,7.31,3.05c4.82,0.01,9.08-3.62,9.08-3.62c4.18-3.94,1.27-4.92,0-5.22c-3.33-0.78-4.42-1.45-5.46-3.7c-1.39-2.99-3.38-4.04-4.63-4.41c-1.34-0.39-4.04-1.06-4.04-1.06c-7.47-1.61-8.52,2.25-8.52,2.25C34.19,19.21,42.55,25.48,42.55,25.48z M47.76,19.34c0.67,0,1.21,0.54,1.21,1.21s-0.54,1.21-1.21,1.21s-1.21-0.54-1.21-1.21S47.1,19.34,47.76,19.34z"
    },
    {
        // 1
        viewBox: "14.43 6.85 19.22 18.91",
        d: "M28.7,25.7c6.67,0.72,4.66-4.82,4.66-4.82c-1.04-3.21-0.64-6.51-0.64-6.51C32.88,4.65,23,7.14,23,7.14c-2.03,0.33-3.69,1.17-4.89,1.99c-1.52,1.03-2.64,2.55-3.19,4.3C11.32,24.92,28.7,25.7,28.7,25.7z M24.04,15.1c0.67,0,1.21,0.54,1.21,1.21c0,0.67-0.54,1.21-1.21,1.21c-0.67,0-1.21-0.54-1.21-1.21C22.83,15.64,23.37,15.1,24.04,15.1z"
    },
    {
        // 15
        viewBox: "80.62 60.1 10.45 9.28",
        d: "M90.08,62.1c-0.7-2.07-1.55-1.99-1.55-1.99c-0.9-0.12-1.5,0.98-1.5,0.98c-2.56,3.64-4.97,5.45-4.97,5.45c-1.21,0.91-1.26,1.27-1.26,1.27c-0.74,1.47,1.1,1.57,1.1,1.57c4.54,0.05,7.86-1.35,7.86-1.35c1.38-0.48,1.29-1.51,1.29-1.51C91.28,64.61,90.08,62.1,90.08,62.1z M88.5,66.32c-0.37,0.56-1.12,0.71-1.67,0.34c-0.56-0.37-0.71-1.12-0.34-1.67s1.12-0.71,1.67-0.34C88.72,65.02,88.87,65.77,88.5,66.32z"
    },
    {
        // 14
        viewBox: "67.67 73 18.28 15.8",
        d: "M84.54,76.13c-1.26-1.1-4.62-2.4-6.28-2.89c-3.23-0.96-5.22,1.26-5.22,1.26c-1.68,1.9-2.53,4.08-2.78,5.63c-0.24,1.5-1.52,2.67-1.52,2.67c-1.68,1.37-0.88,2.67-0.88,2.67c0.42,0.89,0.94,1.62,1.34,2.12c0.63,0.8,1.61,1.3,2.63,1.19c0.85-0.09,1.1-0.33,1.44-0.49c1.26-0.58,2.36-0.57,2.36-0.57s2.97-0.08,3.94-0.18c1.99-0.22,3.9-2.48,3.9-2.48c1.72-2.65,2.25-4.45,2.25-4.45C86.63,77.88,84.54,76.13,84.54,76.13z M78.45,80.32c-0.17,0.64-0.84,1.03-1.48,0.85c-0.64-0.17-1.03-0.84-0.85-1.48s0.84-1.03,1.48-0.85C78.25,79.01,78.63,79.67,78.45,80.32z"
    },
    {
        // 13
        viewBox: "29.3 79.42 25.52 13.73",
        d: "M53.99,80.17c-6.27-3.03-17.23,4.11-17.23,4.11c-1.33,1.05-2.57-0.18-2.57-0.18c-1.33-1.21-2.97-0.34-2.97-0.34c-2.21,1.35-1.91,4.38-1.91,4.38c0.15,5.57,5.5,4.37,5.5,4.37c3.79-0.88,6.21,0.23,6.21,0.23c2.29,0.64,3.91,0.39,4.67,0.19c0.29-0.08,0.56-0.19,0.82-0.33c2.98-1.64,3.68-3.99,4.4-5.62c1.1-2.5,2.38-3.65,3.41-4.66C55.6,81.06,53.99,80.17,53.99,80.17z M45.45,87.89c-0.17,0.64-0.84,1.03-1.48,0.85c-0.64-0.17-1.03-0.84-0.85-1.48c0.17-0.64,0.84-1.03,1.48-0.85S45.62,87.24,45.45,87.89z"
    },
    {
        // 12
        viewBox: "58.27 71.87 8.54 9.97",
        d: "M64.31,72.28c-2.1,1.91-3.17,0.23-4.11-0.19c-1.6-0.7-1.9,1.68-1.9,1.68c-0.21,1.64,0.6,4.5,0.6,4.5c0.82,3.28,3.09,3.5,3.09,3.5c1.44,0.38,2.11-1.03,2.11-1.03c1.02-1.73,1.88-4.48,2.44-6C67.56,72,65.37,71.32,64.31,72.28z M62.9,78.26c-0.37,0.56-1.12,0.71-1.67,0.34c-0.56-0.37-0.71-1.12-0.34-1.67c0.37-0.56,1.12-0.71,1.67-0.34C63.12,76.95,63.27,77.7,62.9,78.26z"
    },
    {
        // 11
        viewBox: "11.23 61.73 20.13 21.85",
        d: "M30.73,76.48c0,0-6.42-4.2-9.31-11c0,0-1.08-2.34-1.27-3.04c0,0-0.12-1.32-1.66-0.36c0,0-4.49,2.17-6.45,3.74c0,0-1.03,0.79-0.76,2.3c0,0,1.21,9.17,1.34,11.85c0.02,0.37,0.05,0.98,0.84,1.38c0,0,2.31,1.16,3.29,1.97c0,0,0.6,0.5,1.43,0.11c0,0,6.04-1.76,12.41-5.29C30.58,78.14,32.24,77.56,30.73,76.48z M18.59,75.95c-0.17,0.64-0.84,1.03-1.48,0.85c-0.64-0.17-1.03-0.84-0.85-1.48c0.17-0.64,0.84-1.03,1.48-0.85C18.38,74.65,18.76,75.31,18.59,75.95z"
    },
    {
        // 10
        viewBox: "40.59 61.62 11.9 15.52",
        d: "M41.46,76.2c1.48,1.59,3.22,0.88,4.16,0c0.85-0.8,1.03-1.2,1.36-1.61c1.18-1.42,2.23-1.55,3.14-1.69c2.46-0.37,2.38-2.83,2.36-3.94c-0.11-4.7-1.72-6.63-1.72-6.63c-1.18-1.39-2.95-0.4-3.68,0.16c-5.75,4.44-6.21,8.06-6.21,8.06C40.26,73.36,40.71,75.39,41.46,76.2z M46.6,69.07c0.17-0.64,0.84-1.03,1.48-0.85c0.64,0.17,1.03,0.84,0.85,1.48c-0.17,0.64-0.84,1.03-1.48,0.85C46.8,70.38,46.42,69.71,46.6,69.07z"
    },
    {
        // 7
        viewBox: "16.98 31.3 10.33 10.82",
        d: "M26.5,40.92c1.4-1.62,0.56-3.34,0.56-3.34c-0.5-1.22-3.28-5.29-3.28-5.29c-1.05-1.64-2.99-0.74-2.99-0.74c-1,0.33-2.91,2.35-2.91,2.35c-1.34,1.41-0.94,2.82-0.39,3.51c1.49,1.84,5.17,4.23,5.17,4.23C24.8,43.06,26.5,40.92,26.5,40.92z M22.5,37.92c-0.67,0-1.21-0.54-1.21-1.21s0.54-1.21,1.21-1.21s1.21,0.54,1.21,1.21S23.17,37.92,22.5,37.92z"
    },
    {
        // 8
        viewBox: "22.81 47.78 20 16.12",
        d: "M38.39,56.55c-6.47-2.04-7.62-3.73-9.54-5.75c-2.01-2.11-2.91-2.52-2.91-2.52c-3-1.74-3.06,1.6-3.06,1.6c-0.41,3.63,1.25,8.88,1.25,8.88c1.58,4.5,5.72,4.89,5.72,4.89c7.1,1.16,11.07-1.97,12.59-3.5C44.34,58.25,38.39,56.55,38.39,56.55z M31.36,58.1c-0.17,0.64-0.84,1.03-1.48,0.85c-0.64-0.17-1.03-0.84-0.85-1.48c0.17-0.64,0.84-1.03,1.48-0.85C31.16,56.79,31.54,57.46,31.36,58.1z"
    },
    {
        // 5
        viewBox: "33.65 28.54 21.19 28.25",
        d: "M52.65,34.5c-0.75-0.23-1.77-0.36-3.13-0.18c0,0-4.81,0.4-7.25-2.69c0,0-4.55-5.45-7.61-1.88c0,0-2.72,2.38,0.77,8.28c0,0,1.22,2.17,2.19,3.69c0.54,0.85,1.52,2.69,0.54,4c0,0-2.3,3.92,2.36,5.88c0,0,2.4,0.78,5.11,3.44c1.88,1.84,5.97,3.19,7.44-1.11c0,0,0.46-2.75-1.54-5.15c0,0-3.07-4.52,0.65-7.57c0,0,2.36-1.3,2.64-3.49C54.99,36.29,54.02,34.92,52.65,34.5z M44.24,41.36c-0.67,0-1.21-0.54-1.21-1.21s0.54-1.21,1.21-1.21c0.67,0,1.21,0.54,1.21,1.21S44.9,41.36,44.24,41.36z"
    },
    {
        // 6
        viewBox: "58.7 47.79 21.35 19.61",
        d: "M76.51,62.51c1.41-1.5,1.76-3.55,1.76-3.55c0.24-2.72,1.21-4.46,1.21-4.46c1.43-2.55-0.22-4.09-0.67-4.46c-5.25-4.31-13.16-1.11-13.16-1.11c-9.72,4.23-6.4,14.25-6.4,14.25s0.49,1.88,0.72,2.48c1.47,3.69,7.49,0.36,7.49,0.36c3.54-1.41,5.66-1.99,6.68-2.21C75.03,63.61,75.88,63.18,76.51,62.51z M68.78,57.59c-0.67,0-1.21-0.54-1.21-1.21s0.54-1.21,1.21-1.21c0.67,0,1.21,0.54,1.21,1.21S69.44,57.59,68.78,57.59z"

    },
    {
        // 9
        viewBox: "8.13 40.8 10.04 16.05",
        d: "M13.26,55.69c0.67,1.98,2.4,0.92,2.85,0.49c3.69-3.43,1.31-9.86,1.31-9.86c-2.39-6.13-5.4-5.5-5.4-5.5c-1.09,0.14-1.22,1.42-1.22,2.04c0,2.61-0.8,2.96-1.51,3.64c-1.02,0.98-1.14,2.74-1.14,2.74C7.87,51.81,10.81,53,10.81,53C12.56,53.63,12.97,54.83,13.26,55.69z M11.18,49.26c0-0.67,0.54-1.21,1.21-1.21s1.21,0.54,1.21,1.21s-0.54,1.21-1.21,1.21S11.18,49.92,11.18,49.26z"
    }
]


const HoldSVG = ({ width = '100%', height = '100%', color = 'black', orientation = '0', position = 'static', top = 'auto', left = 'auto', holdIndex = 1 }) => {

    return (
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
            viewBox={HoldSVGData[holdIndex].viewBox}
        >
            <g>
                <path 
                    fill={color}
                    d={HoldSVGData[holdIndex].d}
                />
            </g>
        </svg>
    );
};

export default HoldSVG;