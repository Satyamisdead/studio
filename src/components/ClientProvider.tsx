
"use client";

import { AuthProvider } from '@/hooks/use-auth';
import ClientLayout from '@/components/ClientLayout';
import React, { useState, useEffect } from 'react';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Until the component is mounted, we won't render anything.
  // This prevents hydration errors.
  if (!isMounted) {
    return null; 
  }

  return (
    <AuthProvider>
      <ClientLayout>{children}</ClientLayout>
    </AuthProvider>
  );
}
