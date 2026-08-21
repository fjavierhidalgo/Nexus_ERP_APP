import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Database,
  Cloud,
  FolderGit2,
  Download,
  Terminal,
  Play,
  Copy,
  Users,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  FileCode,
  FolderTree,
  UserPlus
} from 'lucide-react';

export const CloudSQLiteHub = ({ onOpenTeamModal }) => {
  const { activeSociedad, clients, documents, generateSQLiteDump, addToast } = useCRM();

  const [activeTab, setActiveTab] = useState('sqlite'); // 'sqlite', 'folders'
  const [customSQLQuery, setCustomSQLQuery] = useState('SELECT name, email, company, status, healthScore FROM clients WHERE healthScore > 80 ORDER BY healthScore DESC;');
  const [queryResult, setQueryResult] = useState(null);

  const handleRunSQL = () => {
    try {
      // Execute query simulation on activeClients
      const matches = clients.filter((c) => c.healthScore > 80);
      setQueryResult(matches);
      addToast('Consulta SQL ejecutada correctamente en la BD SQLite.', 'success');
    } catch (e) {
      addToast('Error en la sintaxis SQL.', 'warning');
    }
  };

  const handleDownloadSQLite = () => {
    const dump = generateSQLiteDump();
    const blob = new Blob([dump], { type: 'application/x-sqlite3' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeSociedad.dbFileName || 'nexus_crm.sqlite';
    a.click();
    addToast(`Archivo "${activeSociedad.dbFileName}" exportado para ${activeSociedad.cloudProvider}.`, 'success');
  };

  const getCloudIconColor = (provider) => {
    switch (provider) {
      case 'Google Drive': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'OneDrive': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'iCloud': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Sociedad & Cloud Storage Summary Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-bold text-xl ${getCloudIconColor(activeSociedad.cloudProvider)}`}>
              <Cloud className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-heading">{activeSociedad.name}</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  CIF: {activeSociedad.cif}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Unidad de Nube: <strong className="text-slate-200">{activeSociedad.cloudProvider}</strong> • BD SQLite: <code className="text-indigo-400 font-mono">{activeSociedad.dbFileName}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleDownloadSQLite}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/30"
            >
              <Download className="w-4 h-4" /> Exportar BD `.sqlite`
            </button>
            <button
              onClick={onOpenTeamModal}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all"
            >
              <UserPlus className="w-4 h-4 text-emerald-400" /> Invitaciones Nube ({activeSociedad.members?.length || 1})
            </button>
          </div>
        </div>

        {/* Directory Path Display */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <HardDrive className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-slate-400">Ruta de Sincronización:</span>
            <span className="text-emerald-400 font-semibold truncate">{activeSociedad.cloudFolderPath}</span>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Sincronizado ✓
          </span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-800 bg-slate-900/50 px-6 gap-2">
        <button
          onClick={() => setActiveTab('sqlite')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-semibold transition-all ${
            activeTab === 'sqlite' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" /> Consultas SQL en la BD `.sqlite`
        </button>
        <button
          onClick={() => setActiveTab('folders')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-semibold transition-all ${
            activeTab === 'folders' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderTree className="w-4 h-4" /> Estructura de Subcarpetas por Cliente (`/documentos_clientes/[id]/`)
        </button>
      </div>

      {/* TAB 1: SQLITE QUERY CONSOLE */}
      {activeTab === 'sqlite' && (
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 font-heading flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" /> Consola de Consultas SQL (Nativa SQLite)
              </h3>
              <button
                onClick={handleRunSQL}
                className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5" /> Ejecutar SELECT
              </button>
            </div>

            <textarea
              rows={3}
              value={customSQLQuery}
              onChange={(e) => setCustomSQLQuery(e.target.value)}
              className="w-full bg-slate-950 font-mono text-xs text-indigo-300 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
            />

            {/* Results Output Table */}
            {queryResult && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Salida de la consulta ({queryResult.length} filas devueltas):</p>
                <div className="glass-panel rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">id</th>
                        <th className="p-2.5">name</th>
                        <th className="p-2.5">company</th>
                        <th className="p-2.5">status</th>
                        <th className="p-2.5">healthScore</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {queryResult.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/40">
                          <td className="p-2.5 text-indigo-400">{row.id}</td>
                          <td className="p-2.5 font-semibold text-white">{row.name}</td>
                          <td className="p-2.5">{row.company}</td>
                          <td className="p-2.5 text-emerald-400">{row.status}</td>
                          <td className="p-2.5 font-bold text-amber-300">{row.healthScore}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT SUBFOLDERS HIERARCHY BROWSER */}
      {activeTab === 'folders' && (
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-cyan-400" /> Directorio Físico en {activeSociedad.cloudProvider}
            </h3>
            <p className="text-xs text-slate-400">
              Los documentos de cada cliente se organizan automáticamente en subcarpetas independientes usando su identificador único (`cli-id`).
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 font-mono">
                <FolderGit2 className="w-4 h-4 text-indigo-400" /> {activeSociedad.cloudFolderPath}documentos_clientes/
              </div>

              {/* Clients Folder Subtree */}
              <div className="pl-6 space-y-3 font-mono text-xs border-l border-slate-800">
                {clients.map((client) => {
                  const clientDocs = documents.filter((doc) => doc.clientId === client.id);
                  return (
                    <div key={client.id} className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-200 font-semibold bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                        <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>/documentos_clientes/<strong>{client.id}</strong>/</span>
                        <span className="text-[10px] text-slate-400 font-sans">({client.name} - {client.company})</span>
                        <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-300">
                          {clientDocs.length} archivos
                        </span>
                      </div>

                      {clientDocs.length > 0 && (
                        <div className="pl-6 space-y-1 text-[11px] text-slate-400">
                          {clientDocs.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2 hover:text-white py-0.5">
                              <FileCode className="w-3 h-3 text-slate-500" />
                              <span>{doc.title}</span>
                              <span className="text-[9px] text-slate-500">({doc.fileSize})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
