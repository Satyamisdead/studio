"use client";

import * as React from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  initialPrompt?: string;
}

export default function PromptForm({ onSubmit, isLoading, initialPrompt = "" }: PromptFormProps) {
  const [prompt, setPrompt] = React.useState(initialPrompt);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-primary" />
          Describe Your App
        </CardTitle>
        <CardDescription>
          Tell us about the web application you want to create. Be as specific as possible!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="prompt-input" className="sr-only">Application Prompt</Label>
            <Textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A to-do list app with user authentication and categories..."
              rows={6}
              className="resize-none"
              disabled={isLoading}
              aria-label="Application Prompt"
            />
          </div>
          <Button type="submit" disabled={isLoading || !prompt.trim()} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? "Generating..." : "Generate App"}
            {!isLoading && <Wand2 className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
