import React, { useState } from 'react';
import { Card, CardCover, CardContent, Typography, Stack, Skeleton, Tooltip, useTheme } from '@mui/joy';

const WorkCard = ({ work, animatedThumbnails, onWorkClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  const handleMediaLoaded = () => {
    setIsLoading(false);
  };

  return (
    <Card
      onClick={() => onWorkClick(work)}
      variant={theme.breakpoints.down('sm') ? 'plain' : 'outlined'}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '--Card-padding': { xs: 0, sm: 'var(--Card-padding)' },
        '&:hover .overlay': {
          opacity: { xs: 0, sm: 1 },
        },
        '&:hover .card-content': {
          opacity: 1,
        },
      }}
    >
      <CardCover sx={{ position: 'relative', overflow: 'hidden', pt: '56.25%' }}>
        {isLoading && (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
          />
        )}
        {animatedThumbnails && work.hasVideo ? (
          <video
            src={`/videos/${work.id}.mp4`}
            loop
            muted
            autoPlay
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isLoading ? 'none' : 'block',
            }}
            onLoadedData={handleMediaLoaded}
          />
        ) : (
          <img
            src={`/images/thumbnails/${work.id}.jpg`}
            srcSet={`/images/thumbnails/${work.id}.jpg 2x`}
            loading="lazy"
            alt={work.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isLoading ? 'none' : 'block',
            }}
            onLoad={handleMediaLoaded}
          />
        )}
      </CardCover>
      <CardCover
        className="overlay"
        sx={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
          opacity: 0,
          transition: 'opacity 0.3s',
          display: { xs: 'none', sm: 'block' },
        }}
      />
      <CardContent
        className="card-content"
        sx={{
          position: { xs: 'static', sm: 'absolute' },
          bottom: 0,
          left: 0,
          right: 0,
          pt: { xs: 0, sm: 2 },
          px: 2,
          pb: 2,
          color: { xs: 'text.primary', sm: 'common.white' },
          opacity: { xs: 1, sm: 0 },
          transition: 'opacity 0.3s',
          '& .MuiTypography-root': {
            color: 'inherit',
          },
        }}
      >
        <Typography level="h3">{work.title}</Typography>
        <Typography level="body2">{work.subtitle}</Typography>
        <Stack direction="row" spacing={1} mt={1}>
          {work.software.map((sw) => (
            <Tooltip key={sw} title={sw} variant="outlined">
              <img
                src={`/icons/${sw}.svg`}
                alt={sw}
                style={{ width: '24px', height: '24px' }}
              />
            </Tooltip>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WorkCard;