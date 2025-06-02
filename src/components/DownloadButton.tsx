"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GeneratedFile } from "@/types";
import JSZip from "jszip";
import { saveAs } from "file-saver"; // You might need to install file-saver: npm install file-saver @types/file-saver

interface DownloadButtonProps {
  files: GeneratedFile[];
  projectName?: string;
}

export default function DownloadButton({ files, projectName = "azoums-ai-app" }: DownloadButtonProps) {
  const handleDownload = async () => {
    if (files.length === 0) return;

    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.name, file.content);
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${projectName}.zip`);
    } catch (error) {
      console.error("Error creating ZIP file:", error);
      // Optionally, show a toast notification for the error
    }
  };

  return (
    <Button onClick={handleDownload} disabled={files.length === 0} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Download Project (.zip)
    </Button>
  );
}
