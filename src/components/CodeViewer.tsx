"use client";

import { ClipboardCopy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { GeneratedFile } from "@/types";

interface CodeViewerProps {
  file: GeneratedFile | null;
}

export default function CodeViewer({ file }: CodeViewerProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (file?.content) {
      navigator.clipboard.writeText(file.content)
        .then(() => {
          toast({ title: "Copied to clipboard!", description: `${file.name} content copied.` });
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
          toast({ title: "Error", description: "Failed to copy content.", variant: "destructive" });
        });
    }
  };

  if (!file) {
    return (
      <div className="h-96 flex items-center justify-center rounded-md border border-dashed bg-muted/20">
        <p className="text-sm text-muted-foreground">Select a file to view its content.</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-md border bg-muted/20 shadow-inner">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 h-7 w-7"
        aria-label="Copy code"
      >
        <ClipboardCopy className="h-4 w-4" />
      </Button>
      <ScrollArea className="h-96 p-4">
        <pre className="text-sm overflow-auto">
          <code className="font-code whitespace-pre-wrap break-all">
            {file.content}
          </code>
        </pre>
      </ScrollArea>
    </div>
  );
}
