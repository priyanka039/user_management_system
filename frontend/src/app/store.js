import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tenantsReducer from './tenantsSlice';
import organizationsReducer from './organizationsSlice';
import usersReducer from './usersSlice';
import rolesReducer from './rolesSlice';
import privilegesReducer from './privilegesSlice';
import legalEntitiesReducer from './legalEntitiesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tenants: tenantsReducer,
    organizations: organizationsReducer,
    users: usersReducer,
    roles: rolesReducer,
    privileges: privilegesReducer,
    legalEntities: legalEntitiesReducer,
  },
});

export default store; 