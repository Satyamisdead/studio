
"use client";

import * as React from "react";
import sdk from "@stackblitz/sdk";
import { Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GeneratedFile } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface RunProjectButtonProps {
  files: GeneratedFile[];
  projectName?: string;
  onEmbed: () => void;
  setIsEmbedding: (isEmbedding: boolean) => void;
}

export default function RunProjectButton({
  files,
  projectName = "ai-generated-app",
  onEmbed,
  setIsEmbedding,
}: RunProjectButtonProps) {
  const { toast } = useToast();
  const [isClicked, setIsClicked] = React.useState(false);

  const handleRunProject = async () => {
    if (files.length === 0) {
      toast({
        title: "Cannot Run Project",
        description: "No files have been generated yet.",
        variant: "destructive",
      });
      return;
    }
    
    setIsClicked(true);
    onEmbed(); // Signal to parent that embedding process has started

    const projectFiles: Record<string, string> = {};
    let packageJsonFound = false;
    let entryFile = "src/app/page.tsx";

    files.forEach(file => {
      projectFiles[file.name] = file.content;
      if (file.name === 'package.json') {
        packageJsonFound = true;
      }
    });

    const pageFile = files.find(f => f.name.endsWith('page.tsx') || f.name.endsWith('page.js'));
    if (pageFile) entryFile = pageFile.name;


    if (!packageJsonFound) {
      projectFiles['package.json'] = JSON.stringify({
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint'
        },
        dependencies: {
          'next': '15.2.3',
          'react': '^18.3.1',
          'react-dom': '^18.3.1',
          'tailwindcss': '^3.4.1',
          'lucide-react': '^0.475.0',
          '@radix-ui/react-slot': '^1.1.2',
          'class-variance-authority': '^0.7.1',
          'clsx': '^2.1.1',
          'tailwind-merge': '^3.0.1',
          'tailwindcss-animate': '^1.0.7',
        },
        devDependencies: {
          'typescript': '^5',
          '@types/node': '^20',
          '@types/react': '^18',
          '@types/react-dom': '^18',
          'postcss': '^8',
          'autoprefixer': '^10'
        }
      }, null, 2);
       projectFiles['tailwind.config.ts'] = `
        import type { Config } from 'tailwindcss'
        const config: Config = {
          content: [
            './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
            './src/components/**/*.{js,ts,jsx,tsx,mdx}',
            './src/app/**/*.{js,ts,jsx,tsx,mdx}',
          ],
          theme: { extend: {} },
          plugins: [require("tailwindcss-animate")],
        }
        export default config`;
       projectFiles['src/app/globals.css'] = `@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
    }

    try {
      await sdk.embedProject(
        'preview-embed',
        {
          title: projectName,
          description: `Preview of AI-generated Next.js app: ${projectName}`,
          template: 'node',
          files: projectFiles,
          dependencies: JSON.parse(projectFiles['package.json']).dependencies,
        },
        {
          openFile: entryFile,
          view: 'preview',
          showSidebar: false,
          hideExplorer: true,
          clickToLoad: false,
          terminalHeight: 0,
        }
      );
    } catch (error) {
      console.error("Error embedding project in StackBlitz:", error);
      toast({
        title: "StackBlitz Error",
        description: `Could not embed project. ${error instanceof Error ? error.message : ''}`,
        variant: "destructive",
      });
    } finally {
      setIsEmbedding(false);
    }
  };

  return (
    <Button 
      onClick={handleRunProject} 
      disabled={isClicked || files.length === 0} 
      variant="outline" 
      className="bg-green-500 hover:bg-green-600 text-white"
    >
      {isClicked ? <Loader2 className="mr-2 animate-spin" /> : <Eye className="mr-2" />}
      {isClicked ? 'Embedding...' : 'Run Preview'}
    </Button>
  );
}

