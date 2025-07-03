import { Zap } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="bg-transparent text-foreground border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center">
        <Zap className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-xl sm:text-2xl font-bold font-headline">Azoums AI WebApp Studio</h1>
      </div>
    </header>
  );
}
