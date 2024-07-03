import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardCover, Chip, Link, Stack, Grid, AspectRatio } from '@mui/joy';
import portfolioData from '../data/portfolioData';

const WorkDetails = () => {
  const { id } = useParams();
  const work = portfolioData.find((work) => work.id === id);

  if (!work) {
    return <Typography>Work not found</Typography>;
  }

  const isYouTubeVideo = work.url.includes('youtube.com') || work.url.includes('youtu.be');
  const videoId = isYouTubeVideo ? work.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0] : null;

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card variant="plain" size="lg">
        <AspectRatio ratio="16/9" sx={{
          borderRadius: 'sm',
          overflow: 'hidden',
          '& iframe': {
            border: 'none',
          }
        }}>
          {isYouTubeVideo ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0`}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Link
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              overlay
            >
              <img
                src={`/images/thumbnails/${work.id}.jpg`}
                srcSet={`/images/thumbnails/${work.id}.jpg 2x`}
                loading="lazy"
                alt={work.title}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Link>
          )}
        </AspectRatio>

        <CardContent>
          <Typography level="body-lg" sx={{ mb: 0 }}>
            {work.subtitle}
          </Typography>
          <Typography level="h2" sx={{ mb: 2 }}>
            {work.title}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid xs={12} sm={6}>
              <Typography level="title-md">Client/Project:</Typography>
              <Typography>{work.subtitle}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography level="title-md">Date:</Typography>
              <Typography>{work.date}</Typography>
            </Grid>
            <Grid xs={12}>
              <Typography level="title-md">Description:</Typography>
              <Typography>{work.description}</Typography>
            </Grid>
            <Grid xs={12}>
              <Typography level="title-md">Project Link:</Typography>
              <Link
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </Link>
            </Grid>
          </Grid>

          <Typography level="title-md" sx={{ mb: 1 }}>
            Tags:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
            {work.tags.map((tag) => (
              <Chip key={tag} size="lg" variant="soft">
                {tag}
              </Chip>
            ))}
          </Stack>

          <Typography level="title-md" sx={{ mb: 1 }}>
            Software Used:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
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
    </Box>
  );
};

export default WorkDetails;