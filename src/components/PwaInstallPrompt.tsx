
"use client";

import React, { useEffect } from 'react';
import { usePwaInstall } from '@/hooks/use-pwa-install';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';

export default function PwaInstallPrompt() {
  const { installPromptEvent, handleInstallPrompt } = usePwaInstall();
  const { toast } = useToast();

  useEffect(() => {
    if (installPromptEvent) {
      toast({
        id: 'pwa-install-toast',
        title: 'Install Azoums App',
        description: 'Get a better experience by installing our app on your device.',
        duration: Infinity, // Keep the toast until dismissed or action is taken
        action: (
          <Button onClick={handleInstallPrompt}>
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Install
          </Button>
        ),
      });
    }
  }, [installPromptEvent, handleInstallPrompt, toast]);

  return null; // This component does not render anything itself
}
