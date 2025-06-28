// In-memory mock data for privileges
let privileges = [
  {
    id: '1',
    tenant_id: '1',
    name: 'manage_users',
    description: 'Can manage users',
    resource: 'users',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    tenant_id: '2',
    name: 'view_data',
    description: 'Can view data',
    resource: 'dashboard',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Import and use the new mockApi.js endpoints for privileges

function makeResponse(data, message = 'Success', success = true) {
  return {
    success,
    data,
    message,
    trace_id: 'mock-trace-id',
  };
}

export async function getPrivileges(tenant_id) {
  await new Promise((res) => setTimeout(res, 300));
  const filtered = privileges.filter((p) => p.tenant_id === tenant_id);
  return makeResponse(filtered, 'Fetched privileges');
}

export async function getPrivilegeById(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const privilege = privileges.find((p) => p.tenant_id === tenant_id && p.id === id);
  if (!privilege) {
    return makeResponse(null, 'Privilege not found', false);
  }
  return makeResponse(privilege, 'Fetched privilege');
}

export async function addPrivilege(tenant_id, privilege) {
  await new Promise((res) => setTimeout(res, 300));
  const newPrivilege = {
    ...privilege,
    id: Date.now().toString(),
    tenant_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    active: true,
  };
  privileges.push(newPrivilege);
  return makeResponse(newPrivilege, 'Privilege created');
}

export async function updatePrivilege(tenant_id, id, updates) {
  await new Promise((res) => setTimeout(res, 300));
  let updatedPrivilege = null;
  privileges = privileges.map((p) => {
    if (p.tenant_id === tenant_id && p.id === id) {
      updatedPrivilege = { ...p, ...updates, updated_at: new Date().toISOString() };
      return updatedPrivilege;
    }
    return p;
  });
  if (!updatedPrivilege) {
    return makeResponse(null, 'Privilege not found', false);
  }
  return makeResponse(updatedPrivilege, 'Privilege updated');
}

export async function deletePrivilege(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const exists = privileges.some((p) => p.tenant_id === tenant_id && p.id === id);
  privileges = privileges.filter((p) => !(p.tenant_id === tenant_id && p.id === id));
  if (!exists) {
    return makeResponse(null, 'Privilege not found', false);
  }
  return makeResponse(null, 'Privilege deleted');
} 