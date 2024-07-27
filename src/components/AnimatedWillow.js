import React from 'react';
import { Box, useTheme } from '@mui/joy';

const AnimatedWillow = ({ animate, delay = 0 }) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="svg"
        viewBox="180 200 1700 500"
        height="1em"
        sx={{
          display: 'inline-block',
          verticalAlign: 'bottom',
          overflow: 'visible',
          '& path': {
            fill: 'none',
            stroke: theme.vars.palette.primary.solidBg,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: '36px',
          },
        }}
      >
        <path className="W" d="M212.86,283.66c-1.61-18.45,31.62-43.39,76.51-43.39,121.7,0-14.79,175.45,1.24,358.6,1.61,18.45,17.29,32.42,27.28,32.42,90.28,0,233.13-354.9,233.13-370.91,0-5.99-.89-7.67-9-7.67-8.64,0-66.99,185.13-56.17,308.79,3.67,41.92,16.15,69.79,33.61,69.79,89.28,0,240.89-258.34,232.29-356.6-3.23-36.91-20.47-34.42-20.47-34.42"
          style={animate ? {
            strokeDasharray: 2000,
            strokeDashoffset: 2000,
            animation: `drawW 1s forwards ${delay}ms`,
          } : {}}
        />
        <path className="illow" d="M698.62,630.66s79.95-48.18,106.76-191.84c0,0-21.34,86.86-21.34,116.57,0,49.09-1.03,76.28,29.29,76.28,89.04,0,236.19-205.78,236.19-333.73,0-25.31-4.03-59.23-43.26-59.23-79.08,0-100.22,312.34-100.22,327.61,0,55.11,31.22,65.72,54.33,65.72,145.22,0,281.11-223.06,281.11-336.5,0-18.22-10.78-56.83-38.11-56.83-87.75,0-105.89,296.53-105.89,322.94,0,60.32,32.25,69.62,56.25,69.62,136.22,0,86.18-175.23,210.97-175.23,115.33,0,84.56,175.25-29.47,175.25-102.99,0-72.86-175.25,29.47-175.25,54.82,0,50.65,31.33,78.56,31.33,48.32,0,56.98-32.67,92.67-32.67,66.67,0-45.33,177.67,46.11,177.67,48,0,72.56-38.33,89.64-133.96,0,0-39.97,132.29,28.36,132.29s91-86.67,91-127,2-52-8.67-52-50.67,34.67,35.67,34.67"
          style={animate ? {
            strokeDasharray: 5000,
            strokeDashoffset: 5000,
            animation: `drawIllow 3s forwards ${delay + 750}ms`,
          } : {}}
        />
        <path className="dot" d="M820.14,352.72c0-.65.43-1.82,1.22-1.82"
          style={animate ? {
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: `drawDot 0.5s forwards ${delay + 2500}ms`,
          } : {}}
        />
        {animate && (
          <style>
            {`
              @keyframes drawW {
                to { stroke-dashoffset: 0; }
              }
              @keyframes drawIllow {
                to { stroke-dashoffset: 0; }
              }
              @keyframes drawDot {
                to { stroke-dashoffset: 0; }
              }
            `}
          </style>
        )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'transparent',
          userSelect: 'text',
          fontSize: 'inherit',
        }}
      >
        Willow
      </Box>
    </Box>
  );
};

export default AnimatedWillow;