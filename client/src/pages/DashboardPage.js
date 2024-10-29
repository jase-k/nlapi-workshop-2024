// src/pages/DashboardPage.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompanyDetails from '../components/CompanyDetails';
const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear session storage, redirect to login)
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the Dashboard!
        </Typography>
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <CompanyDetails />
      </Box>
    </Container>
  );
};

export default DashboardPage;
