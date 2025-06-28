import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken, logout, checkTokenExpiration, selectToken, selectIsAuthenticated } from '../app/authSlice';
import { isTokenExpired } from '../api/mockApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Check token expiration on mount and periodically
  useEffect(() => {
    const checkExpiration = () => {
      dispatch(checkTokenExpiration());
    };

    // Check immediately
    checkExpiration();

    // Check every 5 minutes
    const interval = setInterval(checkExpiration, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!token || !isAuthenticated) return;

    const checkAndRefreshToken = async () => {
      try {
        // Check if token expires in the next 5 minutes
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = payload.exp * 1000;
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        if (expiresAt - now <= fiveMinutes) {
          await dispatch(refreshToken()).unwrap();
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        dispatch(logout());
      }
    };

    checkAndRefreshToken();

    // Check every minute
    const interval = setInterval(checkAndRefreshToken, 60 * 1000);

    return () => clearInterval(interval);
  }, [token, isAuthenticated, dispatch]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [dispatch]);

  return {
    isAuthenticated,
    token,
    logout: handleLogout,
    isTokenExpired: token ? isTokenExpired(token) : true
  };
}; 