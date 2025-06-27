import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import { useDispatch } from 'react-redux';
import { logout } from '../app/authSlice';
import { useNavigate } from 'react-router-dom';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <Sidebar onLogout={handleLogout} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#fafbfc', minHeight: '100vh', p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout; 