import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Building2, X, Cloud, HardDrive, Globe, ShieldCheck } from 'lucide-react';

export const SociedadManagerModal = ({ isOpen, onClose }) => {
  const { addSociedad } = useCRM();

  const [name, setName] = useState('');
  const [cif, setCif] = useState('');
  const [sector, setSector] = useState('Servicios & Consultoría');
  const [currency, setCurrency] = useState('EUR (€)');
  const [cloudProvider, setCloudProvider] = useState('Google Drive');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cif) return;

    addSociedad({
      name,
      cif,
      sector,
      currency,
      cloudProvider
    });

    setName('');
    setCif('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" /> Crear Nueva Sociedad / Empresa Gestora
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Nombre Comercial / Denominación Social *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ej. Inversiones Hispania S.L."
              className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">CIF / NIF Fiscal *</label>
              <input
                type="text"
                required
                value={cif}
                onChange={(e) => setCif(e.target.value)}
                placeholder="B-99887766"
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Moneda Principal</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700"
              >
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="USD ($)">USD ($) - Dólar US</option>
                <option value="GBP (£)">GBP (£) - Libra</option>
                <option value="MXN ($)">MXN ($) - Peso MX</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Sector de la Sociedad</label>
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="ej. Inmobiliaria, Retail, SaaS..."
              className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700"
            />
          </div>

          {/* Cloud Storage Unit Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-slate-300 font-bold">Unidad de Almacenamiento en la Nube (DB & Documentos)</label>
            <p className="text-[11px] text-slate-400">
              Se creará el archivo SQLite <code className="text-indigo-300">nexus_crm_[sociedad].sqlite</code> y la carpeta de documentos de clientes en la nube elegida.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'Google Drive', label: 'Google Drive', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' },
                { id: 'OneDrive', label: 'Microsoft OneDrive', color: 'border-blue-500/40 text-blue-300 bg-blue-950/20' },
                { id: 'iCloud', label: 'Apple iCloud Drive', color: 'border-purple-500/40 text-purple-300 bg-purple-950/20' },
                { id: 'Local Server', label: 'Servidor Red Local', color: 'border-slate-700 text-slate-300 bg-slate-800/40' },
              ].map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => setCloudProvider(provider.id)}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-between transition-all ${
                    cloudProvider === provider.id
                      ? `${provider.color} ring-2 ring-indigo-500`
                      : 'border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{provider.label}</span>
                  {cloudProvider === provider.id && <ShieldCheck className="w-4 h-4 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">
              Cancelar
            </button>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl shadow-md">
              Alta de Sociedad & Conectar Nube
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
