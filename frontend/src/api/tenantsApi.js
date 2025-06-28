// Mock data
let tenants = [
  {
    id: '1',
    name: 'Tenant One',
    description: 'First tenant',
    email: 'tenant1@example.com',
    phone: '1234567890',
    website: 'tenant1.com',
    industry: 'Tech',
    annual_revenue: '1000000',
    employee_count: 100,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Tenant Two',
    description: 'Second tenant',
    email: 'tenant2@example.com',
    phone: '0987654321',
    website: 'tenant2.com',
    industry: 'Finance',
    annual_revenue: '2000000',
    employee_count: 200,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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

export async function getTenants() {
  await new Promise((res) => setTimeout(res, 300));
  return makeResponse([...tenants], 'Fetched tenants');
}

export async function getTenantById(id) {
  await new Promise((res) => setTimeout(res, 300));
  const tenant = tenants.find((t) => t.id === id);
  if (!tenant) {
    return makeResponse(null, 'Tenant not found', false);
  }
  return makeResponse(tenant, 'Fetched tenant');
}

export async function addTenant(tenant) {
  await new Promise((res) => setTimeout(res, 300));
  const newTenant = {
    ...tenant,
    id: Date.now().toString(),
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  tenants.push(newTenant);
  return makeResponse(newTenant, 'Tenant created');
}

export async function updateTenant(id, updates) {
  await new Promise((res) => setTimeout(res, 300));
  let updatedTenant = null;
  tenants = tenants.map((t) => {
    if (t.id === id) {
      updatedTenant = { ...t, ...updates, updated_at: new Date().toISOString() };
      return updatedTenant;
    }
    return t;
  });
  if (!updatedTenant) {
    return makeResponse(null, 'Tenant not found', false);
  }
  return makeResponse(updatedTenant, 'Tenant updated');
}

export async function deleteTenant(id) {
  await new Promise((res) => setTimeout(res, 300));
  const exists = tenants.some((t) => t.id === id);
  tenants = tenants.filter((t) => t.id !== id);
  if (!exists) {
    return makeResponse(null, 'Tenant not found', false);
  }
  return makeResponse(null, 'Tenant deleted');
}

// Import and use the new mockApi.js endpoints for tenants 