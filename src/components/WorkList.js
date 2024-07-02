import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardCover, CardContent, Typography, Stack } from '@mui/joy';

const WorkList = ({ works }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {works.map((work) => (
          <Grid key={work.id} xs={12} sm={6} md={4}>
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
                  <img
                    src={`/images/thumbnails/${work.id}.jpg`}
                    srcSet={`/images/thumbnails/${work.id}.jpg 2x`}
                    loading="lazy"
                    alt={work.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
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
                      <img
                        key={sw}
                        src={`/icons/${sw}.svg`}
                        alt={sw}
                        style={{ width: '24px', height: '24px' }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkList;