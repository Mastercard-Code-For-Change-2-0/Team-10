import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ReceiverDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Receiver Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your requests and connect with donors.
        </Typography>
      </Box>
    </Container>
  );
};

export default ReceiverDashboard;
