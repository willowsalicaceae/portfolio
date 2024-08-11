import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Modal, ModalDialog, ModalClose } from '@mui/joy';
import WorkList from '../components/WorkList';
import WorkControls from '../components/WorkControls';
import WorkDetails from './WorkDetails';
import portfolioData from '../data/portfolioData';

const sortAndFilterWorks = (works, sortBy, selectedTag) => {
  return works
    .filter((work) => selectedTag === '' || work.tags.includes(selectedTag))
    .sort((a, b) => {
      if (sortBy === 'relevancy') {
        return b.relevancy - a.relevancy;
      } else if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
};

const Work = ({ initialSelectedTag, animationsEnabled, onAnimationsToggle }) => {
  const [works] = useState(portfolioData);
  const [controls, setControls] = useState({
    sortBy: 'relevancy',
    selectedTag: initialSelectedTag || '',
  });
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    setControls(prev => ({ ...prev, selectedTag: initialSelectedTag }));
  }, [initialSelectedTag]);

  const handleControlChange = useCallback((key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleWorkClick = useCallback((work) => {
    setSelectedWork(work);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedWork(null);
  }, []);

  const sortedAndFilteredWorks = useMemo(() =>
    sortAndFilterWorks(works, controls.sortBy, controls.selectedTag),
    [works, controls.sortBy, controls.selectedTag]
  );

  const allTags = useMemo(() =>
    [...new Set(works.flatMap((work) => work.tags))],
    [works]
  );

  return (
    <Box sx={{ pt: 10 }}>
      <Typography level="h1" sx={{ mb: 2 }}>My Work</Typography>
      <WorkControls
        controls={controls}
        onControlChange={handleControlChange}
        tags={allTags}
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

export default React.memo(Work);