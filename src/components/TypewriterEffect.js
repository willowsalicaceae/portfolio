import React, { useState, useEffect } from 'react';
import { Typography, Stack } from '@mui/joy';

const TypewriterEffect = ({ lines, onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState(lines.map(() => ''));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete && onComplete();
      return;
    }

    const timer = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      } else if (currentCharIndex < lines[currentLineIndex].length) {
        setDisplayedLines(prev => 
          prev.map((line, index) => 
            index === currentLineIndex 
              ? lines[currentLineIndex].slice(0, currentCharIndex + 1) 
              : line
          )
        );
        setCurrentCharIndex(prev => prev + 1);
      } else {
        setIsPaused(true);
      }
    }, isPaused ? 250 : 50);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, isPaused, lines, onComplete]);

  return (
    <Stack spacing={0}>
      {displayedLines.map((line, index) => (
        <Typography 
          key={index}
          level={index === 0 ? "h1" : index === 1 ? "h2" : "h3"}
          sx={{
            fontSize: '4rem',
            fontWeight: 'bold',
          }}
        >
          {line}
        </Typography>
      ))}
    </Stack>
  );
};

export default TypewriterEffect;