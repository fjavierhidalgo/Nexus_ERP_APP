import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Kanban,
  Plus,
  DollarSign,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Trash2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award
} from 'lucide-react';

export const SalesPipeline = ({ onOpenNewDealModal }) => {
  const { deals, clients, updateDealStage, deleteDeal } = useCRM();

  const stages = [
    { id: 'prospection', title: '1. Prospección', color: 'border-slate-700 bg-slate-900/60' },
    { id: 'qualification', title: '2. Calificación', color: 'border-cyan-500/40 bg-cyan-950/20' },
    { id: 'proposal', title: '3. Propuesta', color: 'border-indigo-500/40 bg-indigo-950/20' },
    { id: 'negotiation', title: '4. Negociación', color: 'border-amber-500/40 bg-amber-950/20' },
    { id: 'won', title: '5. Ganada (Won)', color: 'border-emerald-500/40 bg-emerald-950/20' },
    { id: 'lost', title: '6. Perdida (Lost)', color: 'border-rose-500/40 bg-rose-950/20' },
  ];

  // Pipeline summary totals
  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'lost')
    .reduce((acc, d) => acc + (d.amount || 0), 0);

  const totalWonValue = deals
    .filter((d) => d.stage === 'won')
    .reduce((acc, d) => acc + (d.amount || 0), 0);

  const winRate = Math.round(
    (deals.filter((d) => d.stage === 'won').length / (deals.length || 1)) * 100
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Pipeline Stats Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-slate-400 font-medium">Valor Total Pipeline Activo</p>
            <p className="text-2xl font-extrabold text-white mt-0.5">{totalPipelineValue.toLocaleString('es-ES')} €</p>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <div>
            <p className="text-xs text-slate-400 font-medium">Ventas Cerradas (Won)</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">{totalWonValue.toLocaleString('es-ES')} €</p>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <div>
            <p className="text-xs text-slate-400 font-medium">Tasa de Conversión (Win Rate)</p>
            <p className="text-2xl font-extrabold text-indigo-300 mt-0.5">{winRate}%</p>
          </div>
        </div>

        <button
          onClick={onOpenNewDealModal}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" /> Registrar Oportunidad
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {stages.map((stageItem) => {
          const stageDeals = deals.filter((d) => d.stage === stageItem.id);
          const stageSum = stageDeals.reduce((acc, d) => acc + (d.amount || 0), 0);

          return (
            <div
              key={stageItem.id}
              className={`p-3 rounded-2xl border ${stageItem.color} flex flex-col min-h-[500px] shadow-sm`}
            >
              {/* Column Header */}
              <div className="pb-3 border-b border-slate-800 mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-200 font-heading">{stageItem.title}</h3>
                  <p className="text-[10px] text-emerald-400 font-bold mt-0.5">{stageSum.toLocaleString('es-ES')} €</p>
                </div>
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center border border-slate-700">
                  {stageDeals.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[650px] pr-1">
                {stageDeals.length === 0 ? (
                  <div className="py-10 text-center text-slate-600 text-xs border border-dashed border-slate-800/80 rounded-xl">
                    Sin operaciones
                  </div>
                ) : (
                  stageDeals.map((deal) => {
                    const currentIndex = stages.findIndex((s) => s.id === deal.stage);
                    return (
                      <div
                        key={deal.id}
                        className="glass-card p-3.5 rounded-xl border border-slate-800/90 hover:border-indigo-500/50 space-y-2.5 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-xs text-white leading-snug group-hover:text-indigo-300 transition-colors">
                            {deal.title}
                          </h4>
                          <button
                            onClick={() => deleteDeal(deal.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-slate-400">
                          <p className="font-semibold text-slate-300 truncate">{deal.companyName}</p>
                          <p className="text-slate-400 text-[10px]">{deal.clientName}</p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-extrabold text-emerald-400">
                            {deal.amount.toLocaleString('es-ES')} €
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                            {deal.probability}% Prob.
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" /> {deal.expectedCloseDate}
                          </span>
                          <span className="text-slate-400 font-medium">{deal.owner}</span>
                        </div>

                        {/* Column Shift Buttons */}
                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          {currentIndex > 0 ? (
                            <button
                              onClick={() => updateDealStage(deal.id, stages[currentIndex - 1].id)}
                              className="text-slate-400 hover:text-white p-1 rounded bg-slate-800 hover:bg-slate-700 flex items-center gap-0.5"
                              title="Mover a etapa anterior"
                            >
                              <ArrowLeft className="w-3 h-3" /> Atrás
                            </button>
                          ) : <div />}

                          {currentIndex < stages.length - 1 ? (
                            <button
                              onClick={() => updateDealStage(deal.id, stages[currentIndex + 1].id)}
                              className="text-slate-400 hover:text-indigo-300 p-1 rounded bg-slate-800 hover:bg-slate-700 flex items-center gap-0.5 font-semibold"
                              title="Avanzar etapa"
                            >
                              Avanzar <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : <div />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
