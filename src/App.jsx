import React, { useState } from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { OrganizationSelectorModal } from './components/common/OrganizationSelectorModal';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ClientList } from './components/clients/ClientList';
import { ClientDetailModal } from './components/clients/ClientDetailModal';
import { InteractionHistory } from './components/interactions/InteractionHistory';
import { RelationshipManager } from './components/relationships/RelationshipManager';
import { SalesPipeline } from './components/pipeline/SalesPipeline';
import { TaskManager } from './components/tasks/TaskManager';
import { DocumentVault } from './components/documents/DocumentVault';
import { AutomationEngine } from './components/automations/AutomationEngine';
import { ReportsDashboard } from './components/analytics/ReportsDashboard';
import { IntegrationsHub } from './components/integrations/IntegrationsHub';
import { NewClientModal } from './components/common/NewClientModal';
import { NewDealModal } from './components/common/NewDealModal';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const AppContent = () => {
  const { activeTab, selectedClientId, setSelectedClientId, loading, apiError, refetchData } = useCRM();

  // Modal controls
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);

  const renderActiveTabModule = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 space-y-3 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          <p className="text-sm font-semibold text-slate-300">Conectando con https://erpnexus.somee.com/api...</p>
          <p className="text-xs text-slate-400">Cargando organización y sincronizando recursos.</p>
        </div>
      );
    }

    if (apiError) {
      return (
        <div className="glass-panel p-8 rounded-2xl border border-rose-500/40 max-w-lg mx-auto text-center space-y-4 my-12">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white font-heading">Error de Conexión a la API</h3>
            <p className="text-xs text-rose-300 mt-1">{apiError}</p>
          </div>
          <button
            onClick={refetchData}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reintentar Conexión API
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'clients':
        return <ClientList onOpenNewClientModal={() => setIsNewClientOpen(true)} />;
      case 'interactions':
        return <InteractionHistory />;
      case 'relationships':
        return <RelationshipManager />;
      case 'pipeline':
        return <SalesPipeline onOpenNewDealModal={() => setIsNewDealOpen(true)} />;
      case 'tasks':
        return <TaskManager />;
      case 'documents':
        return <DocumentVault />;
      case 'automations':
        return <AutomationEngine />;
      case 'analytics':
        return <ReportsDashboard />;
      case 'integrations':
        return <IntegrationsHub />;
      default:
        return <ClientList onOpenNewClientModal={() => setIsNewClientOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onOpenNewClientModal={() => setIsNewClientOpen(true)}
          onOpenNewDealModal={() => setIsNewDealOpen(true)}
        />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950/60">
          <ErrorBoundary onReset={refetchData}>
            {renderActiveTabModule()}
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Overlays & Modals */}
      <OrganizationSelectorModal />
      <GlobalSearchModal />
      <ToastContainer />

      {/* Selected Client Profile Drawer/Modal */}
      {selectedClientId && (
        <ClientDetailModal
          clientId={selectedClientId}
          onClose={() => setSelectedClientId(null)}
        />
      )}

      {/* Quick Creation Modals */}
      <NewClientModal
        isOpen={isNewClientOpen}
        onClose={() => setIsNewClientOpen(false)}
      />

      <NewDealModal
        isOpen={isNewDealOpen}
        onClose={() => setIsNewDealOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <AppContent />
    </CRMProvider>
  );
}
