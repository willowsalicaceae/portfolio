import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/joy';
import { Link } from 'react-router-dom';
import TypewriterEffect from '../components/TypewriterEffect';
import WorkPreview from '../components/WorkPreview';

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('Video Editing');
  const [typingComplete, setTypingComplete] = useState(false);
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
      setShowWorks(true);
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
    <Grid container spacing={4}>
      <Grid xs={12} md={6}>
        <Box sx={{ p: 4 }}>
          <TypewriterEffect 
            lines={lines} 
            onComplete={() => setTypingComplete(true)} 
          />
          <Box sx={{ mt: 4 }}>
            {categories.map((category, index) => (
              <Typography
                key={category}
                level="h3"
                component={Link}
                to={`/work?tag=${encodeURIComponent(category)}`}
                sx={{
                  display: 'block',
                  color: selectedCategory === category ? 'primary.main' : 'text.primary',
                  textDecoration: 'none',
                  mt: 2,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  opacity: typingComplete ? 1 : 0,
                  transition: 'opacity 0.5s, color 0.3s, text-decoration 0.3s',
                  transitionDelay: `${index * 0.2 + 0.5}s`,
                  '&:hover': { 
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
                onMouseEnter={() => handleCategoryChange(category)}
              >
                {category}
              </Typography>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} md={6}>
        {showWorks && <WorkPreview workIds={workPreviews[selectedCategory]} />}
      </Grid>
    </Grid>
  );
};

export default About;