// Centralized REST API Service for NexusCRM
const BASE_URL = 'https://erpnexus.somee.com/api';

/**
 * Generic fetch wrapper with error handling
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.errors) {
        // ValidationProblemDetails ASP.NET Core format
        const errorList = Object.entries(errorData.errors)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
          .join(' | ');
        errorMessage = `Error de Validación: ${errorList}`;
      } else if (errorData.title) {
        errorMessage = errorData.title;
      }
    } catch (e) {
      // response body is not JSON or empty
    }
    throw new Error(errorMessage);
  }

  // 204 No Content response
  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

/**
 * Helper to build endpoint URL with optional organizationCode query param
 */
function buildQuery(endpoint, orgCode) {
  if (!orgCode) return endpoint;
  const separator = endpoint.includes('?') ? '&' : '?';
  return `${endpoint}${separator}organizationCode=${encodeURIComponent(orgCode)}`;
}

// Resource specific API objects

// 0. ORGANIZATIONS
export const organizationsApi = {
  getAll: () => request('/organizations'),
  getById: (id) => request(`/organizations/${id}`),
  create: (data) => request('/organizations', { method: 'POST', body: data }),
  update: (id, data) => request(`/organizations/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/organizations/${id}`, { method: 'DELETE' }),
};

// 1. CLIENTS
export const clientsApi = {
  getAll: (orgCode) => request(buildQuery('/clients', orgCode)),
  getById: (id) => request(`/clients/${id}`),
  create: (data) => request('/clients', { method: 'POST', body: data }),
  update: (id, data) => request(`/clients/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/clients/${id}`, { method: 'DELETE' }),
};

// 2. COMPANIES
export const companiesApi = {
  getAll: (orgCode) => request(buildQuery('/companies', orgCode)),
  getById: (id) => request(`/companies/${id}`),
  create: (data) => request('/companies', { method: 'POST', body: data }),
  update: (id, data) => request(`/companies/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/companies/${id}`, { method: 'DELETE' }),
};

// 3. CONTACTS
export const contactsApi = {
  getAll: (orgCode) => request(buildQuery('/contacts', orgCode)),
  getById: (id) => request(`/contacts/${id}`),
  create: (data) => request('/contacts', { method: 'POST', body: data }),
  update: (id, data) => request(`/contacts/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/contacts/${id}`, { method: 'DELETE' }),
};

// 4. INTERACTIONS
export const interactionsApi = {
  getAll: (orgCode) => request(buildQuery('/interactions', orgCode)),
  getById: (id) => request(`/interactions/${id}`),
  create: (data) => request('/interactions', { method: 'POST', body: data }),
  update: (id, data) => request(`/interactions/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/interactions/${id}`, { method: 'DELETE' }),
};

// 5. DEALS
export const dealsApi = {
  getAll: (orgCode) => request(buildQuery('/deals', orgCode)),
  getById: (id) => request(`/deals/${id}`),
  create: (data) => request('/deals', { method: 'POST', body: data }),
  update: (id, data) => request(`/deals/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/deals/${id}`, { method: 'DELETE' }),
};

// 6. TASKS
export const tasksApi = {
  getAll: (orgCode) => request(buildQuery('/tasks', orgCode)),
  getById: (id) => request(`/tasks/${id}`),
  create: (data) => request('/tasks', { method: 'POST', body: data }),
  update: (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};

// 7. DOCUMENTS
export const documentsApi = {
  getAll: (orgCode) => request(buildQuery('/documents', orgCode)),
  getById: (id) => request(`/documents/${id}`),
  create: (data) => request('/documents', { method: 'POST', body: data }),
  update: (id, data) => request(`/documents/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/documents/${id}`, { method: 'DELETE' }),
};

// 8. AUTOMATIONS
export const automationsApi = {
  getAll: (orgCode) => request(buildQuery('/automations', orgCode)),
  getById: (id) => request(`/automations/${id}`),
  create: (data) => request('/automations', { method: 'POST', body: data }),
  update: (id, data) => request(`/automations/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/automations/${id}`, { method: 'DELETE' }),
};

// 9. INTEGRATIONS
export const integrationsApi = {
  getAll: (orgCode) => request(buildQuery('/integrations', orgCode)),
  getById: (id) => request(`/integrations/${id}`),
  create: (data) => request('/integrations', { method: 'POST', body: data }),
  update: (id, data) => request(`/integrations/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/integrations/${id}`, { method: 'DELETE' }),
};
