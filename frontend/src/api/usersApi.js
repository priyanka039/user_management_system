// In-memory mock data for users
let users = [
  {
    id: '1',
    email: 'alice@acme.com',
    first_name: 'Alice',
    last_name: 'Smith',
    organization_id: '1',
    tenant_id: '1',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    roles: ['Admin'],
  },
  {
    id: '2',
    email: 'bob@beta.com',
    first_name: 'Bob',
    last_name: 'Jones',
    organization_id: '2',
    tenant_id: '2',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    roles: ['User'],
  },
];

function makeResponse(data, message = 'Success', success = true) {
  return {
    success,
    data,
    message,
    trace_id: 'mock-trace-id',
  };
}

export async function getUsers(tenant_id) {
  await new Promise((res) => setTimeout(res, 300));
  const filtered = users.filter((u) => u.tenant_id === tenant_id);
  return makeResponse(filtered.map(u => ({ ...u, roles: Array.isArray(u.roles) ? u.roles : [] })), 'Fetched users');
}

export async function getUserById(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const user = users.find((u) => u.tenant_id === tenant_id && u.id === id);
  if (!user) {
    return makeResponse(null, 'User not found', false);
  }
  return makeResponse({ ...user, roles: Array.isArray(user.roles) ? user.roles : [] }, 'Fetched user');
}

export async function addUser(tenant_id, user) {
  await new Promise((res) => setTimeout(res, 300));
  const newUser = {
    ...user,
    id: Date.now().toString(),
    tenant_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    active: true,
    roles: Array.isArray(user.roles) ? user.roles : [],
  };
  users.push(newUser);
  return makeResponse(newUser, 'User created');
}

export async function updateUser(tenant_id, id, updates) {
  await new Promise((res) => setTimeout(res, 300));
  let updatedUser = null;
  users = users.map((u) => {
    if (u.tenant_id === tenant_id && u.id === id) {
      updatedUser = {
        ...u,
        ...updates,
        updated_at: new Date().toISOString(),
        roles: Array.isArray(updates.roles)
          ? updates.roles
          : typeof updates.roles === 'string'
          ? [updates.roles]
          : u.roles || [],
      };
      return updatedUser;
    }
    return u;
  });
  if (!updatedUser) {
    return makeResponse(null, 'User not found', false);
  }
  return makeResponse(updatedUser, 'User updated');
}

export async function deleteUser(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const exists = users.some((u) => u.tenant_id === tenant_id && u.id === id);
  users = users.filter((u) => !(u.tenant_id === tenant_id && u.id === id));
  if (!exists) {
    return makeResponse(null, 'User not found', false);
  }
  return makeResponse(null, 'User deleted');
} 