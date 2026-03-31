import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      try {
        // Check if it's a Firestore error JSON
        const parsed = JSON.parse(this.state.error?.message || "");
        if (parsed.error && parsed.operationType) {
          errorMessage = `Database error during ${parsed.operationType}: ${parsed.error}`;
        }
      } catch (e) {
        // Not a JSON error
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-red-100 dark:border-red-900/30 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Something went wrong</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
