import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Building2, Users, ShieldAlert, Award, Plus, Mail, Phone, ExternalLink, Network } from 'lucide-react';

export const RelationshipManager = () => {
  const { companies, contacts, clients, addContact } = useCRM();
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDecisionRole, setNewDecisionRole] = useState('Decisor');
  const [newInfluenceLevel, setNewInfluenceLevel] = useState('Alta');

  const activeCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0];
  const companyContacts = contacts.filter((c) => c.companyId === activeCompany?.id);

  const getDecisionBadge = (role) => {
    switch (role) {
      case 'Decisor':
        return <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">👑 Decisor Final</span>;
      case 'Influenciador':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">💡 Influenciador</span>;
      case 'Comprador':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">💳 Comprador / Finance</span>;
      default:
        return <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">⚙️ Usuario Final</span>;
    }
  };

  const handleAddContactSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !activeCompany) return;

    addContact({
      companyId: activeCompany.id,
      name: newName,
      email: newEmail,
      phone: newPhone,
      role: newRole || 'Ejecutivo',
      decisionRole: newDecisionRole,
      influenceLevel: newInfluenceLevel,
      linkedClientId: null
    });

    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewRole('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" /> Mapa de Relaciones & Contactos de Empresa
          </h2>
          <p className="text-xs text-slate-400">Vínculos organizacionales entre empresas, decisores, influenciadores y usuarios clave.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Añadir Contacto
        </button>
      </div>

      {/* Main Grid: Companies Selector (Left) & Contact Hierarchy Network (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Company Cards List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Empresas en Cartera ({companies.length})</h3>
          {companies.map((comp) => {
            const isSelected = activeCompany?.id === comp.id;
            const contactsCount = contacts.filter((c) => c.companyId === comp.id).length;
            return (
              <div
                key={comp.id}
                onClick={() => setSelectedCompanyId(comp.id)}
                className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-slate-800/80 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-800/80 hover:border-slate-700 bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={comp.logo} alt={comp.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-white text-sm truncate">{comp.name}</h4>
                    <p className="text-xs text-slate-400 truncate">{comp.sector} • CIF: {comp.cif}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 shrink-0">
                    {contactsCount} contactos
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Company Detail & Org Contact Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {activeCompany && (
            <>
              {/* Selected Company Banner */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img src={activeCompany.logo} alt={activeCompany.name} className="w-14 h-14 rounded-2xl object-cover border border-indigo-500/40 shadow-md" />
                    <div>
                      <h3 className="text-lg font-bold text-white font-heading">{activeCompany.name}</h3>
                      <p className="text-xs text-slate-400">{activeCompany.sector} • {activeCompany.address}</p>
                    </div>
                  </div>
                  <a
                    href={activeCompany.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                  >
                    {activeCompany.website} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block">Plantilla:</span>
                    <span className="font-semibold text-slate-200">{activeCompany.employeeCount} empleados</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Facturación Anual:</span>
                    <span className="font-semibold text-emerald-400">{activeCompany.annualRevenue}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Identificación:</span>
                    <span className="font-semibold text-slate-200">{activeCompany.cif}</span>
                  </div>
                </div>
              </div>

              {/* Contact Hierarchy Matrix */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" /> Matriz de Contactos e Influencia Decisora
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyContacts.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 col-span-2 text-center">No hay contactos vinculados a esta empresa.</p>
                  ) : (
                    companyContacts.map((contact) => (
                      <div key={contact.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3 hover:border-indigo-500/40 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-bold text-white text-sm">{contact.name}</h5>
                            <p className="text-xs text-indigo-300 font-medium">{contact.role}</p>
                          </div>
                          {getDecisionBadge(contact.decisionRole)}
                        </div>

                        <div className="space-y-1 text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Nivel de Influencia:</span>
                          <span className={`font-extrabold ${contact.influenceLevel === 'Alta' ? 'text-rose-400' : 'text-amber-400'}`}>
                            {contact.influenceLevel}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading">Vincular Contacto a {activeCompany?.name}</h3>
            <form onSubmit={handleAddContactSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  placeholder="ej. Roberto Gómez"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  placeholder="r.gomez@empresa.com"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Teléfono</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cargo / Puesto de trabajo</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  placeholder="ej. Director de Compras"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Rol en la Decisión</label>
                  <select
                    value={newDecisionRole}
                    onChange={(e) => setNewDecisionRole(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Decisor">Decisor Final</option>
                    <option value="Influenciador">Influenciador</option>
                    <option value="Comprador">Comprador / Finance</option>
                    <option value="Usuario final">Usuario final</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Nivel de Influencia</label>
                  <select
                    value={newInfluenceLevel}
                    onChange={(e) => setNewInfluenceLevel(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-slate-400">Cancelar</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-1.5 rounded-xl">Guardar Contacto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
