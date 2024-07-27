import React, { useState, useEffect } from 'react';
import { Typography, Link } from '@mui/joy';

const TypewriterLinks = ({ text, links, delay, duration, animationsEnabled, onCategoryClick, typographyProps }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!animationsEnabled) {
      setDisplayText(text);
      return;
    }

    setDisplayText(''); // Reset the text when animation starts

    let timer;
    const animateText = () => {
      for (let i = 0; i <= text.length; i++) {
        timer = setTimeout(() => {
          setDisplayText(text.slice(0, i));
        }, (i / text.length) * duration);
      }
    };

    const delayTimer = setTimeout(animateText, delay);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(timer);
    };
  }, [text, delay, duration, animationsEnabled]);

  const renderTextWithLinks = (text) => {
    let result = [];
    let lastIndex = 0;
    links.forEach(({ word, onClick }) => {
      const index = text.toLowerCase().indexOf(word.toLowerCase().charAt(0));
      if (index !== -1) {
        if (index > lastIndex) {
          result.push(text.slice(lastIndex, index));
        }
        const visiblePart = text.slice(index, Math.min(index + word.length, text.length));
        const remainingPart = word.slice(visiblePart.length);
        result.push(
          <Link
            key={index}
            component="button"
            onClick={onClick}
            sx={{ 
              cursor: 'pointer', 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {visiblePart}
            <span style={{ opacity: 0 }}>{remainingPart}</span>
          </Link>
        );
        lastIndex = index + visiblePart.length;
      }
    });
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
    return result;
  };

  return (
    <Typography {...typographyProps}>
      {renderTextWithLinks(displayText)}
    </Typography>
  );
};

export default TypewriterLinks;