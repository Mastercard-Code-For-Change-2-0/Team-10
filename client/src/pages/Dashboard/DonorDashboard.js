import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const DonorDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Donor Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your donations and track their impact.
        </Typography>
      </Box>
    </Container>
  );
};

export default DonorDashboard;
