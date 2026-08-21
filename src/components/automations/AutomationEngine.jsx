import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Zap, ToggleLeft, ToggleRight, Plus, CheckCircle, Clock, ArrowRight, Play, Cpu } from 'lucide-react';

export const AutomationEngine = () => {
  const { automations, toggleAutomation } = useCRM();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Motor de Automatizaciones & Flujos de Trabajo
          </h2>
          <p className="text-xs text-slate-400">Reglas inteligentes de aviso, asignaciones automáticas y tareas por cambio de estado.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> Crear Regla de Automatización
        </button>
      </div>

      {/* Automations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {automations.map((rule) => (
          <div
            key={rule.id}
            className={`glass-panel p-5 rounded-2xl border transition-all ${
              rule.enabled ? 'border-amber-500/40 bg-slate-900/80 shadow-lg shadow-amber-500/5' : 'border-slate-800 bg-slate-900/40 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                  rule.enabled ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-heading">{rule.name}</h3>
                  <p className="text-[11px] text-slate-400">
                    Ejecutada <strong className="text-amber-300">{rule.executionsCount} veces</strong>
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleAutomation(rule.id)}
                className="text-slate-400 hover:text-white transition-colors"
                title={rule.enabled ? 'Desactivar' : 'Activar'}
              >
                {rule.enabled ? (
                  <ToggleRight className="w-8 h-8 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-600" />
                )}
              </button>
            </div>

            {/* Rule Logic Flow (Trigger -> Condition -> Action) */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">CUANDO</span>
                <span>{rule.trigger}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">SI</span>
                <span>{rule.condition}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">ENTONCES</span>
                <span>{rule.action}</span>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800 mt-3">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Última activación: {rule.lastTriggered}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Regla Activa
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Rule Builder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading">Diseñar Regla de Automatización</h3>
            <p className="text-xs text-slate-400">Configure una estructura estándar Disparador ➔ Condición ➔ Acción.</p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Nombre de la Regla</label>
                <input
                  type="text"
                  placeholder="ej. Aviso por WhatsApp al cerrar trato VIP"
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Evento Disparador (Trigger)</label>
                <select className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700">
                  <option>Nuevo Cliente registrado</option>
                  <option>Trato avanza a etapa de Negociación</option>
                  <option>Tarea vencida sin completar</option>
                  <option>Documento enviado a cliente</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Acción Automatizada</label>
                <select className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700">
                  <option>Enviar notificación por correo al supervisor</option>
                  <option>Crear tarea de seguimiento prioritaria</option>
                  <option>Cambiar etiqueta a #VIP</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-slate-400">Cancelar</button>
                <button onClick={() => setShowAddModal(false)} className="bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-xl">Guardar Regla</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
