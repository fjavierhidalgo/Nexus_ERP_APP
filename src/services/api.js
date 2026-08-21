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

// Resource specific API objects
export const clientsApi = {
  getAll: () => request('/clients'),
  getById: (id) => request(`/clients/${id}`),
  create: (data) => request('/clients', { method: 'POST', body: data }),
  update: (id, data) => request(`/clients/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/clients/${id}`, { method: 'DELETE' }),
};

export const companiesApi = {
  getAll: () => request('/companies'),
  getById: (id) => request(`/companies/${id}`),
  create: (data) => request('/companies', { method: 'POST', body: data }),
  update: (id, data) => request(`/companies/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/companies/${id}`, { method: 'DELETE' }),
};

export const contactsApi = {
  getAll: () => request('/contacts'),
  getById: (id) => request(`/contacts/${id}`),
  create: (data) => request('/contacts', { method: 'POST', body: data }),
  update: (id, data) => request(`/contacts/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/contacts/${id}`, { method: 'DELETE' }),
};

export const interactionsApi = {
  getAll: () => request('/interactions'),
  getById: (id) => request(`/interactions/${id}`),
  create: (data) => request('/interactions', { method: 'POST', body: data }),
  update: (id, data) => request(`/interactions/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/interactions/${id}`, { method: 'DELETE' }),
};

export const dealsApi = {
  getAll: () => request('/deals'),
  getById: (id) => request(`/deals/${id}`),
  create: (data) => request('/deals', { method: 'POST', body: data }),
  update: (id, data) => request(`/deals/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/deals/${id}`, { method: 'DELETE' }),
};

export const tasksApi = {
  getAll: () => request('/tasks'),
  getById: (id) => request(`/tasks/${id}`),
  create: (data) => request('/tasks', { method: 'POST', body: data }),
  update: (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};

export const documentsApi = {
  getAll: () => request('/documents'),
  getById: (id) => request(`/documents/${id}`),
  create: (data) => request('/documents', { method: 'POST', body: data }),
  update: (id, data) => request(`/documents/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/documents/${id}`, { method: 'DELETE' }),
};

export const automationsApi = {
  getAll: () => request('/automations'),
  getById: (id) => request(`/automations/${id}`),
  create: (data) => request('/automations', { method: 'POST', body: data }),
  update: (id, data) => request(`/automations/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/automations/${id}`, { method: 'DELETE' }),
};

export const integrationsApi = {
  getAll: () => request('/integrations'),
  getById: (id) => request(`/integrations/${id}`),
  create: (data) => request('/integrations', { method: 'POST', body: data }),
  update: (id, data) => request(`/integrations/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/integrations/${id}`, { method: 'DELETE' }),
};
