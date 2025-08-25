import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const APITest = () => {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    try {
      setStatus('loading');
      setError(null);
      
      const response = await axios.get('http://localhost:5001/api/health');
      setData(response.data);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        🚀 API Connection Test
      </Typography>
      
      {status === 'loading' && (
        <Box sx={{ my: 3 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Testing API connection...</Typography>
        </Box>
      )}
      
      {status === 'success' && data && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6">✅ Backend Connection Successful!</Typography>
          <Typography>Status: {data.status}</Typography>
          <Typography>Message: {data.message}</Typography>
          <Typography>Environment: {data.environment}</Typography>
          <Typography>Version: {data.version}</Typography>
        </Alert>
      )}
      
      {status === 'error' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">❌ Backend Connection Failed</Typography>
          <Typography>{error}</Typography>
        </Alert>
      )}
      
      <Button 
        variant="contained" 
        onClick={testAPI} 
        disabled={status === 'loading'}
        sx={{ mt: 2 }}
      >
        Test Again
      </Button>
    </Box>
  );
};

export default APITest;
