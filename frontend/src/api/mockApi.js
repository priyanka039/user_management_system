// Placeholder for mock API service
// Implement MSW or Axios mocks here for endpoints

export const mockLogin = async ({ email, password }) => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 700));
  if (email === 'admin@example.com' && password === 'admin') {
    return {
      success: true,
      data: {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh',
        token_type: 'bearer',
        name: 'Admin User',
        email: 'admin@example.com',
        user_id: '1',
        tenant_id: '1',
        organization_id: '1',
        tenant_region_url: 'mock-url',
      },
      message: 'Login successful',
      trace_id: 'mock-trace',
    };
  }
  return {
    success: false,
    data: null,
    message: 'Invalid credentials',
    trace_id: 'mock-trace',
  };
}; 