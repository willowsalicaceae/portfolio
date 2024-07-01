import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

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
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  console.log(pathname)
  return (
    <Box
      sx={[
        {
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
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          <Button
            variant="plain"
            color="neutral"
            aria-pressed={pathname === '/'}
            component={Link}
            to="/"
            size="sm"
            sx={{ alignSelf: 'center' }}
          >
            About
          </Button>
          <Button
            variant="plain"
            color="neutral"
            aria-pressed={pathname === '/work/'}
            component={Link}
            to="/work/"
            size="sm"
            sx={{ alignSelf: 'center' }}
          >
            Work
          </Button>
          <Button
            variant="plain"
            color="neutral"
            aria-pressed={pathname === '/contact/'}
            component={Link}
            to="/contact/"
            size="sm"
            sx={{ alignSelf: 'center' }}
          >
            Contact
          </Button>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
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
    </Box>
  );
}