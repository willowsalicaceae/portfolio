import React, { useState, useEffect } from 'react';
import { Typography, useTheme } from '@mui/joy';

const TypewriterEffect = ({ text, delay, duration, animationsEnabled, typographyProps, highlightWords = [] }) => {
  const [displayText, setDisplayText] = useState('');
  const theme = useTheme();

  useEffect(() => {
    if (!animationsEnabled) {
      setDisplayText(text);
      return;
    }

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

  const highlightText = (text) => {
    let result = [];
    let lastIndex = 0;
    highlightWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          result.push(text.slice(lastIndex, match.index));
        }
        result.push(
          <span key={match.index} style={{ color: theme.vars.palette.primary.main }}>
            {match[0]}
          </span>
        );
        lastIndex = regex.lastIndex;
      }
    });
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
    return result;
  };

  return (
    <Typography {...typographyProps}>
      {highlightWords.length > 0 ? highlightText(displayText) : displayText}
    </Typography>
  );
};

export default TypewriterEffect;