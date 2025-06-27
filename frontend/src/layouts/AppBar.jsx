import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Box } from '@mui/material';

const AppBar = () => (
  <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        User Management System
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {/* Placeholder for user info, notifications, etc. */}
    </Toolbar>
  </MuiAppBar>
);

export default AppBar; 