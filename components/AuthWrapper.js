'use client';

import { useEffect } from 'react';

export default function AuthWrapper({ children }) {
  useEffect(() => {
    // Client-only logic for authentication check
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (token && userType) {
      console.log('User is authenticated');
      // Optionally set global state/context here
    }
  }, []);

  // Always render children, even on server
  return children;
}