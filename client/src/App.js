import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import DonorDashboard from './pages/Dashboard/DonorDashboard';
import ReceiverDashboard from './pages/Dashboard/ReceiverDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import { CreateDonation, CreateRequest, BrowseDonations, BrowseRequests, MatchingCenter, Profile, NotFound } from './pages/PlaceholderPages';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <Navbar />
          
          <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, sm: 9 } }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/browse-donations" element={<BrowseDonations />} />
              <Route path="/browse-requests" element={<BrowseRequests />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/donor-dashboard" element={
                <ProtectedRoute roles={['donor']}>
                  <DonorDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/receiver-dashboard" element={
                <ProtectedRoute roles={['receiver']}>
                  <ReceiverDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin-dashboard" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/create-donation" element={
                <ProtectedRoute roles={['donor']}>
                  <CreateDonation />
                </ProtectedRoute>
              } />
              
              <Route path="/create-request" element={
                <ProtectedRoute roles={['receiver']}>
                  <CreateRequest />
                </ProtectedRoute>
              } />
              
              <Route path="/matching-center" element={
                <ProtectedRoute roles={['admin']}>
                  <MatchingCenter />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          
          <Footer />
        </Box>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
