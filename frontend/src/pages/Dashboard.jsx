import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardCards from '../components/DashboardCards';

const Dashboard = () => (
  <Box p={4}>
    <Typography variant="h4" mb={3}>Dashboard</Typography>
    <DashboardCards />
  </Box>
);

export default Dashboard; 