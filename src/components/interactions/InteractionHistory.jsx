import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  PhoneCall,
  Mail,
  Users,
  FileText,
  Plus,
  Filter,
  Calendar,
  Clock,
  User,
  Smile,
  Meh,
  Frown,
  Trash2,
  Building2
} from 'lucide-react';

export const InteractionHistory = () => {
  const { interactions, clients, addInteraction, deleteInteraction } = useCRM();

  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedClientFilter, setSelectedClientFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New interaction state
  const [newType, setNewType] = useState('llamada');
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newDuration, setNewDuration] = useState('15 min');
  const [newOutcome, setNewOutcome] = useState('Exitosa');
  const [newSentiment, setNewSentiment] = useState('Positivo');

  const filteredInteractions = interactions.filter((int) => {
    const matchesType = typeFilter === 'all' || int.type === typeFilter;
    const matchesClient = selectedClientFilter === 'all' || int.clientId === selectedClientFilter;
    return matchesType && matchesClient;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'llamada': return <PhoneCall className="w-4 h-4 text-emerald-400" />;
      case 'correo': return <Mail className="w-4 h-4 text-indigo-400" />;
      case 'reunion': return <Users className="w-4 h-4 text-amber-400" />;
      default: return <FileText className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getSentimentBadge = (sentiment) => {
    switch (sentiment) {
      case 'Positivo':
        return <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Smile className="w-3 h-3" /> Positivo</span>;
      case 'Negativo':
        return <span className="bg-rose-500/10 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Frown className="w-3 h-3" /> Negativo</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Meh className="w-3 h-3" /> Neutral</span>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    addInteraction({
      clientId: newClientId,
      type: newType,
      title: newTitle,
      summary: newSummary,
      duration: newDuration,
      outcome: newOutcome,
      sentiment: newSentiment
    });

    setNewTitle('');
    setNewSummary('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white font-heading">Historial de Interacciones & Registros</h2>
          <p className="text-xs text-slate-400">Seguimiento cronológico de llamadas, correos, reuniones y notas internas.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Tipo: Todos</option>
            <option value="llamada">📞 Llamadas</option>
            <option value="correo">✉️ Correos</option>
            <option value="reunion">👥 Reuniones</option>
            <option value="nota">📝 Notas</option>
          </select>

          {/* Client filter */}
          <select
            value={selectedClientFilter}
            onChange={(e) => setSelectedClientFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500 max-w-[200px]"
          >
            <option value="all">Cliente: Todos</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
            ))}
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" /> Registrar Interacción
          </button>
        </div>
      </div>

      {/* New Interaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading">Registrar Nueva Interacción</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cliente Asignado</label>
                <select
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} - {c.company}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tipo de Interacción</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="llamada">Llamada Telefónica</option>
                    <option value="correo">Correo Electrónico</option>
                    <option value="reunion">Reunión Presencial/Videollamada</option>
                    <option value="nota">Nota Interna</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Duración Estimada</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                    placeholder="ej. 30 min"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Título Asunto</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  placeholder="Resumen ejecutivo del tema tratado..."
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Detalle / Notas de la Conversación</label>
                <textarea
                  required
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  placeholder="Detalles clave, compromisos adquiridos y próximos pasos..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Resultado / Outcome</label>
                  <select
                    value={newOutcome}
                    onChange={(e) => setNewOutcome(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Exitosa">Exitosa</option>
                    <option value="Seguimiento requerido">Seguimiento requerido</option>
                    <option value="Sin respuesta">Sin respuesta</option>
                    <option value="Información enviada">Información enviada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Sentimiento del Cliente</label>
                  <select
                    value={newSentiment}
                    onChange={(e) => setNewSentiment(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Positivo">Positivo 😊</option>
                    <option value="Neutral">Neutral 😐</option>
                    <option value="Negativo">Negativo ☹️</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-xl shadow-md"
                >
                  Guardar Interacción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Timeline Display */}
      <div className="space-y-4">
        {filteredInteractions.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center">
            <PhoneCall className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No hay interacciones para el filtro seleccionado.</p>
          </div>
        ) : (
          filteredInteractions.map((int) => {
            const clientObj = clients.find((c) => c.id === int.clientId);
            return (
              <div key={int.id} className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    {getTypeIcon(int.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                        {int.type}
                      </span>
                      <h3 className="font-bold text-white text-sm font-heading">{int.title}</h3>
                      {getSentimentBadge(int.sentiment)}
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                      "{int.summary}"
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-3 flex-wrap">
                      {clientObj && (
                        <span className="flex items-center gap-1 text-slate-300 font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-indigo-400" /> {clientObj.name} ({clientObj.company})
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> {int.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" /> {int.author}
                      </span>
                      <span className="text-emerald-400 font-medium">Resultado: {int.outcome}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(int.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={() => deleteInteraction(int.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Eliminar registro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
