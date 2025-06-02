
"use client";

import * as React from "react";
import sdk from "@stackblitz/sdk";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GeneratedFile } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface RunProjectButtonProps {
  files: GeneratedFile[];
  projectName?: string;
  isLoading: boolean;
}

export default function RunProjectButton({ files, projectName = "ai-generated-app", isLoading }: RunProjectButtonProps) {
  const { toast } = useToast();

  const handleRunProject = () => {
    if (files.length === 0) {
      toast({
        title: "Cannot Run Project",
        description: "No files have been generated yet.",
        variant: "destructive",
      });
      return;
    }

    const projectFiles: Record<string, string> = {};
    let packageJsonFound = false;
    let entryFile = "src/app/page.tsx"; // Default entry file

    if (files.length > 0) {
        entryFile = files[0].name; // Use the first file as a fallback entry
        const pageTsxFile = files.find(f => f.name.endsWith('page.tsx') || f.name.endsWith('page.js'));
        if (pageTsxFile) entryFile = pageTsxFile.name;
        const indexHtmlFile = files.find(f => f.name === 'index.html' || f.name === 'public/index.html');
        if (indexHtmlFile) entryFile = indexHtmlFile.name;

    }


    files.forEach(file => {
      projectFiles[file.name] = file.content;
      if (file.name === 'package.json') {
        packageJsonFound = true;
      }
    });

    if (!packageJsonFound) {
      projectFiles['package.json'] = JSON.stringify({
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev -p $PORT', // StackBlitz uses $PORT for Next.js
          build: 'next build',
          start: 'next start -p $PORT',
          lint: 'next lint'
        },
        dependencies: {
          'next': '15.2.3', // Pin to a known working version from this project
          'react': '^18.3.1',
          'react-dom': '^18.3.1'
          // Tailwind and other common dependencies should be added by the AI if needed
        },
        devDependencies: {
          'typescript': '^5',
          '@types/node': '^20',
          '@types/react': '^18',
          '@types/react-dom': '^18',
          'postcss': '^8', // Often needed for Next.js + Tailwind
          'tailwindcss': '^3', // Often needed for Next.js + Tailwind
          'autoprefixer': '^10' // Often needed for Next.js + Tailwind
        }
      }, null, 2);
      toast({
        title: "Missing package.json",
        description: "A default package.json was created for StackBlitz. The AI should ideally generate this file.",
        variant: "default",
      });
    }
    
    // Ensure a basic index.html exists if not a Next.js app with a pages router setup
    // For Next.js with App Router, this isn't strictly necessary for `next dev`
    // but can be a fallback for simpler projects.
    if (!projectFiles['index.html'] && !projectFiles['public/index.html'] && !files.some(f => f.name.startsWith('src/app/'))) {
        projectFiles['index.html'] = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${projectName}</title>
</head>
<body>
  <div id="root"></div>
  <p>If you see this, your Next.js app might not be configured correctly or is still building. Check the console.</p>
  <script>
    // Simple script to indicate loading, Next.js will take over #root
    const rootDiv = document.getElementById('root');
    if (rootDiv) rootDiv.innerHTML = 'Loading Next.js app...';
  </script>
</body>
</html>`;
    }


    try {
      sdk.openProject({
        title: projectName,
        description: `Preview of AI-generated Next.js app: ${projectName}`,
        template: 'node', // Node.js environment for Next.js
        files: projectFiles,
        settings: {
          compile: {
            trigger: 'auto',
            clearConsole: false,
          },
        },
      }, {
        openFile: entryFile, // Open the main page or first file
        newWindow: true,
        startCommand: 'npm install && npm run dev', // Standard command to install and run Next.js dev server
      });
    } catch (error) {
      console.error("Error opening project in StackBlitz:", error);
      toast({
        title: "StackBlitz Error",
        description: `Could not open project in StackBlitz. ${error instanceof Error ? error.message : ''}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleRunProject} disabled={isLoading || files.length === 0} variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
      <Play className="mr-2 h-4 w-4" />
      Run Project
    </Button>
  );
}
