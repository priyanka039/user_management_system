import OrganizationsPage from './pages/OrganizationsPage';
import UsersPage from './pages/UsersPage';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import TenantsPage from './pages/TenantsPage';
import LoginPage from './pages/LoginPage';
import RolesPage from './pages/RolesPage';
import PrivilegesPage from './pages/PrivilegesPage';
import LegalEntitiesPage from './pages/LegalEntitiesPage';

// Temporary RequireAuth placeholder
const RequireAuth = ({ children }) => children;

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/tenants"
        element={
          <RequireAuth>
            <AppLayout>
              <TenantsPage />
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/organizations"
        element={
          <RequireAuth>
            <AppLayout>
              <OrganizationsPage />
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth>
            <AppLayout>
              <UsersPage />
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/roles"
        element={
          <RequireAuth>
            <AppLayout>
              <RolesPage />
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/privileges"
        element={
          <RequireAuth>
            <AppLayout>
              <PrivilegesPage />
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/legal-entities"
        element={
          <RequireAuth>
            <AppLayout>
              <LegalEntitiesPage />
            </AppLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default AppRoutes; 