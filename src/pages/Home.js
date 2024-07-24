import React from 'react';
import { Box, Typography, Link } from '@mui/joy';

const Home = ({ onCategoryClick }) => {
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
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}>
          Hi, I'm Willow Frazey
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