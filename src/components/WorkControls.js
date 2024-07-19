import React from 'react';
import { Box, Select, Option, Chip, Radio, RadioGroup, FormControl, FormLabel, Checkbox } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';

const WorkControls = ({ sortBy, onSortChange, tags, selectedTag, onTagChange, animatedThumbnails, onAnimatedThumbnailsChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-end', mb: 2 }}>
      <FormControl>
        <FormLabel>Sort by</FormLabel>
        <Select value={sortBy} onChange={(e, newValue) => onSortChange(newValue)}>
          <Option value="relevancy">Relevancy</Option>
          <Option value="date">Date</Option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Filter by tag</FormLabel>
        <RadioGroup
          name="filter-tags"
          value={selectedTag}
          onChange={(event) => onTagChange(event.target.value)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 1,
            margin: 0,
            pb: "1px",
          }}
        >
          <Chip
            variant="plain"
            color={selectedTag === '' ? 'primary' : 'neutral'}
            startDecorator={
              selectedTag === '' && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
            }
            sx={{
              "--Chip-minHeight": "34px",
            }}
          >
            <Radio
              variant="outlined"
              color={selectedTag === '' ? 'primary' : 'neutral'}
              disableIcon
              overlay
              label="All"
              value=""
            />
          </Chip>
          {tags.map((tag) => {
            const checked = selectedTag === tag;
            return (
              <Chip
                key={tag}
                variant="plain"
                color={checked ? 'primary' : 'neutral'}
                startDecorator={
                  checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                }
                sx={{
                  "--Chip-minHeight": "34px"
                }}
              >
                <Radio
                  variant="outlined"
                  color={checked ? 'primary' : 'neutral'}
                  disableIcon
                  overlay
                  label={tag}
                  value={tag}
                />
              </Chip>
            );
          })}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <Checkbox
          checked={animatedThumbnails}
          onChange={onAnimatedThumbnailsChange}
          label="Animated Thumbnails"
        />
      </FormControl>
    </Box>
  );
};

export default WorkControls;