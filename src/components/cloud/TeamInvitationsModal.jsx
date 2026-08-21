import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { X, UserPlus, Mail, ShieldCheck, Cloud, Users, CheckCircle2 } from 'lucide-react';

export const TeamInvitationsModal = ({ isOpen, onClose }) => {
  const { activeSociedad, inviteMemberToSociedad } = useCRM();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Comercial');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    inviteMemberToSociedad(activeSociedad.id, email, role);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-400" /> Invitaciones & Permisos de Equipo en la Nube
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Sociedad: <strong className="text-white">{activeSociedad.name}</strong> ({activeSociedad.cloudProvider})</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invite Form */}
        <form onSubmit={handleSubmit} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <h4 className="font-bold text-slate-200">Generar Invitación de Acceso a la Carpeta Compartida</h4>
          
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Correo Electrónico del Colaborador *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colaborador@empresa.es"
              className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Rol / Privilegios en la Nube</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
            >
              <option value="Administrador">Administrador (Control Total BD & Subcarpetas)</option>
              <option value="Comercial">Comercial (Editar Clientes & Tratos)</option>
              <option value="Solo Lectura">Solo Lectura (Consulta & Reports)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Mail className="w-4 h-4" /> Enviar Invitación a la Nube
          </button>
        </form>

        {/* Existing Members List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Usuarios con Permisos en la Carpeta ({activeSociedad.members?.length || 1})
          </h4>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {activeSociedad.members && activeSociedad.members.map((m) => (
              <div key={m.id} className="glass-panel p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                    {m.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-white">{m.name}</p>
                    <p className="text-[11px] text-slate-400">{m.email}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700 block mb-1">
                    {m.role}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
