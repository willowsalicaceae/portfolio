import React, { useRef, useState, Suspense, lazy } from 'react';
import { CssVarsProvider, CssBaseline, Box } from '@mui/joy';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import theme from './theme';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));

const App = () => {
  const homeRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const [selectedTag, setSelectedTag] = useState('');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const scrollTo = (ref) => {
    if (ref === homeRef) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      <ErrorBoundary>
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
            <Suspense fallback={<div></div>}>
              <Box id="home" ref={homeRef} sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                px: 4,
                maxWidth: 'lg',
                mx: 'auto',
                width: '100%',
              }}>
                <Home
                  onCategoryClick={handleCategoryClick}
                  animationsEnabled={animationsEnabled}
                  scrollTo={scrollTo}
                  workRef={workRef}
                />
              </Box>
              <Box id="work" ref={workRef} sx={{
                px: { xs: 2, sm: 3, md: 4 },
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
                px: { xs: 2, sm: 3, md: 4 },
                maxWidth: 'lg',
                mx: 'auto',
                width: '100%',
              }}>
                <Contact />
              </Box>
            </Suspense>
          </Box>
        </Box>
      </ErrorBoundary>
    </CssVarsProvider>
  );
};

export default App;