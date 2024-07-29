import React, { useState, useEffect } from 'react';
import { Box, Typography, Input, Textarea, Button, FormControl, FormLabel, Modal, ModalDialog } from '@mui/joy';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if there's a submission flag in localStorage
    const hasSubmitted = localStorage.getItem('formSubmitted');
    if (hasSubmitted) {
      setIsModalOpen(true);
      // Remove the flag from localStorage
      localStorage.removeItem('formSubmitted');
    }
  }, []);

  const handleSubmit = (event) => {
    // Set a flag in localStorage before form submission
    localStorage.setItem('formSubmitted', 'true');
  };

  return (
    <Box sx={{ py: 8 }}>
      <Typography level="h1" sx={{ mb: 4 }}>Contact Me</Typography>
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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog>
          <Typography level="h2" sx={{ mb: 2 }}>Thank You!</Typography>
          <Typography>Your message has been successfully sent. I'll get back to you soon!</Typography>
          <Button onClick={() => setIsModalOpen(false)} sx={{ mt: 2 }}>Close</Button>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Contact;