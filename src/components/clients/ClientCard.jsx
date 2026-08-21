import React from 'react';
import { Mail, Phone, Building2, Tag, ChevronRight, Star, HeartPulse } from 'lucide-react';

export const ClientCard = ({ client, onSelect }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'vip':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">⭐ VIP</span>;
      case 'activo':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">🟢 Activo</span>;
      case 'lead':
        return <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">🔵 Lead</span>;
      default:
        return <span className="bg-slate-800 text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">Inactivo</span>;
    }
  };

  return (
    <div
      onClick={() => onSelect(client.id)}
      className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer group relative flex flex-col justify-between transition-all duration-200"
    >
      <div>
        {/* Header: Avatar, Name & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={client.avatar}
              alt={client.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700 group-hover:border-indigo-400 transition-colors shadow-md"
            />
            <div>
              <h3 className="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors text-sm font-heading">
                {client.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[170px]">{client.role}</p>
            </div>
          </div>
          {getStatusBadge(client.status)}
        </div>

        {/* Company & Industry */}
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 mb-3 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold truncate">
            <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{client.company}</span>
          </div>
          <p className="text-[11px] text-slate-400 pl-5.5">{client.industry} • Presupuesto: <strong className="text-slate-200">{client.annualBudget || 'N/D'}</strong></p>
        </div>

        {/* Contact details */}
        <div className="space-y-1 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{client.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{client.phone}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {client.tags && client.tags.map((tag, idx) => (
            <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md font-medium border border-slate-700/60">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Health Score meter & Action */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs text-slate-400 font-medium">Salud:</span>
          <span className="text-xs font-extrabold text-slate-200">{client.healthScore}%</span>
        </div>

        <span className="text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          Ficha 360° <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
