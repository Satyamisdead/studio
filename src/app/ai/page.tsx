"use client";

import * as React from "react";
import CodeViewer from "@/components/CodeViewer";
import DownloadButton from "@/components/DownloadButton";
import ErrorMessage from "@/components/ErrorMessage";
import FeedbackForm from "@/components/FeedbackForm";
import FileExplorer from "@/components/FileExplorer";
import LoadingSpinner from "@/components/LoadingSpinner";
import PromptForm from "@/components/PromptForm";
import RunProjectButton from "@/components/RunProjectButton";
import WelcomeMessage from "@/components/WelcomeMessage";
import { handleGenerateScaffold, handleImproveScaffold } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { GeneratedFile } from "@/types";

export default function AiStudioPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = React.useState<GeneratedFile[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<GeneratedFile | null>(null);
  const [originalPrompt, setOriginalPrompt] = React.useState("");
  const { toast } = useToast();

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedFiles([]);
    setSelectedFile(null);
    setOriginalPrompt(prompt); // Save the original prompt

    const result = await handleGenerateScaffold(prompt);

    if (result.error) {
      setError(result.error);
      toast({
        title: "Generation Failed",
        description: result.error,
        variant: "destructive",
      });
    } else if (result.files) {
      setGeneratedFiles(result.files);
      if (result.files.length > 0) {
        // Automatically select the first file, preferably page.tsx
        const pageFile = result.files.find(f => f.name.endsWith('page.tsx')) || result.files[0];
        setSelectedFile(pageFile);
      }
      toast({
        title: "Scaffold Generated!",
        description: "Review the files and provide feedback if needed.",
      });
    }
    setIsLoading(false);
  };

  const handleFeedback = async (feedback: string) => {
    if (generatedFiles.length === 0 || !originalPrompt) {
      setError("Cannot provide feedback without an initial scaffold and prompt.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const currentFilesJson = JSON.stringify(generatedFiles);

    const result = await handleImproveScaffold(currentFilesJson, feedback, originalPrompt);

    if (result.error) {
      setError(result.error);
      toast({
        title: "Improvement Failed",
        description: result.error,
        variant: "destructive",
      });
    } else if (result.files) {
      setGeneratedFiles(result.files);
      // Try to keep the same file selected if it still exists, otherwise select the first one.
      const newSelectedFile = result.files.find(f => f.name === selectedFile?.name) || result.files[0] || null;
      setSelectedFile(newSelectedFile);
      toast({
        title: "Scaffold Improved!",
        description: "The application has been updated with your feedback.",
      });
    }
    setIsLoading(false);
  };


  const hasGeneratedContent = generatedFiles.length > 0;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
       <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">AI WebApp Studio</h1>
        <p className="text-muted-foreground">
          Generate a full-stack Next.js application using an AI prompt.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column: Forms */}
        <div className="lg:col-span-1 space-y-6">
          <PromptForm onSubmit={handleGenerate} isLoading={isLoading} initialPrompt={originalPrompt} />
          {hasGeneratedContent && !isLoading && (
            <FeedbackForm onSubmit={handleFeedback} isLoading={isLoading} />
          )}
        </div>

        {/* Right Column: Code Viewer & Files */}
        <div className="lg:col-span-2">
          {isLoading && <LoadingSpinner text="AI is building, please wait..." />}
          {error && !isLoading && <ErrorMessage message={error} />}
          
          {!isLoading && !error && !hasGeneratedContent && (
            <WelcomeMessage />
          )}

          {hasGeneratedContent && !isLoading && !error && (
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <DownloadButton files={generatedFiles} />
                  <RunProjectButton files={generatedFiles} isLoading={isLoading} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold mb-2 font-headline">File Explorer</h3>
                  <FileExplorer files={generatedFiles} selectedFile={selectedFile} onSelectFile={setSelectedFile} />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-2 font-headline">Code Viewer</h3>
                  <CodeViewer file={selectedFile} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
