import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import { useLocation } from 'react-router-dom';
import WorkForm from '../components/WorkForm';
import WorkList from '../components/WorkList';
import WorkControls from '../components/WorkControls';
import portfolioData from '../data/portfolioData';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [sortBy, setSortBy] = useState('relevancy');
  const [selectedTag, setSelectedTag] = useState('');
  const location = useLocation();

  useEffect(() => {
    setWorks(portfolioData);
    const params = new URLSearchParams(location.search);
    const tagFromUrl = params.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [location]);

  const handleAddWork = (newWorks) => {
    setWorks(newWorks);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
  };

  const sortedAndFilteredWorks = works
    .filter((work) => selectedTag === '' || work.tags.includes(selectedTag))
    .sort((a, b) => {
      if (sortBy === 'relevancy') {
        return b.relevancy - a.relevancy;
      } else if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  const allTags = [...new Set(works.flatMap((work) => work.tags))];

  return (
    <Box>
      <Typography level="h1">My Work</Typography>
      <WorkForm onSubmit={handleAddWork} />
      <WorkControls
        sortBy={sortBy}
        onSortChange={handleSortChange}
        tags={allTags}
        selectedTag={selectedTag}
        onTagChange={handleTagChange}
      />
      <WorkList works={sortedAndFilteredWorks} />
    </Box>
  );
};

export default Work;