import React from 'react';
import { Box, Card, CardCover, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolioData';

const WorkPreview = ({ workIds }) => {
  const gap = 16; // 2 * 8px (theme's default spacing unit)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(6, 1fr)`,
        gap: `${gap}px`,
        p: 2
      }}
    >
      {workIds.map((workId, index) => {
        const work = portfolioData.find(w => w.id === workId.id);
        if (!work) return null;
       
        return (
          <Box
            key={work.id}
            sx={{
              gridColumn: workId.size === 2 ? 'span 4' : 'span 2',
              position: 'relative',
              '&::before': {
                content: '""',
                display: 'block',
                paddingTop: workId.size === 2 ? '50%' : '100%',
              },
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
              component={Link}
              to={`/work/${work.id}`}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
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