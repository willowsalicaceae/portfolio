import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container } from '@mui/joy';
import TypewriterEffect from '../components/TypewriterEffect';
import WorkPreview from '../components/WorkPreview';

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('Video Editing');
  const [typingComplete, setTypingComplete] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showWorks, setShowWorks] = useState(false);
  const categories = ['Video Editing', 'Web Development'];

  const lines = [
    "Hi!",
    "I'm Willow Frazey.",
    "I do..."
  ];

  const workPreviews = {
    'Video Editing': [
      { id: 'cornerofmyeyeradioedit', size: 2 },
      { id: 'onenightout', size: 1 },
      { id: 'falsepermanence', size: 1 },
      { id: 'realtalkepisode32', size: 2 },
      { id: 'cornerofmyeye', size: 2 },
    ],
    'Web Development': [
      { id: 'chatbotcemetery', size: 2 },
      { id: 'weatherheatmap', size: 1 },
      { id: 'covid67', size: 1 },
      { id: 'walkseattle', size: 2 },
    ],
  };

  useEffect(() => {
    if (typingComplete) {
      setShowCategories(true);
      setTimeout(() => setShowWorks(true), 1000); // Delay showing works
    }
  }, [typingComplete]);

  const handleCategoryChange = (category) => {
    setShowWorks(false);
    setTimeout(() => {
      setSelectedCategory(category);
      setShowWorks(true);
    }, 300);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', p: 4 }}>
          <Box>
            <TypewriterEffect 
              lines={lines} 
              onComplete={() => setTypingComplete(true)} 
            />
            <Box sx={{ mt: 4 }}>
              {categories.map((category, index) => (
                <Typography
                  key={category}
                  level="h1"
                  component="div"
                  onClick={() => handleCategoryChange(category)}
                  sx={{
                    display: 'block',
                    color: 'text.primary',
                    textDecoration: 'none',
                    mt: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 'bold',
                    opacity: showCategories ? 1 : 0,
                    transition: 'opacity 0.5s, color 0.3s, text-decoration-color 0.3s',
                    transitionDelay: `${index * 0.2}s`,
                    '&:hover': { 
                      color: 'primary.main',
                      textDecorationColor: 'rgba(var(--joy-palette-primary-mainChannel) / 1)',
                      cursor: 'pointer',
                    },
                    textDecorationLine: 'underline',
                    textDecorationColor: selectedCategory === category 
                      ? 'rgba(var(--joy-palette-primary-mainChannel) / 0.5)'
                      : 'transparent',
                    textUnderlineOffset: '0.1em',
                  }}
                >
                  {category}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
          {showWorks && <WorkPreview workIds={workPreviews[selectedCategory]} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;