// In-memory mock data for organizations
let organizations = [
  {
    id: '1',
    tenant_id: '1',
    name: 'Acme HQ',
    description: 'Headquarters',
    email: 'hq@acme.com',
    phone: '123-000-0000',
    website: 'https://acme.com/hq',
    industry: 'Technology',
    employee_count: 60,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    tenant_id: '2',
    name: 'Beta Branch',
    description: 'Branch office',
    email: 'branch@beta.com',
    phone: '987-111-2222',
    website: 'https://beta.com/branch',
    industry: 'Finance',
    employee_count: 20,
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

export async function getOrganizations(tenant_id) {
  await new Promise((res) => setTimeout(res, 300));
  const orgs = organizations.filter((o) => o.tenant_id === tenant_id);
  return makeResponse(orgs, 'Fetched organizations');
}

export async function getOrganizationById(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const org = organizations.find((o) => o.tenant_id === tenant_id && o.id === id);
  if (!org) {
    return makeResponse(null, 'Organization not found', false);
  }
  return makeResponse(org, 'Fetched organization');
}

export async function addOrganization(tenant_id, org) {
  await new Promise((res) => setTimeout(res, 300));
  const newOrg = {
    ...org,
    id: Date.now().toString(),
    tenant_id,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  organizations.push(newOrg);
  return makeResponse(newOrg, 'Organization created');
}

export async function updateOrganization(tenant_id, id, updates) {
  await new Promise((res) => setTimeout(res, 300));
  let updatedOrg = null;
  organizations = organizations.map((o) => {
    if (o.tenant_id === tenant_id && o.id === id) {
      updatedOrg = { ...o, ...updates, updated_at: new Date().toISOString() };
      return updatedOrg;
    }
    return o;
  });
  if (!updatedOrg) {
    return makeResponse(null, 'Organization not found', false);
  }
  return makeResponse(updatedOrg, 'Organization updated');
}

export async function deleteOrganization(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const exists = organizations.some((o) => o.tenant_id === tenant_id && o.id === id);
  organizations = organizations.filter((o) => !(o.tenant_id === tenant_id && o.id === id));
  if (!exists) {
    return makeResponse(null, 'Organization not found', false);
  }
  return makeResponse(null, 'Organization deleted');
} 