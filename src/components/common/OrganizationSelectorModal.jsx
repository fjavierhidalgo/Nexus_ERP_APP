import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Building2, X, Plus, CheckCircle2, ShieldCheck, Loader2, Sparkles } from 'lucide-react';

export const OrganizationSelectorModal = () => {
  const {
    organizations,
    currentOrganization,
    selectOrganization,
    createOrganization,
    isOrgSelectorOpen,
    setIsOrgSelectorOpen,
    loading
  } = useCRM();

  const [activeTab, setActiveTab] = useState('select'); // 'select' | 'create'
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOrgSelectorOpen) return null;

  const handleSelectOrg = (org) => {
    selectOrganization(org);
    setIsOrgSelectorOpen(false);
  };

  const handleCreateOrgSubmit = async (e) => {
    e.preventDefault();
    if (!newCode || !newName) return;
    setSubmitting(true);
    setErrorMsg('');
    try {
      const created = await createOrganization({
        code: newCode.trim(),
        name: newName.trim(),
      });
      setNewCode('');
      setNewName('');
      setActiveTab('select');
      setIsOrgSelectorOpen(false);
    } catch (err) {
      setErrorMsg(err.message || 'Error al crear la organización');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-start justify-center pt-20 pb-10 px-4 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-5 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">Gestión Multiempresa & Organizaciones</h3>
              <p className="text-xs text-slate-400">Seleccione la organización de trabajo o registre una nueva entidad.</p>
            </div>
          </div>
          {currentOrganization && (
            <button
              onClick={() => setIsOrgSelectorOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('select')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'select'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Seleccionar Organización ({organizations.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" /> Crear Nueva Organización
          </button>
        </div>

        {/* TAB 1: SELECT EXISTING ORGANIZATIONS */}
        {activeTab === 'select' && (
          <div className="space-y-3">
            {organizations.length === 0 ? (
              <div className="bg-slate-950/60 p-8 rounded-xl border border-slate-800 text-center space-y-2">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-400">Cargando catálogo de organizaciones desde la API...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {organizations.map((org) => {
                  const isSelected = currentOrganization?.code === org.code;
                  return (
                    <div
                      key={org.id || org.code}
                      onClick={() => handleSelectOrg(org)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/30 ring-2 ring-indigo-500/40 shadow-lg'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-300'
                        }`}>
                          {org.code}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                            {org.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono">
                            Código: <strong className="text-indigo-300">{org.code}</strong>
                          </p>
                        </div>
                      </div>

                      {isSelected ? (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Activa
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 group-hover:text-indigo-400 font-semibold transition-colors">
                          Seleccionar ➔
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREATE NEW ORGANIZATION */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreateOrgSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Código de Organización *</label>
              <input
                type="text"
                required
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="ej. 2, org-madrid, sociedad-hispania"
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono text-sm"
              />
              <p className="text-[11px] text-slate-400 mt-1">Identificador único que etiquetará todos los datos en la base de datos.</p>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Nombre Comercial de la Organización *</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="ej. Empresa Soluciones S.L."
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-300 space-y-1">
              <p className="font-semibold text-indigo-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Aislamiento de Datos Garantizado
              </p>
              <p className="text-[11px] text-slate-400">
                Al crear esta organización, se inicializará su entorno de trabajo independiente en la API REST y solo se mostrarán sus clientes, tratos y documentos vinculados.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('select')}
                className="px-4 py-2 text-slate-400 hover:text-white"
              >
                Volver al listado
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                Crear y Activar Organización
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
