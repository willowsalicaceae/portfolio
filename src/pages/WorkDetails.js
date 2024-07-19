import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardActions, Chip, Link, Stack, Grid, AspectRatio, Button } from '@mui/joy';
import OpenInNew from '@mui/icons-material/OpenInNew';
import portfolioData from '../data/portfolioData';

const WorkDetails = () => {
  const { id } = useParams();
  const work = portfolioData.find((work) => work.id === id);

  if (!work) {
    return <Typography>Work not found</Typography>;
  }

  const mainLink = work.links[0];
  const isYouTubeVideo = mainLink.url.includes('youtube.com') || mainLink.url.includes('youtu.be');
  const videoId = isYouTubeVideo ? mainLink.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0] : null;

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card variant="outlined">
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
              href={mainLink.url}
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

        <CardActions sx={{ 
          display: 'flex', 
          justifyContent: 'stretch', 
          gap: 2,
        }}>
          {work.links.map((link, index) => (
            <Button
              key={index}
              color="neutral"
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startDecorator={<OpenInNew />}
              sx={{ flexGrow: 1 }}
            >
              {link.name}
            </Button>
          ))}
        </CardActions>

        <CardContent>
          <Typography level="body-lg">
            {work.subtitle}
          </Typography>
          <Typography level="h2">
            {work.title}
          </Typography>
          <Typography level="body-sm">
            {work.date}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {work.description}
          </Typography>

          <Typography level="title-md" sx={{ mb: 1 }}>
            Tags:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
            {work.tags.map((tag) => (
              <Chip key={tag} size="sm" variant="soft">
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