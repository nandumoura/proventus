import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Atualiza o estado para exibir o fallback UI quando ocorre um erro
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Você também pode fazer o log do erro aqui
    console.error(error, errorInfo);
    this.setState({
      errorInfo: errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      // Renderiza uma UI personalizada com informações de erro
      return (
        <div>
          <h1>Ocorreu um erro.</h1>
          <p>{error && error.toString()}</p>
          <p>Detalhes do erro:</p>
          <pre>{errorInfo && errorInfo.componentStack}</pre>
        </div>
      );
    }

    // Renderiza o componente filho normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
