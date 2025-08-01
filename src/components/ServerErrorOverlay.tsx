
"use client";

import React from 'react';

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
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: 'sans-serif',
    }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>{message}</h1>
        {errorCode && (
          <p style={{ fontSize: '1.2rem', margin: 0 }}>Error Code: {errorCode}</p>
        )}
    </div>
  );
}
