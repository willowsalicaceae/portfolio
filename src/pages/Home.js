import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import AnimatedWillow from '../components/AnimatedWillow';
import TypewriterEffect from '../components/TypewriterEffect';
import TypewriterLinks from '../components/TypewriterLinks';

const Home = ({ onCategoryClick, animationsEnabled }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [animationsEnabled]);

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
    }}>
      <Box>
        <TypewriterEffect
          key={`intro-${key}`}
          text="Hi, I'm"
          delay={0}
          duration={250}
          animationsEnabled={animationsEnabled}
          typographyProps={{
            level: "h1",
            sx: {
              mb: { sm: 0, md: 2 },
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1,
              minHeight: '3.5rem',
            }
          }}
        />

        <Typography
          level="h1"
          sx={{
            mb: 1,
            fontSize: { xs: '5rem', md: '7rem' },
            lineHeight: 1,
            color: 'primary.solidBg',
            display: 'flex',
            alignItems: 'center',
            height: { xs: '5rem', md: '7rem' },
          }}
        >
          <AnimatedWillow key={`willow-${key}`} animate={animationsEnabled} delay={300} />
        </Typography>

        <Box sx={{
          minHeight: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          <TypewriterLinks
            key={`specialties-${key}`}
            text="I specialize in Video Editing and Web Development"
            links={[
              { word: 'Video Editing', onClick: () => onCategoryClick('Video Editing') },
              { word: 'Web Development', onClick: () => onCategoryClick('Web Development') }
            ]}
            delay={2000}
            duration={1500}
            animationsEnabled={animationsEnabled}
            onCategoryClick={onCategoryClick}
            typographyProps={{
              level: "h2",
              sx: {
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                lineHeight: 1.2,
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;