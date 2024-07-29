import React, { useState } from 'react';
import { Box, Typography, Input, Textarea, Button, FormControl, FormLabel, Alert } from '@mui/joy';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    // We're not preventing default form submission
    // This allows the form to be submitted normally to Pageclip
    
    // Set the submitted state to true
    setIsSubmitted(true);

    // Use setTimeout to reset the submitted state after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Typography level="h1" sx={{ mb: 4 }}>Contact Me</Typography>
      {isSubmitted && (
        <Alert color="success" sx={{ mb: 2 }}>
          Thank you for your message. I'll get back to you soon!
        </Alert>
      )}
      <Box 
        component="form" 
        action="https://send.pageclip.co/lwBVwcXwf4ca0TIcL9Ah5drKTpcSLfFq" 
        className="pageclip-form" 
        method="post"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 500, mx: 'auto' }}
      >
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Name</FormLabel>
          <Input name="name" required />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" required />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Message</FormLabel>
          <Textarea name="message" minRows={4} required />
        </FormControl>
        <Button type="submit" className="pageclip-form__submit">
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;