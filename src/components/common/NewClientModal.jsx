import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { X, UserPlus, Loader2 } from 'lucide-react';

export const NewClientModal = ({ isOpen, onClose }) => {
  const { addClient } = useCRM();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('lead');
  const [source, setSource] = useState('Formulario Web');
  const [industry, setIndustry] = useState('Tecnología');
  const [annualBudget, setAnnualBudget] = useState('50000');
  const [healthScore, setHealthScore] = useState(80);
  const [interestLevel, setInterestLevel] = useState('alto');
  const [tagsInput, setTagsInput] = useState('Enterprise, Nuevo Lead');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    try {
      const tagsArray = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

      await addClient({
        name,
        email,
        phone: phone || null,
        company: company || null,
        role: role || null,
        status,
        source,
        cif: `B${Math.floor(10000000 + Math.random() * 90000000)}`,
        industry,
        annualBudget: parseFloat(annualBudget) || 0,
        healthScore: parseInt(healthScore) || 80,
        interestLevel,
        tags: tagsArray,
        notes: notes || null,
        dateAdded: new Date().toISOString(),
      });

      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setRole('');
      setNotes('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-400" /> Crear Cliente en la API
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Nombre Completo *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ej. Ana García"
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Correo Electrónico *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ana@example.com"
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Empresa</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Cargo / Puesto</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Directora de Operaciones"
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 112 233"
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Estado *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="lead">🔵 Lead</option>
                <option value="activo">🟢 Activo</option>
                <option value="vip">⭐ VIP</option>
                <option value="inactivo">⚪ Inactivo</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Sector</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="Tecnología">Tecnología</option>
                <option value="Salud">Salud</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Logística">Logística</option>
                <option value="Energía">Energía</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Presupuesto (€) *</label>
              <input
                type="number"
                required
                min="0"
                value={annualBudget}
                onChange={(e) => setAnnualBudget(e.target.value)}
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Score Salud (0-100) *</label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={healthScore}
                onChange={(e) => setHealthScore(e.target.value)}
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Interés</label>
              <select
                value={interestLevel}
                onChange={(e) => setInterestLevel(e.target.value)}
                className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="alto">Alto 🔥</option>
                <option value="medio">Medio</option>
                <option value="bajo">Baja</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Etiquetas (separadas por coma)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Enterprise, SaaS"
              className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Notas</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} disabled={submitting} className="px-4 py-2 text-slate-400 hover:text-white">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Guardar en API
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
