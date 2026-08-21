import React, { useState, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  X,
  Building2,
  Mail,
  Phone,
  Tag,
  DollarSign,
  HeartPulse,
  Calendar,
  ShieldCheck,
  PhoneCall,
  Kanban,
  CheckSquare,
  FolderGit2,
  Plus,
  Trash2,
  ExternalLink,
  MessageSquare,
  Edit,
  Save,
  Loader2
} from 'lucide-react';

export const ClientDetailModal = ({ clientId, onClose }) => {
  const {
    clients,
    interactions,
    deals,
    tasks,
    documents,
    updateClient,
    deleteClient,
    addInteraction
  } = useCRM();

  const client = clients.find((c) => c.id === clientId);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'interactions', 'deals', 'tasks', 'docs'

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  // Sync edit form state whenever client changes
  useEffect(() => {
    if (client) {
      setEditForm({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        company: client.company || '',
        role: client.role || '',
        status: client.status || 'lead',
        industry: client.industry || 'Tecnología',
        cif: client.cif || '',
        annualBudget: client.annualBudget !== undefined ? client.annualBudget : 50000,
        healthScore: client.healthScore !== undefined ? client.healthScore : 80,
        interestLevel: client.interestLevel || 'alto',
        tagsInput: Array.isArray(client.tags) ? client.tags.join(', ') : '',
        notes: client.notes || ''
      });
    }
  }, [client]);

  // New interaction mini form state
  const [showAddInt, setShowAddInt] = useState(false);
  const [newIntType, setNewIntType] = useState('llamada');
  const [newIntTitle, setNewIntTitle] = useState('');
  const [newIntSummary, setNewIntSummary] = useState('');

  if (!client) return null;

  const clientInteractions = interactions.filter((i) => i.clientId === client.id);
  const clientDeals = deals.filter((d) => d.clientId === client.id);
  const clientTasks = tasks.filter((t) => t.clientId === client.id);
  const clientDocs = documents.filter((doc) => doc.clientId === client.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'vip':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">⭐ VIP</span>;
      case 'activo':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">🟢 Cliente Activo</span>;
      case 'lead':
        return <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">🔵 Lead Cualificado</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">⚪ Inactivo</span>;
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const tagsArray = editForm.tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      await updateClient(client.id, {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone || null,
        company: editForm.company || null,
        role: editForm.role || null,
        status: editForm.status,
        industry: editForm.industry || null,
        cif: editForm.cif || null,
        annualBudget: parseFloat(editForm.annualBudget) || 0,
        healthScore: parseInt(editForm.healthScore) || 80,
        interestLevel: editForm.interestLevel,
        tags: tagsArray,
        notes: editForm.notes || null
      });

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateInteraction = async (e) => {
    e.preventDefault();
    if (!newIntTitle || !newIntSummary) return;
    await addInteraction({
      clientId: client.id,
      type: newIntType,
      title: newIntTitle,
      summary: newIntSummary,
      duration: newIntType === 'llamada' || newIntType === 'reunion' ? '30 min' : '-',
      outcome: 'Exitosa',
      sentiment: 'Positivo'
    });
    setNewIntTitle('');
    setNewIntSummary('');
    setShowAddInt(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-3xl h-full flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header Profile Summary */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/30 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <img
              src={client.avatar}
              alt={client.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white font-heading">{client.name}</h2>
                {getStatusBadge(client.status)}
              </div>
              <p className="text-sm text-slate-300 font-medium mt-1">
                {client.role || 'Sin Cargo'} <span className="text-slate-500">•</span> <span className="text-indigo-400 font-semibold">{client.company || 'Sin Empresa'}</span>
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-indigo-400" /> {client.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {client.phone || 'No asignado'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
              title="Modificar datos de este cliente"
            >
              <Edit className="w-4 h-4" />
              <span>Editar Ficha</span>
            </button>
            <button
              onClick={() => deleteClient(client.id)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
              title="Eliminar cliente"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-6 gap-2">
          {[
            { id: 'overview', label: 'Información General', icon: Building2 },
            { id: 'interactions', label: `Interacciones (${clientInteractions.length})`, icon: PhoneCall },
            { id: 'deals', label: `Oportunidades (${clientDeals.length})`, icon: Kanban },
            { id: 'tasks', label: `Tareas (${clientTasks.length})`, icon: CheckSquare },
            { id: 'docs', label: `Documentos (${clientDocs.length})`, icon: FolderGit2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs font-semibold transition-all ${
                  active
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Health Score & Key Metrics Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Salud del Cliente</p>
                    <p className="text-2xl font-extrabold text-white mt-1">{client.healthScore}/100</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <HeartPulse className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Presupuesto Anual</p>
                    <p className="text-xl font-bold text-indigo-300 mt-1">
                      {typeof client.annualBudget === 'number' ? `${client.annualBudget.toLocaleString('es-ES')} €` : (client.annualBudget || 'No especificado')}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Nivel de Interés</p>
                    <p className="text-sm font-extrabold capitalize text-amber-300 mt-1">{client.interestLevel || 'alto'} 🔥</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Tag className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* General Info Grid */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Datos Clave de la Ficha</h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" /> Editar Datos
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">CIF / Identificación Fiscal:</span>
                    <span className="font-semibold text-slate-200">{client.cif || 'B-99887766'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Sector de Actividad:</span>
                    <span className="font-semibold text-indigo-300">{client.industry || 'Tecnología'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Origen del Lead:</span>
                    <span className="font-semibold text-slate-200">{client.source || 'Formulario Web'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Fecha de Alta en Sistema:</span>
                    <span className="font-semibold text-slate-200">
                      {client.dateAdded ? new Date(client.dateAdded).toLocaleDateString('es-ES') : 'Reciente'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Etiquetas de Segmentación</h3>
                <div className="flex flex-wrap gap-2">
                  {client.tags && client.tags.length > 0 ? (
                    client.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-800 text-indigo-300 border border-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">Sin etiquetas</span>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Observaciones y Notas Clave</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800 italic">
                  "{client.notes || 'Sin observaciones adicionales.'}"
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIONS */}
          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Historial de Interacciones</h3>
                <button
                  onClick={() => setShowAddInt(true)}
                  className="flex items-center gap-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Registrar Interacción
                </button>
              </div>

              {/* Interactions Timeline */}
              <div className="space-y-3">
                {clientInteractions.length === 0 ? (
                  <div className="glass-panel p-10 rounded-2xl border border-slate-800 text-center space-y-2">
                    <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-300 font-semibold">No hay interacciones registradas para este cliente.</p>
                    <button
                      onClick={() => setShowAddInt(true)}
                      className="text-xs text-indigo-400 hover:underline font-semibold"
                    >
                      + Registrar la primera interacción
                    </button>
                  </div>
                ) : (
                  clientInteractions.map((int) => (
                    <div key={int.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white">{int.title}</h4>
                          <span className="text-[10px] text-slate-400">{new Date(int.date).toLocaleDateString('es-ES')}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{int.summary}</p>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2">
                          <span>Autor: <strong className="text-slate-300">{int.author || 'Sistema'}</strong></span>
                          <span>Duración: {int.duration || '-'}</span>
                          <span className="text-emerald-400 font-semibold">{int.outcome}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DEALS */}
          {activeTab === 'deals' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">Oportunidades y Tratamientos en Embudo</h3>
              {clientDeals.length === 0 ? (
                <div className="glass-panel p-10 rounded-2xl border border-slate-800 text-center">
                  <Kanban className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No hay oportunidades abiertas para este cliente.</p>
                </div>
              ) : (
                clientDeals.map((deal) => (
                  <div key={deal.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{deal.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Etapa: <span className="uppercase text-indigo-400 font-semibold">{deal.stage}</span> • Cierre est.: {deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toLocaleDateString('es-ES') : 'N/D'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-emerald-400">{deal.amount.toLocaleString('es-ES')} €</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{deal.probability}% Probabilidad</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">Tareas y Acciones Pendientes</h3>
              {clientTasks.length === 0 ? (
                <div className="glass-panel p-10 rounded-2xl border border-slate-800 text-center">
                  <CheckSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No hay tareas pendientes para este cliente.</p>
                </div>
              ) : (
                clientTasks.map((task) => (
                  <div key={task.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{task.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Tipo: {task.type} • Vence: <strong className="text-rose-400">{task.dueDate ? new Date(task.dueDate).toLocaleDateString('es-ES') : 'N/D'}</strong></p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                      {task.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: DOCS */}
          {activeTab === 'docs' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">Expedientes y Documentos Adjuntos</h3>
              {clientDocs.length === 0 ? (
                <div className="glass-panel p-10 rounded-2xl border border-slate-800 text-center">
                  <FolderGit2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No hay documentos adjuntos para este cliente.</p>
                </div>
              ) : (
                clientDocs.map((doc) => (
                  <div key={doc.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="w-5 h-5 text-cyan-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                        <p className="text-[10px] text-slate-400">{doc.type} • {doc.fileSize} • Version {doc.version}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {doc.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* STANDALONE FLOATING MODAL 1: EDIT CLIENT */}
      {isEditing && (
        <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-indigo-500/50 w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-400" /> Editar Ficha de Cliente ({client.name})
              </h3>
              <button onClick={() => setIsEditing(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Empresa</label>
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Cargo / Puesto</label>
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Estado</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="lead">🔵 Lead</option>
                    <option value="activo">🟢 Cliente Activo</option>
                    <option value="vip">⭐ VIP</option>
                    <option value="inactivo">⚪ Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Sector</label>
                  <select
                    value={editForm.industry}
                    onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Tecnología">Tecnología</option>
                    <option value="Salud">Salud</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Logística">Logística</option>
                    <option value="Energía">Energía</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Presupuesto (€)</label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.annualBudget}
                    onChange={(e) => setEditForm({ ...editForm, annualBudget: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Salud (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.healthScore}
                    onChange={(e) => setEditForm({ ...editForm, healthScore: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Interés</label>
                  <select
                    value={editForm.interestLevel}
                    onChange={(e) => setEditForm({ ...editForm, interestLevel: e.target.value })}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="alto">Alto 🔥</option>
                    <option value="medio">Medio</option>
                    <option value="bajo">Bajo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Etiquetas (separadas por coma)</label>
                <input
                  type="text"
                  value={editForm.tagsInput}
                  onChange={(e) => setEditForm({ ...editForm, tagsInput: e.target.value })}
                  placeholder="Enterprise, SaaS, Prioritario"
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Observaciones</label>
                <textarea
                  rows={2}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={saving}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Guardar Cambios en la API
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STANDALONE FLOATING MODAL 2: ADD INTERACTION */}
      {showAddInt && (
        <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">Registrar Interacción para {client.name}</h3>
              <button onClick={() => setShowAddInt(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInteraction} className="space-y-3 text-xs">
              <div className="flex gap-2">
                {['llamada', 'correo', 'reunion', 'nota'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setNewIntType(t)}
                    className={`capitalize px-3 py-1.5 text-xs font-semibold rounded-xl flex-1 transition-all ${
                      newIntType === t ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Título de la Interacción *</label>
                <input
                  type="text"
                  placeholder="ej. Llamada de seguimiento de propuesta"
                  value={newIntTitle}
                  onChange={(e) => setNewIntTitle(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Resumen o Notas *</label>
                <textarea
                  placeholder="Resumen de los puntos clave acordados..."
                  value={newIntSummary}
                  onChange={(e) => setNewIntSummary(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowAddInt(false)} className="px-3 py-1.5 text-slate-400">Cancelar</button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-xl shadow-md">Guardar Interacción</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
