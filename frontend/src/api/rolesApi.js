// In-memory mock data for roles
let roles = [
  {
    id: '1',
    tenant_id: '1',
    name: 'Admin',
    description: 'Administrator role',
    privileges: ['manage_users', 'manage_tenants'],
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    tenant_id: '2',
    name: 'User',
    description: 'Standard user role',
    privileges: ['view_data'],
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Import and use the new mockApi.js endpoints for roles

function makeResponse(data, message = 'Success', success = true) {
  return {
    success,
    data,
    message,
    trace_id: 'mock-trace-id',
  };
}

export async function getRoles(tenant_id) {
  await new Promise((res) => setTimeout(res, 300));
  const filtered = roles.filter((r) => r.tenant_id === tenant_id);
  return makeResponse(filtered.map(r => ({ ...r, privileges: Array.isArray(r.privileges) ? r.privileges : [] })), 'Fetched roles');
}

export async function getRoleById(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const role = roles.find((r) => r.tenant_id === tenant_id && r.id === id);
  if (!role) {
    return makeResponse(null, 'Role not found', false);
  }
  return makeResponse({ ...role, privileges: Array.isArray(role.privileges) ? role.privileges : [] }, 'Fetched role');
}

export async function addRole(tenant_id, role) {
  await new Promise((res) => setTimeout(res, 300));
  const newRole = {
    ...role,
    id: Date.now().toString(),
    tenant_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    active: true,
    privileges: Array.isArray(role.privileges) ? role.privileges : [],
  };
  roles.push(newRole);
  return makeResponse(newRole, 'Role created');
}

export async function updateRole(tenant_id, id, updates) {
  await new Promise((res) => setTimeout(res, 300));
  let updatedRole = null;
  roles = roles.map((r) => {
    if (r.tenant_id === tenant_id && r.id === id) {
      updatedRole = {
        ...r,
        ...updates,
        updated_at: new Date().toISOString(),
        privileges: Array.isArray(updates.privileges)
          ? updates.privileges
          : typeof updates.privileges === 'string'
          ? [updates.privileges]
          : r.privileges || [],
      };
      return updatedRole;
    }
    return r;
  });
  if (!updatedRole) {
    return makeResponse(null, 'Role not found', false);
  }
  return makeResponse(updatedRole, 'Role updated');
}

export async function deleteRole(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const exists = roles.some((r) => r.tenant_id === tenant_id && r.id === id);
  roles = roles.filter((r) => !(r.tenant_id === tenant_id && r.id === id));
  if (!exists) {
    return makeResponse(null, 'Role not found', false);
  }
  return makeResponse(null, 'Role deleted');
} 