import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/joy';
import portfolioData from '../data/portfolioData';

const WorkDetails = () => {
  const { id } = useParams();
  const work = portfolioData.find((work) => work.id === id);

  if (!work) {
    return <Typography>Work not found</Typography>;
  }

  return (
    <Box>
      <Typography level="h1">{work.title}</Typography>
      <Typography level="h2">{work.subtitle}</Typography>
      <img src={`/images/thumbnails/${work.id}.jpg`} alt={work.title} />
      <Typography>Date: {work.date}</Typography>
      <Typography>URL: {work.url}</Typography>
      <Typography>Description: {work.description}</Typography>
      <Typography>Tags: {work.tags.join(', ')}</Typography>
      <Typography>Software: {work.software.join(', ')}</Typography>
    </Box>
  );
};

export default WorkDetails;