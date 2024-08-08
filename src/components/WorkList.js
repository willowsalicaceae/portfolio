import React from 'react';
import { Box, Grid } from '@mui/joy';
import WorkCard from './WorkCard';

const WorkList = ({ works, animatedThumbnails, onWorkClick }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {works.map((work) => (
          <Grid key={work.id} xs={12} sm={6} md={4}>
            <WorkCard 
              work={work} 
              animatedThumbnails={animatedThumbnails} 
              onWorkClick={onWorkClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkList;