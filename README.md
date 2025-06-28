# User Management System (UMS)

## Overview
A comprehensive multi-tenant User Management System built with React, Redux Toolkit, React Router, React Hook Form, and Material UI. The system supports JWT-based authentication, session management, role-based access control, and CRUD operations for tenants, organizations, users, roles, privileges, and legal entities. All API calls are simulated with a robust mock API layer that includes realistic JWT token management.

## Features
- **JWT Authentication & Session Management**
  - Secure login with email/password and tenant selection
  - JWT token storage and automatic refresh
  - Session persistence across browser reloads
  - Automatic logout on token expiration
  - Protected routes with authentication guards
- **Multi-tenant Support**
  - Tenant-based data isolation
  - Tenant selection during login
  - Tenant-specific API endpoints
- **CRUD Operations**
  - Complete CRUD for tenants, organizations, users, roles, privileges, legal entities
  - Advanced data tables with filtering, sorting, pagination
  - Form validation and error handling
- **Role-Based Access Control (RBAC)**
  - Role assignment and management
  - Privilege-based access control
  - Conditional UI rendering based on permissions
- **Modern UI/UX**
  - Responsive Material UI design
  - Loading states and error boundaries
  - Toast notifications and user feedback
  - Mobile-responsive navigation
- **Enterprise Architecture**
  - Redux Toolkit for state management
  - React Hook Form for form handling
  - Modular component structure
  - Comprehensive error handling

## Technology Stack
- **Frontend Framework**: React 18+ (functional components, hooks)
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form with validation
- **UI Library**: Material UI (MUI) v5
- **Data Tables**: MUI DataGrid
- **HTTP Client**: Axios (for API abstraction)
- **Authentication**: JWT tokens with refresh mechanism
- **Mock API**: In-memory RESTful API simulation

## Project Structure
```
frontend/src/
├── api/                    # Mock API modules
│   ├── mockApi.js         # JWT authentication & all endpoints
│   ├── tenantsApi.js      # Tenant CRUD operations
│   ├── organizationsApi.js # Organization CRUD operations
│   ├── usersApi.js        # User CRUD operations
│   ├── rolesApi.js        # Role CRUD operations
│   ├── privilegesApi.js   # Privilege CRUD operations
│   └── legalEntitiesApi.js # Legal entity CRUD operations
├── app/                   # Redux store and slices
│   ├── store.js          # Redux store configuration
│   ├── authSlice.js      # JWT authentication state
│   ├── tenantsSlice.js   # Tenant state management
│   ├── organizationsSlice.js # Organization state
│   ├── usersSlice.js     # User state management
│   ├── rolesSlice.js     # Role state management
│   ├── privilegesSlice.js # Privilege state
│   └── legalEntitiesSlice.js # Legal entity state
├── components/           # Reusable UI components
│   ├── ProtectedRoute.jsx # Authentication guard
│   └── DashboardCards.jsx # Dashboard metrics
├── layouts/              # App layout components
│   ├── AppLayout.jsx     # Main layout wrapper
│   ├── Sidebar.jsx       # Navigation sidebar
│   └── AppBar.jsx        # Top app bar with user menu
├── pages/                # Feature pages
│   ├── LoginPage.jsx     # JWT authentication
│   ├── Dashboard.jsx     # Overview dashboard
│   ├── TenantsPage.jsx   # Tenant management
│   ├── OrganizationsPage.jsx # Organization management
│   ├── UsersPage.jsx     # User management
│   ├── RolesPage.jsx     # Role management
│   ├── PrivilegesPage.jsx # Privilege management
│   └── LegalEntitiesPage.jsx # Legal entity management
├── utils/                # Utility functions
│   └── useAuth.js        # JWT authentication hook
├── App.jsx               # Main app component with routing
└── main.jsx              # Application entry point
```

## Setup Instructions

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd user_management_system
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

### Login Credentials
- **Email**: Any valid email format (e.g., `user@example.com`)
- **Password**: Any password with minimum 4 characters (e.g., `1234`)
- **Tenant ID**: Select any tenant (1, 2, or 3)

**Note**: The system accepts any valid email and password combination as long as the email format is correct and password is at least 4 characters long.

## Authentication & JWT System

### Login Process
1. Navigate to `/login`
2. Enter any valid email, password (min 4 chars), and select tenant
3. System validates credentials and returns JWT tokens
4. Tokens are stored securely in localStorage
5. User is redirected to dashboard

### JWT Token Features
- **Access Token**: Valid for 1 hour, used for API requests
- **Refresh Token**: Used to obtain new access tokens
- **Automatic Refresh**: Tokens refresh 5 minutes before expiration
- **Session Persistence**: Survives browser reloads
- **Security**: Automatic logout on token expiration

### Protected Routes
All application routes (except login) are protected and require authentication. Unauthenticated users are automatically redirected to the login page.

## Mock API Documentation

### Authentication Endpoints
```
POST /api/v1/auth/login
Request: { email, password, tenant_id }
Response: { access_token, refresh_token, user_data }
```

### Entity Endpoints
All CRUD endpoints follow RESTful conventions:

**Tenants**
- `GET /api/v1/tenants` - List all tenants
- `POST /api/v1/tenants` - Create tenant
- `GET /api/v1/tenants/{id}` - Get tenant details
- `PUT /api/v1/tenants/{id}` - Update tenant
- `GET /api/v1/tenants/{id}/settings` - Get tenant settings

**Organizations**
- `GET /api/v1/tenants/{tenant_id}/organizations` - List organizations
- `POST /api/v1/tenants/{tenant_id}/organizations` - Create organization
- `GET /api/v1/tenants/{tenant_id}/organizations/{id}` - Get organization
- `PUT /api/v1/tenants/{tenant_id}/organizations/{id}` - Update organization
- `DELETE /api/v1/tenants/{tenant_id}/organizations/{id}` - Delete organization

**Users**
- `GET /api/v1/tenants/{tenant_id}/users` - List users
- `POST /api/v1/tenants/{tenant_id}/users` - Create user
- `GET /api/v1/tenants/{tenant_id}/users/{id}` - Get user
- `PUT /api/v1/tenants/{tenant_id}/users/{id}` - Update user
- `GET /api/v1/me` - Get current user profile

**Roles**
- `GET /api/v1/tenants/{tenant_id}/roles` - List roles
- `POST /api/v1/tenants/{tenant_id}/roles` - Create role
- `GET /api/v1/tenants/{tenant_id}/roles/{id}` - Get role
- `PUT /api/v1/tenants/{tenant_id}/roles/{id}` - Update role

**Privileges**
- `GET /api/v1/tenants/{tenant_id}/privileges` - List privileges
- `POST /api/v1/tenants/{tenant_id}/privileges` - Create privilege
- `GET /api/v1/tenants/{tenant_id}/privileges/{id}` - Get privilege
- `PUT /api/v1/tenants/{tenant_id}/privileges/{id}` - Update privilege

**Legal Entities**
- `GET /api/v1/tenants/{tenant_id}/legal-entities` - List legal entities
- `POST /api/v1/tenants/{tenant_id}/legal-entities` - Create legal entity
- `GET /api/v1/tenants/{tenant_id}/legal-entities/{id}` - Get legal entity
- `PUT /api/v1/tenants/{tenant_id}/legal-entities/{id}` - Update legal entity

### Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message",
  "trace_id": "unique-trace-id"
}
```

### Error Handling
Error responses include:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  },
  "trace_id": "unique-trace-id"
}
```

## Component Documentation

### Core Components
- **`ProtectedRoute`**: Authentication guard for protected pages
- **`AppLayout`**: Main layout with sidebar and app bar
- **`Sidebar`**: Navigation menu with module grouping
- **`AppBar`**: Top bar with user menu and notifications
- **`DashboardCards`**: Overview metrics display

### Page Components
All page components include:
- **Data Tables**: MUI DataGrid with sorting, filtering, pagination
- **CRUD Forms**: React Hook Form with validation
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Toast notifications and error boundaries
- **Confirmation Dialogs**: Delete confirmations and action confirmations

## Architecture Guide

### State Management
- **Redux Toolkit**: Centralized state management
- **Slices**: Separate slices for each entity and authentication
- **Async Thunks**: API calls and side effects
- **Selectors**: Memoized state selectors for performance

### Authentication Flow
1. **Login**: User submits credentials → JWT tokens generated → Stored in localStorage
2. **Token Validation**: Automatic checking on app load and periodically
3. **Token Refresh**: Automatic refresh before expiration
4. **Logout**: Clear tokens and redirect to login

### Form Management
- **React Hook Form**: All forms use RHF for validation and state
- **Validation**: Client-side validation with error messages
- **Submission**: Optimistic updates with error handling

### UI/UX Patterns
- **Material Design**: Consistent design system
- **Responsive Layout**: Mobile-first approach
- **Loading States**: Skeleton screens and progress indicators
- **Error Boundaries**: Graceful error handling
- **Toast Notifications**: User feedback for actions

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **ESLint**: Airbnb React style guide
- **Prettier**: Code formatting
- **PropTypes**: Component prop validation

### Testing (Planned)
- Unit tests for slices and components
- Integration tests for authentication flow
- E2E tests for critical user journeys

## Deployment

### Production Build
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Configuration
- Development: Uses mock API with realistic data
- Production: Configure to use real API endpoints

## Security Features

### JWT Security
- **Token Expiration**: 1-hour access tokens
- **Refresh Tokens**: Secure token renewal
- **Token Validation**: Payload verification
- **Automatic Logout**: Expired token handling

### Data Protection
- **localStorage Encryption**: Sensitive data storage
- **CSRF Protection**: Token-based request validation
- **XSS Prevention**: Input sanitization and validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

