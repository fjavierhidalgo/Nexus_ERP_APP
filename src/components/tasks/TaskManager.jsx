import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { CheckSquare, Square, Plus, Calendar, Clock, AlertTriangle, Trash2, CheckCircle2, User, Filter } from 'lucide-react';

export const TaskManager = () => {
  const { tasks, clients, addTask, toggleTaskStatus, deleteTask } = useCRM();

  const [statusFilter, setStatusFilter] = useState('pending'); // 'all', 'pending', 'completed'
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newDueDate, setNewDueDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [newPriority, setNewPriority] = useState('Media');
  const [newType, setNewType] = useState('Llamada');
  const [newNotes, setNewNotes] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' && task.status !== 'completed') ||
      (statusFilter === 'completed' && task.status === 'completed');
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Alta':
        return <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded">🔴 Alta</span>;
      case 'Media':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded">🟡 Media</span>;
      default:
        return <span className="bg-slate-800 text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded">🟢 Baja</span>;
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const selectedClientObj = clients.find((c) => c.id === newClientId);

    addTask({
      title: newTitle,
      clientId: newClientId,
      clientName: selectedClientObj ? selectedClientObj.name : 'General',
      dueDate: newDueDate,
      priority: newPriority,
      type: newType,
      notes: newNotes,
      assignedTo: 'Javier Hidalgo'
    });

    setNewTitle('');
    setNewNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Filter Controls */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" /> Tareas, Acciones & Recordatorios
          </h2>
          <p className="text-xs text-slate-400">Planificador de próximas acciones, fechas de vencimiento y compromisos comerciales.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            <option value="pending">Estado: Pendientes</option>
            <option value="completed">Estado: Completadas</option>
            <option value="all">Estado: Todas</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Prioridad: Todas</option>
            <option value="Alta">Alta 🔴</option>
            <option value="Media">Media 🟡</option>
            <option value="Baja">Baja 🟢</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" /> Crear Tarea
          </button>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 pb-10 px-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-auto">
            <h3 className="text-base font-bold text-white font-heading">Programar Nueva Tarea</h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Título de la Acción</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  placeholder="ej. Enviar propuesta revisada a Cliente X"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cliente Vinculado</label>
                <select
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Prioridad</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tipo de Acción</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                >
                  <option value="Llamada">Llamada de seguimiento</option>
                  <option value="Reunión">Reunión de avance</option>
                  <option value="Enviar Propuesta">Enviar Propuesta / Presupuesto</option>
                  <option value="Firma Contrato">Firma de Contrato</option>
                  <option value="Seguimiento">Seguimiento General</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Notas adicionales</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
                  placeholder="Detalles sobre qué tratar en la tarea..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-slate-400">Cancelar</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-1.5 rounded-xl">Crear Tarea</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center">
            <CheckSquare className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No hay tareas pendientes en esta categoría.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            return (
              <div
                key={task.id}
                className={`glass-panel p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  isCompleted ? 'border-slate-800/40 bg-slate-900/30 opacity-60' : 'border-slate-800 hover:border-indigo-500/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      {getPriorityBadge(task.priority)}
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                        {task.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5 flex-wrap">
                      <span>Cliente: <strong className="text-slate-300">{task.clientName}</strong></span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> Vence: <strong className="text-rose-400">{task.dueDate}</strong>
                      </span>
                      <span>Asignado: {task.assignedTo}</span>
                    </div>

                    {task.notes && (
                      <p className="text-xs text-slate-400 mt-1 italic">"{task.notes}"</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
                  title="Eliminar tarea"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
