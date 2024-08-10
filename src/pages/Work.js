import { useState, useEffect } from 'react';
import { Box, Typography, Modal, ModalDialog, ModalClose } from '@mui/joy';
import WorkList from '../components/WorkList';
import WorkControls from '../components/WorkControls';
import WorkDetails from './WorkDetails';
import portfolioData from '../data/portfolioData';
import WorkForm from '../components/WorkForm';

const Work = ({ initialSelectedTag, animationsEnabled, onAnimationsToggle }) => {
  const [works, setWorks] = useState([]);
  const [sortBy, setSortBy] = useState('relevancy');
  const [selectedTag, setSelectedTag] = useState(initialSelectedTag || '');
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    setWorks(portfolioData);
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
    <Box sx={{ pt: 10 }}>
      <Typography level="h1" sx={{ mb: 2 }}>My Work</Typography>
      {/* <WorkForm onSubmit={(newWorks) => setWorks([...works, ...newWorks])} /> */}
      <WorkControls
        sortBy={sortBy}
        onSortChange={handleSortChange}
        tags={allTags}
        selectedTag={selectedTag}
        onTagChange={handleTagChange}
        animationsEnabled={animationsEnabled}
        onAnimationsToggle={onAnimationsToggle}
      />
      <WorkList 
        works={sortedAndFilteredWorks} 
        animatedThumbnails={animationsEnabled} 
        onWorkClick={handleWorkClick}
      />
      <Modal open={!!selectedWork} onClose={handleCloseModal}>
        <ModalDialog 
          sx={{ 
            maxWidth: 800, 
            width: '100%', 
            maxHeight: { xs: '100vh', sm: '90vh' },
            overflowY: 'auto'
          }}
        >
          <ModalClose />
          {selectedWork && <WorkDetails work={selectedWork} />}
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Work;