'use client';

import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error: error.message };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="text-red-500 p-4 text-center">
          <p>Error: {this.state.error}</p>
          <p>Please try again or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}