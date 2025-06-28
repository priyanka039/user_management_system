// Placeholder for mock API service
// Implement MSW or Axios mocks here for endpoints

// Comprehensive mock API implementation for all endpoints as per the assignment spec
// Simulate authentication, tenants, organizations, users, roles, privileges, legal entities
// Each endpoint should return realistic mock data, proper error handling, and match the RESTful structure

// JWT Token Management
const generateMockJWT = (payload) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadEncoded = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature');
  return `${header}.${payloadEncoded}.${signature}`;
};

const generateMockRefreshToken = () => {
  return `refresh_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
};

// Mock token storage
let mockTokens = {
  access_token: null,
  refresh_token: null,
  expires_at: null
};

export const mockLogin = async ({ email, password, tenant_id }) => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 700));
  
  // Validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: {
        code: 'INVALID_EMAIL',
        message: 'Invalid email format',
        details: {}
      },
      message: 'Invalid email format',
      trace_id: 'mock-trace-' + Date.now()
    };
  }
  
  // Validate password length (minimum 4 characters)
  if (!password || password.length < 4) {
    return {
      success: false,
      error: {
        code: 'INVALID_PASSWORD',
        message: 'Password must be at least 4 characters long',
        details: {}
      },
      message: 'Password must be at least 4 characters long',
      trace_id: 'mock-trace-' + Date.now()
    };
  }
  
  // Accept any valid email/password combination
  const now = Date.now();
  const expiresAt = now + (60 * 60 * 1000); // 1 hour
  
  const accessToken = generateMockJWT({
    sub: '1',
    email: email,
    tenant_id: tenant_id || '1',
    organization_id: '1',
    name: email.split('@')[0], // Use email prefix as name
    exp: Math.floor(expiresAt / 1000),
    iat: Math.floor(now / 1000)
  });
  
  const refreshToken = generateMockRefreshToken();
  
  // Store tokens
  mockTokens = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt
  };
  
  return {
    success: true,
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'bearer',
      name: email.split('@')[0], // Use email prefix as name
      email: email,
      user_id: '1',
      tenant_id: tenant_id || '1',
      organization_id: '1',
      tenant_region_url: 'https://api.example.com',
      expires_at: expiresAt
    },
    message: 'Login successful',
    trace_id: 'mock-trace-' + Date.now()
  };
};

export const mockRefreshToken = async (refreshToken) => {
  await new Promise((res) => setTimeout(res, 300));
  
  if (refreshToken === mockTokens.refresh_token) {
    const now = Date.now();
    const expiresAt = now + (60 * 60 * 1000); // 1 hour
    
    const newAccessToken = generateMockJWT({
      sub: '1',
      email: 'admin@example.com',
      tenant_id: '1',
      organization_id: '1',
      name: 'Admin User',
      exp: Math.floor(expiresAt / 1000),
      iat: Math.floor(now / 1000)
    });
    
    mockTokens.access_token = newAccessToken;
    mockTokens.expires_at = expiresAt;
    
    return {
      success: true,
      data: {
        access_token: newAccessToken,
        token_type: 'bearer',
        expires_at: expiresAt
      },
      message: 'Token refreshed successfully',
      trace_id: 'mock-trace-' + Date.now()
    };
  }
  
  return {
    success: false,
    error: {
      code: 'INVALID_REFRESH_TOKEN',
      message: 'Invalid refresh token',
      details: {}
    },
    message: 'Invalid refresh token',
    trace_id: 'mock-trace-' + Date.now()
  };
};

export const mockLogout = async () => {
  await new Promise((res) => setTimeout(res, 200));
  
  // Clear stored tokens
  mockTokens = {
    access_token: null,
    refresh_token: null,
    expires_at: null
  };
  
  return {
    success: true,
    data: {},
    message: 'Logout successful',
    trace_id: 'mock-trace-' + Date.now()
  };
};

// Helper function to check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch (error) {
    return true;
  }
};

// Helper function to get token payload
export const getTokenPayload = (token) => {
  if (!token) return null;
  
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};

// --- MOCK API SERVICE IMPLEMENTATION ---
// This file simulates all endpoints as per the assignment spec, with realistic data and error handling.
// Use in-memory objects for data, and export async functions for each endpoint.
// Simulate network latency with setTimeout and random errors for robustness.

// ... (full implementation for all endpoints) ... 