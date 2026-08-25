import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  organizationsApi,
  clientsApi,
  companiesApi,
  contactsApi,
  interactionsApi,
  dealsApi,
  tasksApi,
  documentsApi,
  automationsApi,
  integrationsApi
} from '../services/api';

const CRMContext = createContext();

export const CRMProvider = ({ children }) => {
  // Active Tab
  const [activeTab, setActiveTab] = useState('clients'); // 'clients', 'interactions', 'relationships', 'pipeline', 'tasks', 'documents', 'automations', 'analytics', 'integrations'

  // Selected Client for Drawer/Modal
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Global Search Modal Toggle
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // API Loading & Error states
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // --- MULTI-ORGANIZATION / MULTI-COMPANY STATE ---
  const [organizations, setOrganizations] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [isOrgSelectorOpen, setIsOrgSelectorOpen] = useState(false);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // State collections for all resources
  const [clients, setClients] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [deals, setDeals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [automations, setAutomations] = useState([]);
  const [integrations, setIntegrations] = useState([]);

  /**
   * Main data fetcher:
   * 1. Fetches catalog of organizations.
   * 2. Resolves current active organization (using targetOrgCode, saved code in localStorage, or default org '1').
   * 3. Fetches all 9 resource collections filtered by organizationCode.
   */
  const fetchAllData = async (targetOrgCode) => {
    setLoading(true);
    setApiError(null);
    try {
      // 1. Fetch Organizations
      const orgsData = await organizationsApi.getAll().catch((err) => {
        console.warn('Could not fetch organizations from API:', err);
        return [{ id: '0001', code: '1', name: 'Organización por defecto', isActive: true }];
      });

      const validOrgs = Array.isArray(orgsData) && orgsData.length > 0
        ? orgsData
        : [{ id: '0001', code: '1', name: 'Organización por defecto', isActive: true }];

      setOrganizations(validOrgs);

      // 2. Resolve Active Organization Code
      const savedCode = localStorage.getItem('selectedOrgCode');
      const activeCode = targetOrgCode || currentOrganization?.code || savedCode || '1';

      let matchedOrg = validOrgs.find((o) => o.code === activeCode);
      if (!matchedOrg) {
        matchedOrg = validOrgs[0];
      }

      setCurrentOrganization(matchedOrg);
      localStorage.setItem('selectedOrgCode', matchedOrg.code);

      // 3. Fetch Collections filtered by activeCode
      const [
        clientsData,
        companiesData,
        contactsData,
        interactionsData,
        dealsData,
        tasksData,
        documentsData,
        automationsData,
        integrationsData
      ] = await Promise.all([
        clientsApi.getAll(matchedOrg.code).catch(() => []),
        companiesApi.getAll(matchedOrg.code).catch(() => []),
        contactsApi.getAll(matchedOrg.code).catch(() => []),
        interactionsApi.getAll(matchedOrg.code).catch(() => []),
        dealsApi.getAll(matchedOrg.code).catch(() => []),
        tasksApi.getAll(matchedOrg.code).catch(() => []),
        documentsApi.getAll(matchedOrg.code).catch(() => []),
        automationsApi.getAll(matchedOrg.code).catch(() => []),
        integrationsApi.getAll(matchedOrg.code).catch(() => []),
      ]);

      setClients(clientsData || []);
      setCompanies(companiesData || []);
      setContacts(contactsData || []);
      setInteractions(interactionsData || []);
      setDeals(dealsData || []);
      setTasks(tasksData || []);
      setDocuments(documentsData || []);
      setAutomations(automationsData || []);
      setIntegrations(integrationsData || []);
      
      addToast(`Organización activa: "${matchedOrg.name}" (${matchedOrg.code})`, 'success');
    } catch (err) {
      console.error('Error fetching API data:', err);
      setApiError(err.message);
      addToast(`Error de conexión API: ${err.message}`, 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- ORGANIZATION ACTIONS ---

  const selectOrganization = (org) => {
    if (!org) return;
    setCurrentOrganization(org);
    localStorage.setItem('selectedOrgCode', org.code);
    fetchAllData(org.code);
  };

  const createOrganization = async (orgData) => {
    try {
      const payload = {
        code: orgData.code.trim(),
        name: orgData.name.trim(),
        isActive: true
      };
      const created = await organizationsApi.create(payload);
      setOrganizations((prev) => [...prev, created]);
      selectOrganization(created);
      addToast(`Nueva organización "${created.name}" creada y activada.`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al crear organización: ${err.message}`, 'warning');
      throw err;
    }
  };

  // Helper to ensure organizationCode is attached to requests
  const getOrgCode = () => currentOrganization?.code || '1';

  // --- CRUD ACTIONS CONNECTED TO API ---

  // 1. CLIENTS
  const addClient = async (clientData) => {
    try {
      const payload = {
        organizationCode: getOrgCode(),
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone || null,
        avatar: clientData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`,
        company: clientData.company || null,
        companyId: clientData.companyId || null,
        role: clientData.role || null,
        status: clientData.status || 'lead',
        source: clientData.source || null,
        dateAdded: clientData.dateAdded ? new Date(clientData.dateAdded).toISOString() : new Date().toISOString(),
        cif: clientData.cif || null,
        industry: clientData.industry || null,
        annualBudget: typeof clientData.annualBudget === 'number' ? clientData.annualBudget : (parseFloat(clientData.annualBudget) || 0),
        healthScore: clientData.healthScore !== undefined ? clientData.healthScore : 80,
        interestLevel: clientData.interestLevel || 'alto',
        tags: Array.isArray(clientData.tags) ? clientData.tags : [],
        notes: clientData.notes || null,
      };

      const created = await clientsApi.create(payload);
      setClients((prev) => [created, ...prev]);
      addToast(`Cliente "${created.name}" guardado en la API (${getOrgCode()}).`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al guardar cliente: ${err.message}`, 'warning');
      throw err;
    }
  };

  const updateClient = async (id, updatedFields) => {
    try {
      const existing = clients.find((c) => c.id === id);
      if (!existing) return;

      const payload = {
        organizationCode: updatedFields.organizationCode || existing.organizationCode || getOrgCode(),
        name: updatedFields.name ?? existing.name,
        email: updatedFields.email ?? existing.email,
        phone: updatedFields.phone ?? existing.phone,
        avatar: updatedFields.avatar ?? existing.avatar,
        company: updatedFields.company ?? existing.company,
        companyId: updatedFields.companyId ?? existing.companyId,
        role: updatedFields.role ?? existing.role,
        status: updatedFields.status ?? existing.status,
        source: updatedFields.source ?? existing.source,
        dateAdded: updatedFields.dateAdded ? new Date(updatedFields.dateAdded).toISOString() : existing.dateAdded,
        cif: updatedFields.cif ?? existing.cif,
        industry: updatedFields.industry ?? existing.industry,
        annualBudget: updatedFields.annualBudget !== undefined
          ? (typeof updatedFields.annualBudget === 'number' ? updatedFields.annualBudget : parseFloat(updatedFields.annualBudget) || 0)
          : existing.annualBudget,
        healthScore: updatedFields.healthScore ?? existing.healthScore,
        interestLevel: updatedFields.interestLevel ?? existing.interestLevel,
        tags: updatedFields.tags ?? existing.tags ?? [],
        notes: updatedFields.notes ?? existing.notes,
      };

      const updated = await clientsApi.update(id, payload);
      setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
      addToast('Información de cliente actualizada en la API.', 'info');
    } catch (err) {
      addToast(`Error al actualizar cliente: ${err.message}`, 'warning');
    }
  };

  const deleteClient = async (id) => {
    try {
      const client = clients.find((c) => c.id === id);
      await clientsApi.delete(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
      if (selectedClientId === id) setSelectedClientId(null);
      addToast(`Cliente "${client?.name || id}" eliminado en la API.`, 'warning');
    } catch (err) {
      addToast(`Error al eliminar cliente: ${err.message}`, 'warning');
    }
  };

  // 2. COMPANIES
  const addCompany = async (companyData) => {
    try {
      const payload = {
        organizationCode: getOrgCode(),
        name: companyData.name,
        cif: companyData.cif || null,
        sector: companyData.sector || null,
        address: companyData.address || null,
        website: companyData.website || null,
        employeeCount: parseInt(companyData.employeeCount) || 10,
        annualRevenue: parseFloat(companyData.annualRevenue) || 0,
        logo: companyData.logo || null,
        primaryContactId: companyData.primaryContactId || null,
        parentCompanyId: companyData.parentCompanyId || null,
      };
      const created = await companiesApi.create(payload);
      setCompanies((prev) => [created, ...prev]);
      addToast(`Empresa "${created.name}" creada en la API.`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al guardar empresa: ${err.message}`, 'warning');
    }
  };

  // 3. CONTACTS
  const addContact = async (contactData) => {
    try {
      const payload = {
        organizationCode: getOrgCode(),
        companyId: contactData.companyId || null,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        role: contactData.role || null,
        decisionRole: contactData.decisionRole || null,
        influenceLevel: contactData.influenceLevel || null,
      };
      const created = await contactsApi.create(payload);
      setContacts((prev) => [...prev, created]);
      addToast(`Contacto "${created.name}" añadido en la API.`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al guardar contacto: ${err.message}`, 'warning');
    }
  };

  // 4. INTERACTIONS
  const addInteraction = async (newIntData) => {
    try {
      const payload = {
        organizationCode: getOrgCode(),
        clientId: newIntData.clientId || null,
        type: newIntData.type || 'llamada',
        title: newIntData.title,
        summary: newIntData.summary || null,
        date: newIntData.date ? new Date(newIntData.date).toISOString() : new Date().toISOString(),
        author: newIntData.author || 'Usuario Actual',
        duration: newIntData.duration || null,
        outcome: newIntData.outcome || null,
        sentiment: newIntData.sentiment || 'Positivo',
      };
      const created = await interactionsApi.create(payload);
      setInteractions((prev) => [created, ...prev]);
      addToast(`Interacción "${created.title}" registrada en la API.`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al guardar interacción: ${err.message}`, 'warning');
    }
  };

  const deleteInteraction = async (id) => {
    try {
      await interactionsApi.delete(id);
      setInteractions((prev) => prev.filter((i) => i.id !== id));
      addToast('Registro de interacción eliminado en la API.', 'info');
    } catch (err) {
      addToast(`Error al eliminar interacción: ${err.message}`, 'warning');
    }
  };

  // 5. DEALS / PIPELINE
  const addDeal = async (dealData) => {
    try {
      const payload = {
        organizationCode: getOrgCode(),
        title: dealData.title,
        clientId: dealData.clientId || null,
        clientName: dealData.clientName || null,
        companyName: dealData.companyName || null,
        amount: typeof dealData.amount === 'number' ? dealData.amount : parseFloat(dealData.amount) || 0,
        stage: dealData.stage || 'prospection',
        probability: dealData.probability !== undefined ? dealData.probability : (dealData.stage === 'won' ? 100 : dealData.stage === 'lost' ? 0 : 50),
        expectedCloseDate: dealData.expectedCloseDate ? new Date(dealData.expectedCloseDate).toISOString() : null,
        owner: dealData.owner || 'Javier Hidalgo',
        priority: dealData.priority || 'Media',
        notes: dealData.notes || null,
      };
      const created = await dealsApi.create(payload);
      setDeals((prev) => [created, ...prev]);
      addToast(`Oportunidad "${created.title}" registrada en la API.`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al crear trato: ${err.message}`, 'warning');
    }
  };

  const updateDealStage = async (dealId, newStage) => {
    try {
      const existing = deals.find((d) => d.id === dealId);
      if (!existing) return;

      const prob = newStage === 'won' ? 100 : newStage === 'lost' ? 0 : existing.probability;
      const payload = {
        organizationCode: existing.organizationCode || getOrgCode(),
        title: existing.title,
        clientId: existing.clientId,
        clientName: existing.clientName,
        companyName: existing.companyName,
        amount: existing.amount,
        stage: newStage,
        probability: prob,
        expectedCloseDate: existing.expectedCloseDate,
        owner: existing.owner,
        priority: existing.priority,
        notes: existing.notes,
      };

      const updated = await dealsApi.update(dealId, payload);
      setDeals((prev) => prev.map((d) => (d.id === dealId ? updated : d)));
      addToast(`Estado de oportunidad actualizado a ${newStage.toUpperCase()} en la API.`, 'info');
    } catch (err) {
      addToast(`Error al mover etapa: ${err.message}`, 'warning');
    }
  };

  const deleteDeal = async (id) => {
    try {
      await dealsApi.delete(id);
      setDeals((prev) => prev.filter((d) => d.id !== id));
      addToast('Oportunidad eliminada en la API.', 'warning');
    } catch (err) {
      addToast(`Error al eliminar oportunidad: ${err.message}`, 'warning');
    }
  };

  // 6. TASKS & REMINDERS
  const addTask = async (taskData) => {
    try {
      const payload = {
        organizationCode: getOrgCode(),
        title: taskData.title,
        clientId: taskData.clientId || null,
        clientName: taskData.clientName || null,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : new Date().toISOString(),
        priority: taskData.priority || 'Media',
        status: taskData.status || 'pending',
        type: taskData.type || 'Llamada',
        assignedTo: taskData.assignedTo || 'Javier Hidalgo',
        notes: taskData.notes || null,
      };
      const created = await tasksApi.create(payload);
      setTasks((prev) => [created, ...prev]);
      addToast(`Tarea "${created.title}" guardada en la API.`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al crear tarea: ${err.message}`, 'warning');
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
      const existing = tasks.find((t) => t.id === taskId);
      if (!existing) return;

      const newStatus = existing.status === 'completed' ? 'pending' : 'completed';
      const payload = {
        organizationCode: existing.organizationCode || getOrgCode(),
        title: existing.title,
        clientId: existing.clientId,
        clientName: existing.clientName,
        dueDate: existing.dueDate,
        priority: existing.priority,
        status: newStatus,
        type: existing.type,
        assignedTo: existing.assignedTo,
        notes: existing.notes,
      };

      const updated = await tasksApi.update(taskId, payload);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
      addToast('Estado de tarea actualizado en la API.', 'info');
    } catch (err) {
      addToast(`Error al actualizar tarea: ${err.message}`, 'warning');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await tasksApi.delete(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      addToast('Tarea eliminada en la API.', 'info');
    } catch (err) {
      addToast(`Error al eliminar tarea: ${err.message}`, 'warning');
    }
  };

  // 7. DOCUMENTS
  const addDocument = async (docData) => {
    try {
      const payload = {
        organizationCode: getOrgCode(),
        clientId: docData.clientId || null,
        clientName: docData.clientName || null,
        title: docData.title,
        type: docData.type || 'Presupuesto',
        category: docData.category || 'Comercial',
        status: docData.status || 'Enviado',
        dateCreated: docData.dateCreated ? new Date(docData.dateCreated).toISOString() : new Date().toISOString(),
        fileSize: docData.fileSize || '2.4 MB',
        version: docData.version || '1.0',
        url: docData.url || 'https://erpnexus.somee.com/docs/file.pdf',
      };
      const created = await documentsApi.create(payload);
      setDocuments((prev) => [created, ...prev]);
      addToast(`Documento "${created.title}" registrado en la API.`, 'success');
      return created;
    } catch (err) {
      addToast(`Error al subir documento: ${err.message}`, 'warning');
    }
  };

  const deleteDocument = async (docId) => {
    try {
      await documentsApi.delete(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      addToast('Documento eliminado en la API.', 'warning');
    } catch (err) {
      addToast(`Error al eliminar documento: ${err.message}`, 'warning');
    }
  };

  // 8. AUTOMATIONS
  const toggleAutomation = async (ruleId) => {
    try {
      const existing = automations.find((r) => r.id === ruleId);
      if (!existing) return;

      const payload = {
        organizationCode: existing.organizationCode || getOrgCode(),
        name: existing.name,
        trigger: existing.trigger,
        condition: existing.condition,
        action: existing.action,
        enabled: !existing.enabled,
        executionsCount: existing.executionsCount || 0,
        lastTriggered: existing.lastTriggered,
      };

      const updated = await automationsApi.update(ruleId, payload);
      setAutomations((prev) => prev.map((r) => (r.id === ruleId ? updated : r)));
      addToast('Regla de automatización actualizada en la API.', 'info');
    } catch (err) {
      addToast(`Error al actualizar regla: ${err.message}`, 'warning');
    }
  };

  // 9. INTEGRATIONS
  const toggleIntegration = async (id) => {
    try {
      const existing = integrations.find((i) => i.id === id || i.name.toLowerCase().includes(id.toLowerCase()));
      if (!existing) return;

      const payload = {
        organizationCode: existing.organizationCode || getOrgCode(),
        name: existing.name,
        connected: !existing.connected,
        lastSync: new Date().toISOString(),
        details: existing.details,
      };

      const updated = await integrationsApi.update(existing.id, payload);
      setIntegrations((prev) => prev.map((i) => (i.id === existing.id ? updated : i)));
      addToast(`Integración "${existing.name}" actualizada en la API.`, 'info');
    } catch (err) {
      addToast(`Error al actualizar integración: ${err.message}`, 'warning');
    }
  };

  const selectedClient = clients.find((c) => c.id === selectedClientId) || null;

  return (
    <CRMContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedClientId,
        setSelectedClientId,
        selectedClient,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
        loading,
        apiError,
        refetchData: () => fetchAllData(currentOrganization?.code),

        // Organizations & Multi-company State
        organizations,
        currentOrganization,
        isOrgSelectorOpen,
        setIsOrgSelectorOpen,
        selectOrganization,
        createOrganization,

        // Collections
        clients,
        companies,
        contacts,
        interactions,
        deals,
        tasks,
        documents,
        automations,
        integrations,

        // CRUD Actions
        addClient,
        updateClient,
        deleteClient,
        addCompany,
        addContact,
        addInteraction,
        deleteInteraction,
        addDeal,
        updateDealStage,
        deleteDeal,
        addTask,
        toggleTaskStatus,
        deleteTask,
        addDocument,
        deleteDocument,
        toggleAutomation,
        toggleIntegration
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) throw new Error('useCRM must be used within a CRMProvider');
  return context;
};
