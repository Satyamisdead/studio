"use client";

import { FileText, FolderIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GeneratedFile } from "@/types";

interface FileExplorerProps {
  files: GeneratedFile[];
  selectedFile: GeneratedFile | null;
  onSelectFile: (file: GeneratedFile) => void;
}

export default function FileExplorer({ files, selectedFile, onSelectFile }: FileExplorerProps) {
  if (!files || files.length === 0) {
    return <p className="text-sm text-muted-foreground">No files generated yet.</p>;
  }

  // Basic heuristic to group files by pseudo-folders
  const fileTree: Record<string, GeneratedFile[]> = files.reduce((acc, file) => {
    const parts = file.name.split('/');
    const folder = parts.length > 1 ? parts.slice(0, -1).join('/') : '/'; // Root folder if no slashes
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(file);
    return acc;
  }, {} as Record<string, GeneratedFile[]>);


  return (
    <ScrollArea className="h-96 rounded-md border p-2 bg-muted/20 shadow-inner">
      <div className="space-y-1">
        {Object.entries(fileTree).map(([folderName, folderFiles]) => (
          <div key={folderName}>
            {folderName !== '/' && (
              <div className="flex items-center px-2 py-1.5 text-sm font-medium text-muted-foreground">
                <FolderIcon className="mr-2 h-4 w-4" />
                {folderName}
              </div>
            )}
            {folderFiles.map((file) => (
              <Button
                key={file.name}
                variant="ghost"
                size="sm"
                onClick={() => onSelectFile(file)}
                className={cn(
                  "w-full justify-start text-left h-auto py-1.5 px-2",
                  selectedFile?.name === file.name && "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
                  folderName !== '/' && "ml-4" // Indent files in folders
                )}
                aria-pressed={selectedFile?.name === file.name}
              >
                <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{file.name.split('/').pop()}</span>
              </Button>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
