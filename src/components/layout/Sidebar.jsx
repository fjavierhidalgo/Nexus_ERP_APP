import React from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Users,
  Building2,
  PhoneCall,
  Kanban,
  CheckSquare,
  FolderGit2,
  Zap,
  BarChart3,
  Share2,
  RefreshCw,
  Sparkles,
  CloudCheck
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, clients, deals, tasks, refetchData, loading } = useCRM();

  const pendingTasksCount = tasks.filter((t) => t.status === 'pending').length;
  const activeDealsCount = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost').length;

  const navItems = [
    { id: 'clients', label: 'Ficha de Clientes', icon: Users, badge: clients.length },
    { id: 'interactions', label: 'Interacciones', icon: PhoneCall },
    { id: 'relationships', label: 'Contactos y Relaciones', icon: Building2 },
    { id: 'pipeline', label: 'Embudo de Ventas', icon: Kanban, badge: activeDealsCount, badgeColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' },
    { id: 'tasks', label: 'Tareas y Avisos', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : null, badgeColor: 'bg-rose-500/20 text-rose-400 border border-rose-500/30' },
    { id: 'documents', label: 'Documentos Adjuntos', icon: FolderGit2 },
    { id: 'automations', label: 'Automatizaciones', icon: Zap },
    { id: 'analytics', label: 'Informes y Métricas', icon: BarChart3 },
    { id: 'integrations', label: 'Integraciones', icon: Share2 },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-white tracking-tight leading-none font-heading flex items-center gap-1.5">
                Nexus<span className="text-indigo-400">CRM</span>
              </h1>
              <p className="text-xs text-emerald-400 mt-1 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" /> API Conectada
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Módulos API REST
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Refetch API */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 space-y-3">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
              JH
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">Javier Hidalgo</p>
              <p className="text-[10px] text-slate-400 truncate">https://erpnexus.somee.com</p>
            </div>
          </div>
          <button
            onClick={refetchData}
            title="Refrescar datos de la API"
            className={`p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors ${loading ? 'animate-spin text-indigo-400' : ''}`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
