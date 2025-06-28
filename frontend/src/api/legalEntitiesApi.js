// In-memory mock data for legal entities
let legalEntities = [
  {
    id: '1',
    name: 'Acme Holdings',
    legal_name: 'Acme Holdings LLC',
    legal_entity_type: 'PARENT_ENTITY',
    address: '123 Main St',
    incorporation_date: '2020-01-01',
    is_default: true,
    registration_number: 'REG123',
    tax_identifier: 'TAX123',
    jurisdiction_country: 'USA',
    functional_currency: 'USD',
    tenant_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Import and use the new mockApi.js endpoints for legal entities

function makeResponse(data, message = 'Success', success = true) {
  return {
    success,
    data,
    message,
    trace_id: 'mock-trace-id',
  };
}

export async function getLegalEntities(tenant_id) {
  await new Promise((res) => setTimeout(res, 300));
  const filtered = legalEntities.filter((e) => e.tenant_id === tenant_id);
  return makeResponse(filtered, 'Fetched legal entities');
}

export async function getLegalEntityById(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const entity = legalEntities.find((e) => e.tenant_id === tenant_id && e.id === id);
  if (!entity) {
    return makeResponse(null, 'Legal entity not found', false);
  }
  return makeResponse(entity, 'Fetched legal entity');
}

export async function addLegalEntity(tenant_id, entity) {
  await new Promise((res) => setTimeout(res, 300));
  const newEntity = {
    ...entity,
    id: Date.now().toString(),
    tenant_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  legalEntities.push(newEntity);
  return makeResponse(newEntity, 'Legal entity created');
}

export async function updateLegalEntity(tenant_id, id, updates) {
  await new Promise((res) => setTimeout(res, 300));
  let updatedEntity = null;
  legalEntities = legalEntities.map((e) => {
    if (e.tenant_id === tenant_id && e.id === id) {
      updatedEntity = { ...e, ...updates, updated_at: new Date().toISOString() };
      return updatedEntity;
    }
    return e;
  });
  if (!updatedEntity) {
    return makeResponse(null, 'Legal entity not found', false);
  }
  return makeResponse(updatedEntity, 'Legal entity updated');
}

export async function deleteLegalEntity(tenant_id, id) {
  await new Promise((res) => setTimeout(res, 300));
  const exists = legalEntities.some((e) => e.tenant_id === tenant_id && e.id === id);
  legalEntities = legalEntities.filter((e) => !(e.tenant_id === tenant_id && e.id === id));
  if (!exists) {
    return makeResponse(null, 'Legal entity not found', false);
  }
  return makeResponse(null, 'Legal entity deleted');
} 