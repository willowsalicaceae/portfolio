import React from 'react';
import { Box, Typography, Link } from '@mui/joy';
import AnimatedWillow from '../components/AnimatedWillow';

const Home = ({ onCategoryClick, animationsEnabled }) => {
  return (
    <Box sx={{ 
      py: 4,
      minHeight: '75vh',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center'
    }}>
      <Box>
        <Typography level="h1" sx={{ 
          mb: 1,
          fontSize: { xs: '5rem', md: '7rem' },
          lineHeight: 1,
        }}>
          Hi, I'm
        </Typography>
        <Typography 
          level="h1" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '5rem', md: '7rem' },
            lineHeight: 1,
            color: 'primary.solidBg',
            fontFamily: animationsEnabled ? 'inherit' : "'Borel', cursive",
            display: 'flex',
            alignItems: 'center',
            height: { xs: '5rem', md: '7rem' }, // Match with font size
          }}
        >
          {animationsEnabled ? (
            <AnimatedWillow />
          ) : (
            "Willow"
          )}
        </Typography>
        <Typography level="h2" sx={{ 
          fontSize: { xs: '1.25rem', md: '1.75rem' }
        }}>
          I specialize in{' '}
          <Link 
            component="button"
            onClick={() => onCategoryClick('Video Editing')}
            sx={{ cursor: 'pointer' }}
          >
            Video Editing
          </Link>
          {' '}and{' '}
          <Link 
            component="button"
            onClick={() => onCategoryClick('Web Development')}
            sx={{ cursor: 'pointer' }}
          >
            Web Development
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;