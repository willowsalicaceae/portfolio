import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Box, Grid, Typography, CssBaseline, CssVarsProvider } from '@mui/joy';
import Header from './components/Header';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import WorkDetails from './pages/WorkDetails';
import theme from './theme';

const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Box sx={{ px: 3, py: 2 }}>
          <Routes>
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<WorkDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<About />} />
          </Routes>
        </Box>
      </Router>
    </CssVarsProvider>
  );
};

export default App;