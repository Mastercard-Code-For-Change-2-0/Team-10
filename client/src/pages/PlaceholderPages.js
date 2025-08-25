import React from 'react';
import { Container, Typography, Box } from '@mui/material';

// Placeholder pages that can be fully developed later

export const CreateDonation = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Create Donation</Typography>
    <Typography variant="body1">Form to create new donation listings.</Typography>
  </Container>
);

export const CreateRequest = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Create Request</Typography>
    <Typography variant="body1">Form to create new donation requests.</Typography>
  </Container>
);

export const BrowseDonations = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Browse Donations</Typography>
    <Typography variant="body1">View all available donations with filters.</Typography>
  </Container>
);

export const BrowseRequests = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Browse Requests</Typography>
    <Typography variant="body1">View all active donation requests.</Typography>
  </Container>
);

export const MatchingCenter = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Matching Center</Typography>
    <Typography variant="body1">Admin interface for reviewing and approving matches.</Typography>
  </Container>
);

export const Profile = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Profile</Typography>
    <Typography variant="body1">User profile management page.</Typography>
  </Container>
);

export const NotFound = () => (
  <Container maxWidth="lg" sx={{ py: 8 }}>
    <Box textAlign="center">
      <Typography variant="h2" gutterBottom>404</Typography>
      <Typography variant="h5" gutterBottom>Page Not Found</Typography>
      <Typography variant="body1">The page you're looking for doesn't exist.</Typography>
    </Box>
  </Container>
);
