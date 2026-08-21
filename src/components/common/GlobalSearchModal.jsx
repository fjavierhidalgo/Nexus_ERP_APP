import React, { useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Search, X, Users, DollarSign, CheckSquare, FolderGit2, ArrowRight } from 'lucide-react';

export const GlobalSearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    clients,
    deals,
    tasks,
    documents,
    setSelectedClientId,
    setActiveTab
  } = useCRM();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filteredClients = query
    ? clients.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.company.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.industry.toLowerCase().includes(query)
      )
    : clients.slice(0, 3);

  const filteredDeals = query
    ? deals.filter((d) => d.title.toLowerCase().includes(query) || d.companyName.toLowerCase().includes(query))
    : deals.slice(0, 3);

  const filteredTasks = query
    ? tasks.filter((t) => t.title.toLowerCase().includes(query) || t.clientName.toLowerCase().includes(query))
    : tasks.slice(0, 3);

  const filteredDocs = query
    ? documents.filter((doc) => doc.title.toLowerCase().includes(query) || doc.clientName.toLowerCase().includes(query))
    : [];

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);
    setActiveTab('clients');
    setIsSearchOpen(false);
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in">
      <div
        className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar por cliente, empresa, trato, tarea o documento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700 font-mono">
            ESC para cerrar
          </span>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1">
          {/* Clientes */}
          {filteredClients.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-indigo-400" /> Clientes</span>
                <span className="text-[10px] text-slate-400 font-normal">{filteredClients.length} resultados</span>
              </div>
              <div className="space-y-1.5">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => handleSelectClient(client.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-indigo-500/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={client.avatar} alt={client.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300">{client.name}</p>
                        <p className="text-xs text-slate-400">{client.company} • <span className="text-indigo-400">{client.role}</span></p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Oportunidades */}
          {filteredDeals.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Oportunidades</span>
              </div>
              <div className="space-y-1.5">
                {filteredDeals.map((deal) => (
                  <button
                    key={deal.id}
                    onClick={() => handleSelectTab('pipeline')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 transition-all text-left group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-emerald-300">{deal.title}</p>
                      <p className="text-xs text-slate-400">{deal.companyName} • Etapa: <span className="uppercase text-slate-300">{deal.stage}</span></p>
                    </div>
                    <span className="font-bold text-sm text-emerald-400">{deal.amount.toLocaleString('es-ES')} €</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tareas */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5 text-rose-400" /> Tareas</span>
              </div>
              <div className="space-y-1.5">
                {filteredTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleSelectTab('tasks')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-rose-500/40 transition-all text-left group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-rose-300">{task.title}</p>
                      <p className="text-xs text-slate-400">Cliente: {task.clientName} • Vence: {task.dueDate}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {task.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documentos */}
          {filteredDocs.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5"><FolderGit2 className="w-3.5 h-3.5 text-cyan-400" /> Documentos</span>
              </div>
              <div className="space-y-1.5">
                {filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectTab('documents')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/40 transition-all text-left group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">{doc.title}</p>
                      <p className="text-xs text-slate-400">{doc.type} • {doc.fileSize}</p>
                    </div>
                    <span className="text-xs text-slate-400">{doc.status}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && filteredClients.length === 0 && filteredDeals.length === 0 && filteredTasks.length === 0 && filteredDocs.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No se encontraron resultados para "<span className="text-slate-200">{searchQuery}</span>"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
