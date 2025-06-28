import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import TenantsPage from './pages/TenantsPage';
import OrganizationsPage from './pages/OrganizationsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RolesPage from './pages/RolesPage';
import PrivilegesPage from './pages/PrivilegesPage';
import LegalEntitiesPage from './pages/LegalEntitiesPage';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenants"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TenantsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizations"
        element={
          <ProtectedRoute>
            <AppLayout>
              <OrganizationsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <AppLayout>
              <UsersPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoute>
            <AppLayout>
              <RolesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/privileges"
        element={
          <ProtectedRoute>
            <AppLayout>
              <PrivilegesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/legal-entities"
        element={
          <ProtectedRoute>
            <AppLayout>
              <LegalEntitiesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return <AppRoutes />;
}

export default App; 