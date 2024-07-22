import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardCover, CardContent, Typography, Stack, Skeleton, Tooltip } from '@mui/joy';

const WorkCard = ({ work, animatedThumbnails }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleMediaLoaded = () => {
    setIsLoading(false);
  };

  return (
    <Link to={`/work/${work.id}`}>
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '50%',
          '&:hover .overlay': {
            opacity: 1,
          },
          '&:hover .card-content': {
            opacity: 1,
          },
        }}
      >
        <CardCover
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
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
                objectFit: 'cover',
                width: '100%',
                height: '100%',
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
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                display: isLoading ? 'none' : 'block',
              }}
              onLoad={handleMediaLoaded}
            />
          )}
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))',
              opacity: 0,
              transition: 'opacity 0.3s',
            }}
          />
        </CardCover>
        <CardContent
          className="card-content"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            opacity: 0,
            transition: 'opacity 0.3s',
            color: '#fff',
            padding: 2,
            '& .MuiTypography-root': {
              color: '#fff',
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
    </Link>
  );
};

const WorkList = ({ works, animatedThumbnails }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {works.map((work) => (
          <Grid key={work.id} xs={12} sm={6} md={4}>
            <WorkCard work={work} animatedThumbnails={animatedThumbnails} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkList;