import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { BarChart3, TrendingUp, DollarSign, Clock, Users, CheckCircle2, ArrowUpRight, Award, Target, PhoneCall } from 'lucide-react';

export const ReportsDashboard = () => {
  const { clients, deals, interactions } = useCRM();
  const [timeframe, setTimeframe] = useState('quarter'); // 'month', 'quarter', 'year'

  // Metric Calculations
  const totalRevenue = deals.filter((d) => d.stage === 'won').reduce((acc, d) => acc + d.amount, 0);
  const totalPipeline = deals.filter((d) => d.stage !== 'lost').reduce((acc, d) => acc + d.amount, 0);
  const totalDeals = deals.length;
  const wonDeals = deals.filter((d) => d.stage === 'won').length;
  const conversionRate = Math.round((wonDeals / (totalDeals || 1)) * 100);

  // Interaction breakdown
  const callsCount = interactions.filter((i) => i.type === 'llamada').length;
  const emailsCount = interactions.filter((i) => i.type === 'correo').length;
  const meetingsCount = interactions.filter((i) => i.type === 'reunion').length;
  const notesCount = interactions.filter((i) => i.type === 'nota').length;
  const totalInteractions = interactions.length || 1;

  // Pipeline funnel distribution data
  const funnelData = [
    { stage: 'Prospección', count: deals.filter((d) => d.stage === 'prospection').length, color: 'bg-slate-700' },
    { stage: 'Calificación', count: deals.filter((d) => d.stage === 'qualification').length, color: 'bg-cyan-500' },
    { stage: 'Propuesta', count: deals.filter((d) => d.stage === 'proposal').length, color: 'bg-indigo-500' },
    { stage: 'Negociación', count: deals.filter((d) => d.stage === 'negotiation').length, color: 'bg-amber-500' },
    { stage: 'Cierre (Won)', count: wonDeals, color: 'bg-emerald-500' },
  ];

  const maxFunnel = Math.max(...funnelData.map((f) => f.count), 1);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Timeframe Selector Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" /> Informes de Rendimiento & Métricas Comerciales
          </h2>
          <p className="text-xs text-slate-400">Análisis del embudo de conversión, tiempos de respuesta y proyección de ventas.</p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'month', label: 'Este Mes' },
            { id: 'quarter', label: 'Este Trimestre' },
            { id: 'year', label: 'Este Año' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTimeframe(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeframe === item.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Ingresos Cerrados</span>
            <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" /> +18.4%</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{totalRevenue.toLocaleString('es-ES')} €</p>
          <p className="text-[11px] text-slate-400">Total en operaciones ganadas</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tasa de Conversión</span>
            <span className="text-indigo-400 font-bold flex items-center"><Target className="w-3 h-3" /> Meta 40%</span>
          </div>
          <p className="text-2xl font-extrabold text-indigo-300">{conversionRate}%</p>
          <p className="text-[11px] text-slate-400">Win rate general en embudo</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tiempo Medio de Respuesta</span>
            <span className="text-emerald-400 font-bold">Óptimo</span>
          </div>
          <p className="text-2xl font-extrabold text-white">2.4 horas</p>
          <p className="text-[11px] text-slate-400">Atención inicial a nuevos leads</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Satisfacción Cliente (NPS)</span>
            <span className="text-amber-300 font-bold">9.4 / 10</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-300">94% NPS</p>
          <p className="text-[11px] text-slate-400">Índice de retención y lealtad</p>
        </div>
      </div>

      {/* Main Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Chart 1: Funnel Stage Distribution */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Distribución por Etapa del Embudo
          </h3>
          <div className="space-y-3 pt-2">
            {funnelData.map((item, idx) => {
              const percentage = Math.round((item.count / maxFunnel) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{item.stage}</span>
                    <span className="text-slate-400">{item.count} tratos ({percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Chart 2: Interaction Breakdown */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-indigo-400" /> Volumen de Actividad e Interacciones
          </h3>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">📞 Llamadas Comerciales</p>
              <p className="text-xl font-bold text-emerald-400">{callsCount}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: `${(callsCount / totalInteractions) * 100}%` }} />
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">✉️ Correos Enviados</p>
              <p className="text-xl font-bold text-indigo-400">{emailsCount}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full" style={{ width: `${(emailsCount / totalInteractions) * 100}%` }} />
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">👥 Reuniones Ejecutadas</p>
              <p className="text-xl font-bold text-amber-400">{meetingsCount}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: `${(meetingsCount / totalInteractions) * 100}%` }} />
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">📝 Notas de Seguimiento</p>
              <p className="text-xl font-bold text-cyan-400">{notesCount}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${(notesCount / totalInteractions) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
