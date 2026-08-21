import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { FolderGit2, Plus, FileText, Download, Eye, Trash2, Tag, Calendar, User, Search, CheckCircle } from 'lucide-react';

export const DocumentVault = () => {
  const { documents, clients, addDocument, deleteDocument } = useCRM();

  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Presupuesto');
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newCategory, setNewCategory] = useState('Comercial');
  const [newStatus, setNewStatus] = useState('Enviado');

  const filteredDocs = documents.filter((doc) => {
    return typeFilter === 'all' || doc.type === typeFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Firmado':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">✓ Firmado</span>;
      case 'Enviado':
        return <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">📩 Enviado</span>;
      case 'Borrador':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">📝 Borrador</span>;
      default:
        return <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">❌ Rechazado</span>;
    }
  };

  const handleCreateDocument = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const selectedClientObj = clients.find((c) => c.id === newClientId);

    addDocument({
      title: newTitle.endsWith('.pdf') ? newTitle : `${newTitle}.pdf`,
      type: newType,
      clientId: newClientId,
      clientName: selectedClientObj ? selectedClientObj.name : 'Cliente',
      category: newCategory,
      status: newStatus,
      fileSize: '3.1 MB'
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-cyan-400" /> Bóveda de Documentos & Expedientes
          </h2>
          <p className="text-xs text-slate-400">Gestor de presupuestos, propuestas comerciales, contratos y anexos legales.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Tipo: Todos</option>
            <option value="Presupuesto">📄 Presupuestos</option>
            <option value="Contrato">📜 Contratos</option>
            <option value="Propuesta">💡 Propuestas</option>
            <option value="Expediente">📁 Expedientes</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" /> Subir Documento
          </button>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading">Adjuntar Nuevo Documento</h3>
            <form onSubmit={handleCreateDocument} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Nombre del Archivo / Documento</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  placeholder="ej. Presupuesto_Servicios_Cloud_2026.pdf"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cliente Vinculado</label>
                <select
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tipo de Documento</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Presupuesto">Presupuesto</option>
                    <option value="Contrato">Contrato</option>
                    <option value="Propuesta">Propuesta</option>
                    <option value="Expediente">Expediente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Estado Inicial</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Enviado">Enviado</option>
                    <option value="Borrador">Borrador</option>
                    <option value="Firmado">Firmado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-slate-400">Cancelar</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-1.5 rounded-xl">Subir Documento</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal Simulator */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-2xl shadow-2xl p-6 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">{selectedDocPreview.title}</h3>
              <button onClick={() => setSelectedDocPreview(null)} className="text-slate-400 hover:text-white">Cerrar</button>
            </div>
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center space-y-4 py-12">
              <FileText className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
              <div>
                <p className="text-sm font-bold text-white">Previsualización Segura del Documento PDF</p>
                <p className="text-xs text-slate-400 mt-1">Cliente: {selectedDocPreview.clientName} • Versión {selectedDocPreview.version}</p>
              </div>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                Este documento digital ha sido verificado con firma criptográfica y almacenado en la bóveda de NexusCRM.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center col-span-3">
            <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No hay documentos registrados para esta categoría.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div key={doc.id} className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 space-y-3 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors truncate max-w-[180px]">
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">{doc.clientName}</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>

              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>Categoría: <strong className="text-slate-200">{doc.category}</strong></span>
                <span>Tamaño: {doc.fileSize}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-500" /> {doc.dateCreated}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedDocPreview(doc)}
                    className="p-1.5 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                    title="Previsualizar"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
