import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Paper, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../app/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    await dispatch(login(data));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, minWidth: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">User Management System</Typography>
        <Typography variant="h6" mb={2}>Sign In</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loading}
          />
          
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 4,
                message: 'Password must be at least 4 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
          />
          
          <FormControl fullWidth margin="normal" disabled={loading}>
            <InputLabel>Tenant ID</InputLabel>
            <Select
              {...register('tenant_id', { required: 'Tenant ID is required' })}
              error={!!errors.tenant_id}
              label="Tenant ID"
            >
              <MenuItem value="1">Tenant 1 (Demo)</MenuItem>
              <MenuItem value="2">Tenant 2 (Test)</MenuItem>
              <MenuItem value="3">Tenant 3 (Production)</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Any valid email and password (minimum 4 characters) will work
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage; 