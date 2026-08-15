import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
            <h2 className="text-2xl font-bold text-rose-600">Oops, something went wrong.</h2>
            <p className="text-slate-600 text-sm">{this.state.error?.message || "An unexpected error occurred."}</p>
            <button
              className="bg-rose-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-rose-600 transition"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
