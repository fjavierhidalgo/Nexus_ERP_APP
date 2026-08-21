import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-panel p-8 rounded-2xl border border-rose-500/40 max-w-lg mx-auto text-center space-y-4 my-12 animate-fade-in">
          <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white font-heading">Error al cargar el módulo</h3>
            <p className="text-xs text-rose-300 mt-1">{this.state.error?.message || "Ocurrió un error inesperado."}</p>
          </div>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reintentar Cargar Módulo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
