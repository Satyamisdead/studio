
"use client";

import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function StudioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <Card className="shadow-xl w-full max-w-lg text-center p-6">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Wrench className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">
                    AI Under Maintenance
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-lg">
                    Our AI is currently undergoing scheduled maintenance to bring you even better features.
                </p>
                <p className="text-muted-foreground mt-2">
                    We'll be back online shortly. Thank you for your patience!
                </p>
            </CardContent>
        </Card>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t mt-8">
        Azoums AI WebApp Studio &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
