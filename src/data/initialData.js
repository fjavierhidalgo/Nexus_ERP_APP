// Initial Spanish Mock Data for NexusCRM with Multi-Sociedad Support

export const initialSociedades = [
  {
    id: "soc-1",
    name: "Empresa Demo S.L.",
    cif: "B-12345678",
    sector: "Servicios & Tecnología",
    currency: "EUR (€)",
    cloudProvider: "Google Drive", // 'Google Drive', 'OneDrive', 'iCloud', 'Local Server'
    cloudFolderPath: "Google Drive/NexusCRM_EmpresaDemo/",
    dbFileName: "nexus_crm_demo.sqlite",
    isDefault: true,
    createdDate: "2026-01-01",
    members: [
      { id: "mem-1", name: "Javier Hidalgo", email: "javier@empresademo.es", role: "Propietario / Administrador", status: "Activo" },
      { id: "mem-2", name: "Sofía Martínez", email: "sofia@empresademo.es", role: "Comercial Senior", status: "Activo" },
      { id: "mem-3", name: "Roberto Gómez", email: "roberto@empresademo.es", role: "SDR / Calificación", status: "Activo" }
    ]
  },
  {
    id: "soc-2",
    name: "Inversiones Hispania S.L.",
    cif: "B-98765432",
    sector: "Inmobiliaria & Activos",
    currency: "EUR (€)",
    cloudProvider: "iCloud",
    cloudFolderPath: "iCloud Drive/NexusCRM_Inversiones/",
    dbFileName: "nexus_crm_hispania.sqlite",
    isDefault: false,
    createdDate: "2026-05-10",
    members: [
      { id: "mem-1", name: "Javier Hidalgo", email: "javier@hispania.es", role: "Propietario / Administrador", status: "Activo" }
    ]
  }
];

export const initialClients = [
  {
    id: "cli-1",
    sociedadId: "soc-1",
    name: "María Fernández Gómez",
    email: "maria.fernandez@techsoluciones.es",
    phone: "+34 612 345 678",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    company: "TechSoluciones Iberia",
    companyId: "comp-1",
    role: "Directora de Tecnología (CTO)",
    status: "vip",
    source: "LinkedIn",
    dateAdded: "2026-01-15",
    cif: "B87654321",
    industry: "Tecnología",
    annualBudget: "120.000 €",
    healthScore: 94,
    interestLevel: "alto",
    tags: ["Enterprise", "SaaS", "Prioritario Q3"],
    notes: "Cliente muy interesado en la migración a la nube y módulo de analítica avanzada."
  },
  {
    id: "cli-2",
    sociedadId: "soc-1",
    name: "Carlos Ruiz Alarcón",
    email: "c.ruiz@innovacionmedica.com",
    phone: "+34 689 112 233",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
    company: "Innovación Médica S.L.",
    companyId: "comp-2",
    role: "Director General",
    status: "activo",
    source: "Feria Bilbao Tech",
    dateAdded: "2026-03-02",
    cif: "B98765432",
    industry: "Salud",
    annualBudget: "75.000 €",
    healthScore: 82,
    interestLevel: "alto",
    tags: ["Sector Salud", "Renovación Anual"],
    notes: "Requiere cumplimiento estricto de RGPD en tratamiento de datos."
  },
  {
    id: "cli-3",
    sociedadId: "soc-1",
    name: "Laura Morales Santos",
    email: "laura@grupologisticamadrid.es",
    phone: "+34 655 443 322",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    company: "Grupo Logística Madrid",
    companyId: "comp-3",
    role: "Jefa de Operaciones",
    status: "lead",
    source: "Formulario Web",
    dateAdded: "2026-07-20",
    cif: "A12345678",
    industry: "Logística",
    annualBudget: "45.000 €",
    healthScore: 68,
    interestLevel: "medio",
    tags: ["Inbound Lead", "Flotas"],
    notes: "Solicitó demo personalizada para gestión de rutas y despachos."
  },
  {
    id: "cli-4",
    sociedadId: "soc-1",
    name: "Alejandro Prieto López",
    email: "aprieto@FinanzasGlobal.com",
    phone: "+34 644 998 877",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250",
    company: "Finanzas Global Consulting",
    companyId: "comp-4",
    role: "Socio Director",
    status: "vip",
    source: "Referido",
    dateAdded: "2025-11-10",
    cif: "A88776655",
    industry: "Finanzas",
    annualBudget: "200.000 €",
    healthScore: 98,
    interestLevel: "alto",
    tags: ["VIP", "Finanzas", "Contrato Multianual"],
    notes: "Cliente recurrente con 3 proyectos activos. Excelente relación."
  },
  {
    id: "cli-5",
    sociedadId: "soc-1",
    name: "Elena Pastor Benítez",
    email: "elena.pastor@ecoenergiade.es",
    phone: "+34 677 332 110",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250",
    company: "EcoEnergía del Sur",
    companyId: "comp-5",
    role: "Responsable de Compras",
    status: "inactivo",
    source: "Llamada en frío",
    dateAdded: "2025-08-01",
    cif: "B55443322",
    industry: "Energía",
    annualBudget: "30.000 €",
    healthScore: 40,
    interestLevel: "bajo",
    tags: ["Revisión Pendiente"],
    notes: "Pospusieron la decisión de compra para el próximo ejercicio presupuestario."
  },
  {
    id: "cli-6",
    sociedadId: "soc-2",
    name: "Gonzalo Ramos Ibáñez",
    email: "g.ramos@patrimoniohispania.com",
    phone: "+34 622 887 766",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    company: "Patrimonio Hispania Capital",
    companyId: "comp-6",
    role: "Director de Inversiones",
    status: "vip",
    source: "Recomendación Directa",
    dateAdded: "2026-06-01",
    cif: "B-55667788",
    industry: "Inmobiliaria",
    annualBudget: "350.000 €",
    healthScore: 92,
    interestLevel: "alto",
    tags: ["Inversión Real Estate", "Activos Prime"],
    notes: "Cliente principal de la sociedad Inversiones Hispania."
  }
];

export const initialCompanies = [
  {
    id: "comp-1",
    sociedadId: "soc-1",
    name: "TechSoluciones Iberia",
    cif: "B87654321",
    sector: "Tecnología & Software",
    address: "Paseo de la Castellana 120, Madrid",
    website: "https://techsoluciones.es",
    employeeCount: "150-250",
    annualRevenue: "12M €",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150",
    primaryContactId: "cli-1",
    parentCompanyId: null
  },
  {
    id: "comp-2",
    sociedadId: "soc-1",
    name: "Innovación Médica S.L.",
    cif: "B98765432",
    sector: "Salud & Biotecnología",
    address: "Gran Vía 45, Barcelona",
    website: "https://innovacionmedica.com",
    employeeCount: "50-100",
    annualRevenue: "6.5M €",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=150",
    primaryContactId: "cli-2",
    parentCompanyId: null
  },
  {
    id: "comp-3",
    sociedadId: "soc-1",
    name: "Grupo Logística Madrid",
    cif: "A12345678",
    sector: "Transporte & Logística",
    address: "Calle Alcalá 300, Madrid",
    website: "https://grupologisticamadrid.es",
    employeeCount: "300+",
    annualRevenue: "25M €",
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=150",
    primaryContactId: "cli-3",
    parentCompanyId: null
  },
  {
    id: "comp-4",
    sociedadId: "soc-1",
    name: "Finanzas Global Consulting",
    cif: "A88776655",
    sector: "Banca & Asesoría",
    address: "Calle Serrano 50, Madrid",
    website: "https://finanzasglobal.com",
    employeeCount: "500+",
    annualRevenue: "60M €",
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=150",
    primaryContactId: "cli-4",
    parentCompanyId: null
  },
  {
    id: "comp-6",
    sociedadId: "soc-2",
    name: "Patrimonio Hispania Capital",
    cif: "B-55667788",
    sector: "Inmobiliaria & Real Estate",
    address: "Calle Velázquez 80, Madrid",
    website: "https://patrimoniohispania.com",
    employeeCount: "25-50",
    annualRevenue: "18M €",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=150",
    primaryContactId: "cli-6",
    parentCompanyId: null
  }
];

export const initialContacts = [
  {
    id: "con-1",
    sociedadId: "soc-1",
    companyId: "comp-1",
    name: "María Fernández Gómez",
    email: "maria.fernandez@techsoluciones.es",
    phone: "+34 612 345 678",
    role: "CTO",
    decisionRole: "Decisor",
    influenceLevel: "Alta",
    linkedClientId: "cli-1"
  },
  {
    id: "con-2",
    sociedadId: "soc-1",
    companyId: "comp-1",
    name: "David Serrano",
    email: "d.serrano@techsoluciones.es",
    phone: "+34 612 999 888",
    role: "Jefe de Infraestructura",
    decisionRole: "Influenciador",
    influenceLevel: "Media",
    linkedClientId: null
  },
  {
    id: "con-3",
    sociedadId: "soc-1",
    companyId: "comp-2",
    name: "Carlos Ruiz Alarcón",
    email: "c.ruiz@innovacionmedica.com",
    phone: "+34 689 112 233",
    role: "CEO",
    decisionRole: "Decisor",
    influenceLevel: "Alta",
    linkedClientId: "cli-2"
  },
  {
    id: "con-4",
    sociedadId: "soc-1",
    companyId: "comp-2",
    name: "Beatriz Maza",
    email: "b.maza@innovacionmedica.com",
    phone: "+34 689 777 666",
    role: "Directora Financiera (CFO)",
    decisionRole: "Comprador",
    influenceLevel: "Alta",
    linkedClientId: null
  },
  {
    id: "con-5",
    sociedadId: "soc-1",
    companyId: "comp-4",
    name: "Alejandro Prieto López",
    email: "aprieto@FinanzasGlobal.com",
    phone: "+34 644 998 877",
    role: "Socio Director",
    decisionRole: "Decisor",
    influenceLevel: "Alta",
    linkedClientId: "cli-4"
  }
];

export const initialInteractions = [
  {
    id: "int-1",
    sociedadId: "soc-1",
    clientId: "cli-1",
    type: "reunion",
    title: "Reunión Presencial - Presentación de Arquitectura Cloud",
    summary: "Se revisó la propuesta técnica con el equipo de infraestructura. María aprobó el plan de migración inicial para el Q4.",
    date: "2026-08-01T10:30:00",
    author: "Javier Hidalgo (Account Executive)",
    duration: "60 min",
    outcome: "Exitosa",
    sentiment: "Positivo"
  },
  {
    id: "int-2",
    sociedadId: "soc-1",
    clientId: "cli-1",
    type: "correo",
    title: "Envío de Presupuesto Actualizado v2.1",
    summary: "Se envió por correo el documento de presupuesto formal con el descuento del 10% acordado en licenciamiento anual.",
    date: "2026-08-03T16:15:00",
    author: "Javier Hidalgo",
    duration: "-",
    outcome: "Información enviada",
    sentiment: "Positivo"
  },
  {
    id: "int-3",
    sociedadId: "soc-1",
    clientId: "cli-2",
    type: "llamada",
    title: "Llamada de seguimiento sobre integraciones RGPD",
    summary: "Carlos confirmó que el departamento legal dio luz verde al anexo de protección de datos.",
    date: "2026-08-04T12:00:00",
    author: "Sofía Martínez",
    duration: "15 min",
    outcome: "Exitosa",
    sentiment: "Positivo"
  },
  {
    id: "int-4",
    sociedadId: "soc-1",
    clientId: "cli-3",
    type: "nota",
    title: "Nota interna: Evaluación de presupuesto",
    summary: "Lead cualificado por el equipo SDR. Interesados principalmente en el módulo de optimización de rutas.",
    date: "2026-07-21T09:00:00",
    author: "Roberto Gómez (SDR)",
    duration: "-",
    outcome: "Seguimiento requerido",
    sentiment: "Neutral"
  },
  {
    id: "int-5",
    sociedadId: "soc-1",
    clientId: "cli-4",
    type: "reunion",
    title: "Comité Trimestral de Revisión de Servicio",
    summary: "Reunión de valoración de satisfacción (NPS: 10/10). Solicitaron ampliar 20 licencias adicionales.",
    date: "2026-07-28T11:00:00",
    author: "Javier Hidalgo",
    duration: "45 min",
    outcome: "Exitosa",
    sentiment: "Positivo"
  }
];

export const initialDeals = [
  {
    id: "deal-1",
    sociedadId: "soc-1",
    title: "Implementación ERP Cloud & CRM Integrado",
    clientId: "cli-1",
    clientName: "María Fernández Gómez",
    companyName: "TechSoluciones Iberia",
    amount: 85000,
    stage: "negotiation",
    probability: 85,
    expectedCloseDate: "2026-08-25",
    owner: "Javier Hidalgo",
    priority: "Alta",
    notes: "Pendiente de la firma final del contrato tras revisión de SLA.",
    dateCreated: "2026-06-10"
  },
  {
    id: "deal-2",
    sociedadId: "soc-1",
    title: "Módulo de Gestión de Pacientes & Citas",
    clientId: "cli-2",
    clientName: "Carlos Ruiz Alarcón",
    companyName: "Innovación Médica S.L.",
    amount: 42000,
    stage: "proposal",
    probability: 60,
    expectedCloseDate: "2026-09-15",
    owner: "Sofía Martínez",
    priority: "Media",
    notes: "Propuesta de precios enviada. Pendiente reunión con CFO.",
    dateCreated: "2026-07-05"
  },
  {
    id: "deal-3",
    sociedadId: "soc-1",
    title: "Optimización de Flotas & Logística",
    clientId: "cli-3",
    clientName: "Laura Morales Santos",
    companyName: "Grupo Logística Madrid",
    amount: 28000,
    stage: "qualification",
    probability: 40,
    expectedCloseDate: "2026-10-01",
    owner: "Roberto Gómez",
    priority: "Media",
    notes: "Demo programada para la próxima semana.",
    dateCreated: "2026-07-22"
  },
  {
    id: "deal-4",
    sociedadId: "soc-1",
    title: "Ampliación Licencias Enterprise Q3",
    clientId: "cli-4",
    clientName: "Alejandro Prieto López",
    companyName: "Finanzas Global Consulting",
    amount: 110000,
    stage: "won",
    probability: 100,
    expectedCloseDate: "2026-07-30",
    owner: "Javier Hidalgo",
    priority: "Alta",
    notes: "Cerrada y firmada con éxito por 2 años.",
    dateCreated: "2026-05-15"
  },
  {
    id: "deal-5",
    sociedadId: "soc-1",
    title: "Renovación Anual Sistema Térmico",
    clientId: "cli-5",
    clientName: "Elena Pastor Benítez",
    companyName: "EcoEnergía del Sur",
    amount: 18000,
    stage: "lost",
    probability: 0,
    expectedCloseDate: "2026-07-10",
    owner: "Sofía Martínez",
    priority: "Baja",
    notes: "Perdido frente a competencia por motivo de precio.",
    dateCreated: "2026-04-01"
  },
  {
    id: "deal-6",
    sociedadId: "soc-2",
    title: "Adquisición Complejo Edificio Velázquez",
    clientId: "cli-6",
    clientName: "Gonzalo Ramos Ibáñez",
    companyName: "Patrimonio Hispania Capital",
    amount: 450000,
    stage: "negotiation",
    probability: 90,
    expectedCloseDate: "2026-09-30",
    owner: "Javier Hidalgo",
    priority: "Alta",
    notes: "Operación clave para la sociedad Inversiones Hispania.",
    dateCreated: "2026-06-15"
  }
];

export const initialTasks = [
  {
    id: "tsk-1",
    sociedadId: "soc-1",
    title: "Enviar borrador de contrato firmado a TechSoluciones",
    clientId: "cli-1",
    clientName: "María Fernández",
    dealId: "deal-1",
    dueDate: "2026-08-07",
    priority: "Alta",
    status: "pending",
    type: "Firma Contrato",
    assignedTo: "Javier Hidalgo",
    notes: "Incluir cláusula de soporte técnico 24/7."
  },
  {
    id: "tsk-2",
    sociedadId: "soc-1",
    title: "Llamada de confirmación de demo con Laura Morales",
    clientId: "cli-3",
    clientName: "Laura Morales",
    dealId: "deal-3",
    dueDate: "2026-08-06",
    priority: "Media",
    status: "pending",
    type: "Llamada",
    assignedTo: "Roberto Gómez",
    notes: "Verificar si asistirá el jefe de IT."
  },
  {
    id: "tsk-3",
    sociedadId: "soc-1",
    title: "Preparar presentación ejecutiva para Innovación Médica",
    clientId: "cli-2",
    clientName: "Carlos Ruiz",
    dealId: "deal-2",
    dueDate: "2026-08-10",
    priority: "Alta",
    status: "in_progress",
    type: "Reunión",
    assignedTo: "Sofía Martínez",
    notes: "Enfocar diapositivas en retorno de inversión a 12 meses."
  },
  {
    id: "tsk-4",
    sociedadId: "soc-1",
    title: "Enviar factura proforma licencias Q3",
    clientId: "cli-4",
    clientName: "Alejandro Prieto",
    dealId: "deal-4",
    dueDate: "2026-08-02",
    priority: "Baja",
    status: "completed",
    type: "Enviar Propuesta",
    assignedTo: "Javier Hidalgo",
    notes: "Factura enviada al departamento de contabilidad."
  }
];

export const initialDocuments = [
  {
    id: "doc-1",
    sociedadId: "soc-1",
    clientId: "cli-1",
    clientName: "María Fernández (TechSoluciones)",
    title: "Presupuesto_Enterprise_v2.1.pdf",
    relativePath: "Google Drive/NexusCRM_EmpresaDemo/documentos_clientes/cli-1/Presupuesto_Enterprise_v2.1.pdf",
    type: "Presupuesto",
    category: "Comercial",
    status: "Firmado",
    dateCreated: "2026-08-01",
    fileSize: "2.4 MB",
    author: "Javier Hidalgo",
    version: "2.1",
    url: "#"
  },
  {
    id: "doc-2",
    sociedadId: "soc-1",
    clientId: "cli-1",
    clientName: "María Fernández (TechSoluciones)",
    title: "Contrato_Servicios_Cloud_2026.pdf",
    relativePath: "Google Drive/NexusCRM_EmpresaDemo/documentos_clientes/cli-1/Contrato_Servicios_Cloud_2026.pdf",
    type: "Contrato",
    category: "Legal",
    status: "Enviado",
    dateCreated: "2026-08-03",
    fileSize: "4.1 MB",
    author: "Asesoría Legal",
    version: "1.0",
    url: "#"
  },
  {
    id: "doc-3",
    sociedadId: "soc-1",
    clientId: "cli-2",
    clientName: "Carlos Ruiz (Innovación Médica)",
    title: "Propuesta_Tecnica_Salud360.pdf",
    relativePath: "Google Drive/NexusCRM_EmpresaDemo/documentos_clientes/cli-2/Propuesta_Tecnica_Salud360.pdf",
    type: "Propuesta",
    category: "Técnica",
    status: "Enviado",
    dateCreated: "2026-07-25",
    fileSize: "5.8 MB",
    author: "Sofía Martínez",
    version: "1.2",
    url: "#"
  },
  {
    id: "doc-4",
    sociedadId: "soc-1",
    clientId: "cli-4",
    clientName: "Alejandro Prieto (Finanzas Global)",
    title: "Anexo_Acuerdo_Nivel_Servicio_SLA.pdf",
    relativePath: "Google Drive/NexusCRM_EmpresaDemo/documentos_clientes/cli-4/Anexo_Acuerdo_Nivel_Servicio_SLA.pdf",
    type: "Expediente",
    category: "Garantía",
    status: "Firmado",
    dateCreated: "2026-05-18",
    fileSize: "1.2 MB",
    author: "Javier Hidalgo",
    version: "1.0",
    url: "#"
  }
];

export const initialAutomations = [
  {
    id: "auto-1",
    sociedadId: "soc-1",
    name: "Alerta automática por Oportunidad > 50.000 €",
    trigger: "Al cambiar estado de trato a Negociación",
    condition: "Valor mayor a 50.000 €",
    action: "Crear tarea prioritaria para Gerencia y enviar aviso por correo",
    enabled: true,
    executionsCount: 14,
    lastTriggered: "2026-08-03 16:20"
  },
  {
    id: "auto-2",
    sociedadId: "soc-1",
    name: "Asignación de tareas tras registro de Lead Web",
    trigger: "Nuevo cliente creado con origen Formulario Web",
    condition: "Ninguna",
    action: "Asignar automáticamente al SDR de guardia y programar llamada en 24h",
    enabled: true,
    executionsCount: 29,
    lastTriggered: "2026-07-20 11:05"
  },
  {
    id: "auto-3",
    sociedadId: "soc-1",
    name: "Recordatorio de vencimiento de documento",
    trigger: "7 días antes de fecha fin de contrato",
    condition: "Cliente con etiqueta VIP",
    action: "Notificar al gestor de cuenta por notificación Push y Email",
    enabled: false,
    executionsCount: 5,
    lastTriggered: "2026-06-15 09:30"
  },
  {
    id: "auto-4",
    sociedadId: "soc-1",
    name: "Bienvenida automatizada a nuevos Clientes Activos",
    trigger: "Cambio de estado del cliente a 'Activo'",
    condition: "Correo electrónico validado",
    action: "Enviar email de bienvenida con manual de onboarding y credenciales",
    enabled: true,
    executionsCount: 42,
    lastTriggered: "2026-08-01 14:10"
  }
];

export const initialIntegrations = {
  email: {
    connected: true,
    provider: "Google Workspace / Gmail",
    emailAccount: "ventas@nexus-crm.es",
    autoSync: true,
    lastSync: "Hace 5 minutos"
  },
  calendar: {
    connected: true,
    provider: "Google Calendar & Office 365",
    account: "agenda.comercial@nexus-crm.es",
    autoSync: true,
    syncMeetings: true
  },
  voip: {
    connected: true,
    provider: "Aircall / Twilio VoIP",
    phoneNumber: "+34 910 00 22 11",
    clickToCall: true,
    recordCalls: true
  },
  webForms: {
    connected: true,
    activeFormsCount: 3,
    totalLeadsCaptured: 148,
    embedSnippet: '<iframe src="https://nexus-crm.es/embed/lead-form" width="100%" height="450"></iframe>'
  },
  webhooks: {
    connected: true,
    endpointUrl: "https://api.nexus-crm.es/v1/webhooks/inbound",
    zapierIntegration: true,
    makeIntegration: true
  }
};
