
"use client";

import React from 'react';
import { ServerCrash } from 'lucide-react';

interface ServerErrorOverlayProps {
  isVisible: boolean;
  errorCode?: string;
  message?: string;
}

export default function ServerErrorOverlay({
  isVisible,
  errorCode = "503",
  message = "Server not found"
}: ServerErrorOverlayProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-black z-[9999] flex items-center justify-center text-center p-4">
      <div className="flex flex-col items-center gap-4 p-8 rounded-lg bg-background/80 backdrop-blur-sm ring-1 ring-border">
        <ServerCrash className="h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold font-headline text-foreground">{message}</h1>
        {errorCode && (
          <p className="text-lg text-muted-foreground">Error Code: {errorCode}</p>
        )}
      </div>
    </div>
  );
}
