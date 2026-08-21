import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { ClientCard } from './ClientCard';
import {
  Users,
  Search,
  Filter,
  Grid,
  List as ListIcon,
  Plus,
  Star,
  Sparkles,
  HeartPulse,
  Mail,
  Phone,
  Building2,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const ClientList = ({ onOpenNewClientModal }) => {
  const { clients, setSelectedClientId, selectedClientId } = useCRM();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [statusFilter, setStatusFilter] = useState('all');
  const [interestFilter, setInterestFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Segmentation Filter Logic
  const filteredClients = clients.filter((client) => {
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesInterest = interestFilter === 'all' || client.interestLevel === interestFilter;
    const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.cif && client.cif.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesInterest && matchesIndustry && matchesSearch;
  });

  // Key KPI summaries
  const totalClients = clients.length;
  const vipCount = clients.filter((c) => c.status === 'vip').length;
  const leadsCount = clients.filter((c) => c.status === 'lead').length;
  const avgHealth = Math.round(
    clients.reduce((acc, c) => acc + (c.healthScore || 0), 0) / (totalClients || 1)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Segmentation KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Clientes en Cartera</p>
            <p className="text-2xl font-extrabold text-white mt-1">{totalClients}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Clientes VIP</p>
            <p className="text-2xl font-extrabold text-amber-300 mt-1">{vipCount}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Star className="w-5 h-5 fill-amber-400/20" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Leads en Calificación</p>
            <p className="text-2xl font-extrabold text-indigo-300 mt-1">{leadsCount}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Salud Media Cartera</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">{avgHealth}%</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filter & Segmentation Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Filtrar por nombre, CIF, empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/90 text-xs text-slate-100 pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Estado: Todos</option>
            <option value="vip">⭐ VIP</option>
            <option value="activo">🟢 Activo</option>
            <option value="lead">🔵 Lead</option>
            <option value="inactivo">⚪ Inactivo</option>
          </select>

          {/* Interest filter */}
          <select
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Interés: Todos</option>
            <option value="alto">Alto 🔥</option>
            <option value="medio">Medio</option>
            <option value="bajo">Bajo</option>
          </select>

          {/* Industry filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Sector: Todos</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Salud">Salud</option>
            <option value="Finanzas">Finanzas</option>
            <option value="Logística">Logística</option>
            <option value="Energía">Energía</option>
          </select>

          {/* View mode buttons */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 ml-auto md:ml-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Vista en Cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Vista en Tabla"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Client List Content */}
      {filteredClients.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-3">
          <Users className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-300 font-semibold">No se encontraron clientes con los filtros aplicados.</p>
          <p className="text-xs text-slate-400">Intenta reiniciar la búsqueda o cambiar la segmentación.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} onSelect={setSelectedClientId} />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Empresa / Cargo</th>
                  <th className="p-4">Sector</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Presupuesto</th>
                  <th className="p-4 text-center">Salud</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={client.avatar} alt={client.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                        <div>
                          <p className="font-bold text-white text-sm">{client.name}</p>
                          <p className="text-[11px] text-slate-400">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-indigo-300">{client.company}</p>
                      <p className="text-[11px] text-slate-400">{client.role}</p>
                    </td>
                    <td className="p-4 text-slate-300">{client.industry}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        client.status === 'vip' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        client.status === 'activo' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        client.status === 'lead' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-200">{client.annualBudget || 'N/D'}</td>
                    <td className="p-4 text-center font-bold text-emerald-400">{client.healthScore}%</td>
                    <td className="p-4 text-right">
                      <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs flex items-center gap-1 ml-auto">
                        Ver Ficha <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
