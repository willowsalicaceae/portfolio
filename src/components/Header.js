import React, { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: 'center' }}
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light');
        }}
      >
        {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header({ scrollTo, homeRef, workRef, contactRef }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { mode, setMode } = useColorScheme();

  const handleMenuItemClick = (ref) => {
    scrollTo(ref);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', ref: homeRef },
    { name: 'Work', ref: workRef },
    { name: 'Contact', ref: contactRef },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <Box
      sx={{
        p: 2,
        gap: 2,
        bgcolor: 'background.surface',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1 / -1',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        transition: 'transform 0.3s',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'row', gap: 1.5, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="plain"
              color="neutral"
              onClick={() => scrollTo(item.ref)}
              size="sm"
            >
              {item.name}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center' }}>
          <Tooltip title="LinkedIn" variant="outlined">
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              component="a"
              href="https://www.linkedin.com/in/willowfrazey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub" variant="outlined">
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              component="a"
              href="https://github.com/willowsalicaceae"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <ColorSchemeToggle />
        </Box>
      </Box>
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        variant="outlined"
        size={null}
      >
        <Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name}>
                <ListItemButton onClick={() => handleMenuItemClick(item.ref)}>
                  <Typography>{item.name}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton component="a" href="https://www.linkedin.com/in/willowfrazey" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon sx={{ mr: 1 }} />
                <Typography>LinkedIn</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="https://github.com/willowsalicaceae" target="_blank" rel="noopener noreferrer">
                <GitHubIcon sx={{ mr: 1 }} />
                <Typography>GitHub</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
                setMobileMenuOpen(false);
              }}>
                {mode === 'light' ? <DarkModeRoundedIcon sx={{ mr: 1 }} /> : <LightModeRoundedIcon sx={{ mr: 1 }} />}
                <Typography>{mode === 'light' ? 'Dark' : 'Light'} Mode</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}