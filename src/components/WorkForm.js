import { useState } from 'react';
import { Box, Button, Textarea, Typography } from '@mui/joy';

const WorkForm = ({ onSubmit }) => {
  const [portfolioData, setPortfolioData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Updated regex pattern to include hasVideo
    const workPattern = /(.+)\n(.+) - (.+)\n(.+)\n(.+)\n(.+)\n(.+)?\n(.+)?\n(.+)?\n(.+)?/g;
    const itemPattern = /([^,]+)/g;

    const works = [];

    let match;
    while ((match = workPattern.exec(portfolioData)) !== null) {
      const [, id, subtitle, title, date, url, description, tagsString = '', softwareString = '', relevancyString = '', hasVideoString = ''] = match;

      const tags = (tagsString.match(itemPattern) || []).map((tag) => tag.trim());
      const software = (softwareString.match(itemPattern) || []).map((sw) => sw.trim());
      const relevancy = parseInt(relevancyString.trim()) || 0;
      const hasVideo = hasVideoString.trim().toLowerCase() === 'true';

      const work = {
        id: id.trim(),
        subtitle: subtitle.trim(),
        title: title.trim(),
        date: date.trim(),
        url: url.trim(),
        description: description.trim(),
        tags,
        software,
        relevancy,
        hasVideo,
      };

      works.push(work);
    }

    onSubmit(works);

    // Download the JSON file
    const jsonString = JSON.stringify(works, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.json';
    link.click();
    URL.revokeObjectURL(url);

    setPortfolioData('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography level="h2">Add Portfolio Data</Typography>
      <Textarea
        value={portfolioData}
        onChange={(e) => setPortfolioData(e.target.value)}
        minRows={10}
        placeholder="Paste portfolio data here"
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default WorkForm;