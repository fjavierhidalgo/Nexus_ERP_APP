import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Search, Plus, Bell, Command, UserPlus, DollarSign, Building2, ChevronDown } from 'lucide-react';

export const Navbar = ({ onOpenNewClientModal, onOpenNewDealModal }) => {
  const { activeTab, setIsSearchOpen, tasks, currentOrganization, setIsOrgSelectorOpen } = useCRM();

  const getTitle = () => {
    switch (activeTab) {
      case 'clients': return 'Ficha de Clientes y Segmentación';
      case 'interactions': return 'Historial de Interacciones';
      case 'relationships': return 'Gestión de Contactos y Relaciones';
      case 'pipeline': return 'Seguimiento de Oportunidades (Embudo)';
      case 'tasks': return 'Tareas y Recordatorios';
      case 'documents': return 'Documentos y Expedientes Adjuntos';
      case 'automations': return 'Automatizaciones Básicas & Reglas';
      case 'analytics': return 'Informes, Métricas & KPIs';
      case 'integrations': return 'Centro de Integraciones';
      default: return 'NexusCRM';
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending').length;

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Active Section Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-white font-heading tracking-tight">{getTitle()}</h2>
      </div>

      {/* Center Search & Actions */}
      <div className="flex items-center gap-3">
        {/* Organization Switcher Button */}
        <button
          onClick={() => setIsOrgSelectorOpen(true)}
          className="flex items-center gap-2 bg-indigo-950/50 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm group"
          title="Cambiar o Registrar Organización Multiempresa"
        >
          <Building2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <p className="text-[10px] text-indigo-400/80 leading-none font-sans uppercase font-bold">Organización</p>
            <p className="font-bold text-white text-xs truncate max-w-[130px]">
              {currentOrganization ? currentOrganization.name : 'Cargando...'}
            </p>
          </div>
          <span className="bg-indigo-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded font-extrabold ml-1">
            {currentOrganization?.code || '1'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
        </button>

        {/* Search Bar Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm group w-56 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
            <span>Buscar cliente, trato...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] bg-slate-900 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded font-mono">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Action Buttons */}
        <button
          onClick={onOpenNewClientModal}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/25 active:scale-95"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Nuevo Cliente</span>
        </button>

        <button
          onClick={onOpenNewDealModal}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs px-3 py-2 rounded-xl transition-all active:scale-95"
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Nueva Oportunidad</span>
        </button>

        {/* Notifications Icon Badge */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-xl bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50 transition-colors"
            title={`${pendingTasks} tareas pendientes`}
          >
            <Bell className="w-4 h-4" />
            {pendingTasks > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center animate-bounce">
                {pendingTasks}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
