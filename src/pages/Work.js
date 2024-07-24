import { useState, useEffect } from 'react';
import { Box, Typography, Modal, ModalDialog } from '@mui/joy';
import WorkList from '../components/WorkList';
import WorkControls from '../components/WorkControls';
import WorkDetails from './WorkDetails';
import portfolioData from '../data/portfolioData';

const Work = ({ initialSelectedTag }) => {
  const [works, setWorks] = useState([]);
  const [sortBy, setSortBy] = useState('relevancy');
  const [selectedTag, setSelectedTag] = useState(initialSelectedTag || '');
  const [animatedThumbnails, setAnimatedThumbnails] = useState(true);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    setWorks(portfolioData);
    const savedAnimatedThumbnails = localStorage.getItem('animatedThumbnails');
    if (savedAnimatedThumbnails !== null) {
      setAnimatedThumbnails(JSON.parse(savedAnimatedThumbnails));
    }
  }, []);

  useEffect(() => {
    setSelectedTag(initialSelectedTag);
  }, [initialSelectedTag]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
  };

  const handleAnimatedThumbnailsChange = (event) => {
    const newValue = event.target.checked;
    setAnimatedThumbnails(newValue);
    localStorage.setItem('animatedThumbnails', JSON.stringify(newValue));
  };

  const handleWorkClick = (work) => {
    setSelectedWork(work);
  };

  const handleCloseModal = () => {
    setSelectedWork(null);
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
    <Box sx={{ py: 8 }}>
      <Typography level="h1" sx={{ mb: 4 }}>My Work</Typography>
      <WorkControls
        sortBy={sortBy}
        onSortChange={handleSortChange}
        tags={allTags}
        selectedTag={selectedTag}
        onTagChange={handleTagChange}
        animatedThumbnails={animatedThumbnails}
        onAnimatedThumbnailsChange={handleAnimatedThumbnailsChange}
      />
      <WorkList 
        works={sortedAndFilteredWorks} 
        animatedThumbnails={animatedThumbnails} 
        onWorkClick={handleWorkClick}
      />
      <Modal open={!!selectedWork} onClose={handleCloseModal}>
        <ModalDialog sx={{ maxWidth: 800, width: '100%' }}>
          {selectedWork && <WorkDetails work={selectedWork} />}
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Work;