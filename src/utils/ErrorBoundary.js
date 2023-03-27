import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // log the error using a third-party logging library
    console.error(error, info);
    // set the state to trigger a fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
