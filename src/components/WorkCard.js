import React, { useState } from 'react';
import { Card, CardCover, CardContent, Typography, Stack, Skeleton } from '@mui/joy';
import PropTypes from 'prop-types';
import SoftwareIcon from './SoftwareIcon';

const WorkCard = React.memo(({ work, animatedThumbnails, onWorkClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  // For debugging - log the attempted image path
  const imagePath = `/images/thumbnails/${work.id}.jpg`;
  console.log('Attempting to load image:', imagePath);

  return (
    <Card
      onClick={() => onWorkClick(work)}
      variant='outlined'
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
            src={`${process.env.PUBLIC_URL}/videos/${work.id}.mp4`}
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
            onLoadedData={() => setIsLoading(false)}
            onError={(e) => {
              console.error('Video load error:', e);
              setIsLoading(false);
            }}
          />
        ) : (
          <img
            src={imagePath}
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
            onLoad={() => setIsLoading(false)}
            onError={(e) => {
              console.error('Image load error:', e);
              setIsLoading(false);
            }}
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
            <SoftwareIcon key={sw} name={sw} sx={{ width: 24, height: 24 }} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
});

WorkCard.propTypes = {
  work: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    software: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasVideo: PropTypes.bool.isRequired,
  }).isRequired,
  animatedThumbnails: PropTypes.bool.isRequired,
  onWorkClick: PropTypes.func.isRequired,
};

export default WorkCard;