import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Typography } from '@mui/material';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'donor':
        return '/donor-dashboard';
      case 'receiver':
        return '/receiver-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/';
    }
  };

  React.useEffect(() => {
    if (user?.role) {
      navigate(getDashboardRoute());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Welcome, {user?.name}!
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        Redirecting to your dashboard...
      </Typography>
    </Container>
  );
};

export default Dashboard;
