import React from 'react';
import { Box, Select, Option, Chip, Radio, RadioGroup, FormControl, FormLabel, Switch } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';

const SortControl = ({ sortBy, onSortChange }) => (
  <FormControl>
    <FormLabel>Sort by</FormLabel>
    <Select value={sortBy} onChange={(e, newValue) => onSortChange('sortBy', newValue)}>
      <Option value="relevancy">Relevancy</Option>
      <Option value="date">Date</Option>
    </Select>
  </FormControl>
);

const MobileTagFilter = ({ selectedTag, onTagChange, tags }) => (
  <FormControl sx={{ display: { xs: 'block', sm: 'none' } }}>
    <FormLabel>Filter by</FormLabel>
    <Select
      value={selectedTag}
      onChange={(e, newValue) => onTagChange('selectedTag', newValue)}
    >
      <Option value="">All</Option>
      {tags.map((tag) => (
        <Option key={tag} value={tag}>{tag}</Option>
      ))}
    </Select>
  </FormControl>
);

const DesktopTagFilter = ({ selectedTag, onTagChange, tags }) => (
  <FormControl sx={{ display: { xs: 'none', sm: 'block' } }}>
    <FormLabel>Filter by</FormLabel>
    <RadioGroup
      name="filter-tags"
      value={selectedTag}
      onChange={(event) => onTagChange('selectedTag', event.target.value)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <FilterChip value="" label="All" checked={selectedTag === ''} />
      {tags.map((tag) => (
        <FilterChip key={tag} value={tag} label={tag} checked={selectedTag === tag} />
      ))}
    </RadioGroup>
  </FormControl>
);

const FilterChip = ({ value, label, checked }) => (
  <Chip
    variant="plain"
    color={checked ? 'primary' : 'neutral'}
    startDecorator={
      checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
    }
    sx={{ "--Chip-minHeight": "34px" }}
  >
    <Radio
      variant="outlined"
      color={checked ? 'primary' : 'neutral'}
      disableIcon
      overlay
      label={label}
      value={value}
    />
  </Chip>
);

const AnimationToggle = ({ animationsEnabled, onAnimationsToggle }) => (
  <FormControl>
    <FormLabel>Animations</FormLabel>
    <Switch
      checked={animationsEnabled}
      onChange={onAnimationsToggle}
      variant="outlined"
      size="lg"
      sx={{
        "--Switch-trackRadius": "36px",
        "--Switch-trackWidth": "56px",
        "--Switch-trackHeight": "36px",
        alignSelf: 'flex-start'
      }}
    />
  </FormControl>
);

const WorkControls = ({ controls, onControlChange, tags, animationsEnabled, onAnimationsToggle }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
      mb: 2
    }}>
      <SortControl sortBy={controls.sortBy} onSortChange={onControlChange} />
      <MobileTagFilter selectedTag={controls.selectedTag} onTagChange={onControlChange} tags={tags} />
      <DesktopTagFilter selectedTag={controls.selectedTag} onTagChange={onControlChange} tags={tags} />
      <AnimationToggle animationsEnabled={animationsEnabled} onAnimationsToggle={onAnimationsToggle} />
    </Box>
  );
};

export default WorkControls;