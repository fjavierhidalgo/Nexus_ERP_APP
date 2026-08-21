import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Share2,
  Mail,
  Calendar,
  PhoneCall,
  Globe,
  Webhook,
  CheckCircle2,
  XCircle,
  Play,
  Copy,
  Send,
  Sparkles
} from 'lucide-react';

export const IntegrationsHub = () => {
  const { integrations, toggleIntegration, addToast, clients, addInteraction } = useCRM();

  // Interactive Simulators State
  const [activeModal, setActiveModal] = useState(null); // 'email', 'voip', 'webform'

  // Email drafter state
  const [emailTo, setEmailTo] = useState(clients[0]?.email || '');
  const [emailSubject, setEmailSubject] = useState('Propuesta de Colaboración - NexusCRM');
  const [emailBody, setEmailBody] = useState('Estimado/a cliente, le adjuntamos la información solicitada...');

  // VoIP call simulator state
  const [phoneDial, setPhoneDial] = useState('+34 612 345 678');
  const [callStatus, setCallStatus] = useState('ready'); // 'ready', 'calling', 'connected', 'ended'

  // Helper to safely extract integration properties regardless of whether `integrations` is an Array (from API) or Object
  const getIntegration = (key, defaultName, defaults = {}) => {
    if (Array.isArray(integrations)) {
      const found = integrations.find(
        (i) =>
          (i.name && i.name.toLowerCase().includes(key.toLowerCase())) ||
          (i.id && i.id.toString().toLowerCase() === key.toLowerCase())
      );
      if (found) {
        return {
          id: found.id,
          name: found.name || defaultName,
          connected: Boolean(found.connected),
          provider: found.details || defaults.provider || defaultName,
          emailAccount: defaults.emailAccount || 'ventas@nexus-crm.es',
          phoneNumber: defaults.phoneNumber || '+34 910 00 22 11',
          totalLeadsCaptured: defaults.totalLeadsCaptured || 148,
          embedSnippet: defaults.embedSnippet || '<iframe src="https://erpnexus.somee.com/embed/lead-form" width="100%" height="450"></iframe>',
          endpointUrl: defaults.endpointUrl || 'https://erpnexus.somee.com/api/webhooks/inbound'
        };
      }
    } else if (integrations && typeof integrations === 'object' && integrations[key]) {
      const item = integrations[key];
      return {
        id: key,
        name: defaultName,
        connected: Boolean(item.connected),
        provider: item.provider || defaultName,
        emailAccount: item.emailAccount || 'ventas@nexus-crm.es',
        phoneNumber: item.phoneNumber || '+34 910 00 22 11',
        totalLeadsCaptured: item.totalLeadsCaptured || 148,
        embedSnippet: item.embedSnippet || '<iframe src="https://erpnexus.somee.com/embed/lead-form" width="100%" height="450"></iframe>',
        endpointUrl: item.endpointUrl || 'https://erpnexus.somee.com/api/webhooks/inbound'
      };
    }

    return {
      id: key,
      name: defaultName,
      connected: true,
      provider: defaults.provider || defaultName,
      emailAccount: defaults.emailAccount || 'ventas@nexus-crm.es',
      phoneNumber: defaults.phoneNumber || '+34 910 00 22 11',
      totalLeadsCaptured: defaults.totalLeadsCaptured || 148,
      embedSnippet: defaults.embedSnippet || '<iframe src="https://erpnexus.somee.com/embed/lead-form" width="100%" height="450"></iframe>',
      endpointUrl: defaults.endpointUrl || 'https://erpnexus.somee.com/api/webhooks/inbound'
    };
  };

  const emailIntegration = getIntegration('email', 'Correo Electrónico', { provider: 'Google Workspace / Gmail', emailAccount: 'ventas@nexus-crm.es' });
  const calendarIntegration = getIntegration('calendar', 'Calendario & Agenda', { provider: 'Google Calendar & Office 365' });
  const voipIntegration = getIntegration('voip', 'Telefonía VoIP / Click-to-Call', { provider: 'Aircall / Twilio VoIP', phoneNumber: '+34 910 00 22 11' });
  const webFormsIntegration = getIntegration('webForms', 'Formularios Web / Lead Capture', { totalLeadsCaptured: 148 });
  const webhooksIntegration = getIntegration('webhooks', 'Webhooks API, Zapier & Make Integration', { endpointUrl: 'https://erpnexus.somee.com/api/webhooks/inbound' });

  const handleSendEmail = (e) => {
    e.preventDefault();
    const clientObj = clients.find((c) => c.email === emailTo);
    if (clientObj) {
      addInteraction({
        clientId: clientObj.id,
        type: 'correo',
        title: emailSubject,
        summary: emailBody,
        duration: '-',
        outcome: 'Información enviada',
        sentiment: 'Positivo'
      });
    }
    addToast(`Correo simulado enviado a ${emailTo}.`, 'success');
    setActiveModal(null);
  };

  const handleStartVoIPCall = () => {
    setCallStatus('calling');
    setTimeout(() => {
      setCallStatus('connected');
      setTimeout(() => {
        setCallStatus('ended');
        addToast(`Llamada VoIP a ${phoneDial} finalizada y registrada.`, 'success');
        const clientObj = clients.find((c) => c.phone && c.phone.includes(phoneDial.slice(-6)));
        if (clientObj) {
          addInteraction({
            clientId: clientObj.id,
            type: 'llamada',
            title: 'Llamada VoIP entrante/saliente',
            summary: 'Conversación directa realizada desde la telefonía integrada.',
            duration: '02:45 min',
            outcome: 'Exitosa',
            sentiment: 'Positivo'
          });
        }
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" /> Centro de Integraciones & Conectores API
          </h2>
          <p className="text-xs text-slate-400">Sincronice su CRM con servicios de correo, agenda, telefonía IP, formularios web y automatizadores.</p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Integration 1: Email */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <button
              onClick={() => toggleIntegration(emailIntegration.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                emailIntegration.connected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {emailIntegration.connected ? 'Conectado ✓' : 'Desconectado'}
            </button>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Correo Electrónico</h3>
            <p className="text-xs text-slate-400 mt-1">{emailIntegration.provider}</p>
            <p className="text-[11px] text-indigo-300 mt-0.5">{emailIntegration.emailAccount}</p>
          </div>
          <button
            onClick={() => setActiveModal('email')}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-indigo-400" /> Redactar Correo Simulado
          </button>
        </div>

        {/* Integration 2: Calendar */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <button
              onClick={() => toggleIntegration(calendarIntegration.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                calendarIntegration.connected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {calendarIntegration.connected ? 'Conectado ✓' : 'Desconectado'}
            </button>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Calendario & Agenda</h3>
            <p className="text-xs text-slate-400 mt-1">{calendarIntegration.provider}</p>
            <p className="text-[11px] text-amber-300 mt-0.5">Sincronización bidireccional activa</p>
          </div>
          <button
            onClick={() => addToast('Sincronizando 12 eventos de agenda...', 'info')}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition-colors"
          >
            Forzar Sincronización de Agenda
          </button>
        </div>

        {/* Integration 3: VoIP Telefonía */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <button
              onClick={() => toggleIntegration(voipIntegration.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                voipIntegration.connected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {voipIntegration.connected ? 'Conectado ✓' : 'Desconectado'}
            </button>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Telefonía VoIP / Click-to-Call</h3>
            <p className="text-xs text-slate-400 mt-1">{voipIntegration.provider}</p>
            <p className="text-[11px] text-emerald-400 mt-0.5">Línea: {voipIntegration.phoneNumber}</p>
          </div>
          <button
            onClick={() => { setCallStatus('ready'); setActiveModal('voip'); }}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Abrir Marcador Telefónico
          </button>
        </div>

        {/* Integration 4: Web Forms */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <button
              onClick={() => toggleIntegration(webFormsIntegration.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                webFormsIntegration.connected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {webFormsIntegration.connected ? 'Conectado ✓' : 'Desconectado'}
            </button>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Formularios Web / Lead Capture</h3>
            <p className="text-xs text-slate-400 mt-1">Capturas recibidas: <strong className="text-cyan-300">{webFormsIntegration.totalLeadsCaptured} leads</strong></p>
          </div>
          <button
            onClick={() => setActiveModal('webform')}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition-colors"
          >
            Obtener Código iFrame Embebible
          </button>
        </div>

        {/* Integration 5: Webhooks & Zapier */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <Webhook className="w-5 h-5" />
            </div>
            <button
              onClick={() => toggleIntegration(webhooksIntegration.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                webhooksIntegration.connected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {webhooksIntegration.connected ? 'API Activa ✓' : 'Inactiva'}
            </button>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Webhooks API, Zapier & Make Integration</h3>
            <p className="text-xs text-slate-400 mt-1">Endpoint de recepción de datos externos en tiempo real:</p>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-rose-300 mt-2 truncate">
              {webhooksIntegration.endpointUrl}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => addToast('Petición Webhook de prueba enviada con éxito.', 'success')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition-colors"
            >
              Probar Petición Ping Webhook
            </button>
          </div>
        </div>
      </div>

      {/* Email Sender Modal */}
      {activeModal === 'email' && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" /> Simular Envío de Correo Electrónico
            </h3>
            <form onSubmit={handleSendEmail} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Destinatario</label>
                <input
                  type="email"
                  required
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Asunto</label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cuerpo del Mensaje</label>
                <textarea
                  required
                  rows={4}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 text-slate-400">Cancelar</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-1.5 rounded-xl">Enviar Correo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VoIP Call Simulator Modal */}
      {activeModal === 'voip' && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading">Marcador VoIP Integrado</h3>
            <input
              type="text"
              value={phoneDial}
              onChange={(e) => setPhoneDial(e.target.value)}
              className="w-full bg-slate-950 text-center font-mono text-lg text-emerald-400 p-3 rounded-xl border border-slate-800"
            />
            {callStatus === 'ready' && (
              <button
                onClick={handleStartVoIPCall}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5" /> Iniciar Llamada
              </button>
            )}
            {callStatus === 'calling' && <p className="text-xs text-amber-400 font-bold animate-pulse">Estableciendo conexión...</p>}
            {callStatus === 'connected' && <p className="text-xs text-emerald-400 font-bold animate-pulse">Llamada en curso (00:05)</p>}
            {callStatus === 'ended' && <p className="text-xs text-slate-400 font-bold">Llamada finalizada.</p>}

            <button onClick={() => setActiveModal(null)} className="text-xs text-slate-400 mt-2 block mx-auto">Cerrar Marcador</button>
          </div>
        </div>
      )}

      {/* WebForm Snippet Modal */}
      {activeModal === 'webform' && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading">Código iFrame para Sitio Web</h3>
            <p className="text-xs text-slate-400">Pegue este snippet en su sitio web o landing page para capturar leads directamente en NexusCRM.</p>
            <textarea
              readOnly
              rows={3}
              value={webFormsIntegration.embedSnippet}
              className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-3 rounded-xl border border-slate-800"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(webFormsIntegration.embedSnippet);
                  addToast('Código copiado al portapapeles.', 'success');
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copiar Snippet
              </button>
              <button onClick={() => setActiveModal(null)} className="px-3 py-2 text-xs text-slate-400">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
