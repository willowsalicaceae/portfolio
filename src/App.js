import React, { useRef, useState } from 'react';
import { CssVarsProvider, CssBaseline, Box, Container } from '@mui/joy';
import Header from './components/Header';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import theme from './theme';

const App = () => {
  const homeRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const [selectedTag, setSelectedTag] = useState('');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (category) => {
    setSelectedTag(category);
    scrollTo(workRef);
  };

  const handleAnimationsToggle = (event) => {
    setAnimationsEnabled(event.target.checked);
  };

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.body',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header scrollTo={scrollTo} homeRef={homeRef} workRef={workRef} contactRef={contactRef} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Box id="home" ref={homeRef} sx={{ 
            minHeight: '75vh',
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <Container maxWidth="lg">
              <Home onCategoryClick={handleCategoryClick} animationsEnabled={animationsEnabled} />
            </Container>
          </Box>
          <Box id="work" ref={workRef}>
            <Container maxWidth="lg">
              <Work 
                initialSelectedTag={selectedTag} 
                animationsEnabled={animationsEnabled}
                onAnimationsToggle={handleAnimationsToggle}
              />
            </Container>
          </Box>
          <Box id="contact" ref={contactRef}>
            <Container maxWidth="lg">
              <Contact />
            </Container>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default App;