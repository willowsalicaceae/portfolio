import React from 'react';
import { Box, Card, CardCover, Typography } from '@mui/joy';
import portfolioData from '../data/portfolioData';

const WorkPreview = ({ workIds }) => {
  const gap = 16;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: `${gap}px`,
        width: '100%',
        maxWidth: '600px',
      }}
    >
      {workIds.map((workId, index) => {
        const work = portfolioData.find(w => w.id === workId.id);
        if (!work) return null;
       
        return (
          <Box
            key={work.id}
            sx={{
              gridColumn: workId.size === 2 ? 'span 2' : 'span 1',
              aspectRatio: '1 / 1',
              opacity: 0,
              animation: 'fadeIn 0.5s forwards',
              animationDelay: `${index * 0.1}s`,
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
            }}
          >
            <Card
              sx={{
                width: '100%',
                height: '100%',
                textDecoration: 'none',
              }}
            >
              <CardCover>
                <img
                  src={`/images/thumbnails/${work.id}.jpg`}
                  alt={work.title}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  level="title-lg"
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                  }}
                >
                  {work.title}
                </Typography>
              </CardCover>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export default WorkPreview;