import React, { useRef, useState } from 'react';
import { CssVarsProvider, CssBaseline, Box } from '@mui/joy';
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
            alignItems: 'center',
            px: 4,
            maxWidth: 'lg',
            mx: 'auto',
            width: '100%',
          }}>
            <Home onCategoryClick={handleCategoryClick} animationsEnabled={animationsEnabled} />
          </Box>
          <Box id="work" ref={workRef} sx={{
            px: 4,
            maxWidth: 'xl',
            mx: 'auto',
            width: '100%',
          }}>
            <Work 
              initialSelectedTag={selectedTag} 
              animationsEnabled={animationsEnabled}
              onAnimationsToggle={handleAnimationsToggle}
            />
          </Box>
          <Box id="contact" ref={contactRef} sx={{
            px: 4,
            maxWidth: 'lg',
            mx: 'auto',
            width: '100%',
          }}>
            <Contact />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default App;