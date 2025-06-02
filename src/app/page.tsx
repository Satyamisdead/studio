
"use client";

import * as React from "react";
import AppHeader from "@/components/AppHeader";
import PromptForm from "@/components/PromptForm";
import FileExplorer from "@/components/FileExplorer";
import CodeViewer from "@/components/CodeViewer";
import FeedbackForm from "@/components/FeedbackForm";
import DownloadButton from "@/components/DownloadButton";
import RunProjectButton from "@/components/RunProjectButton"; // Import the new component
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import WelcomeMessage from "@/components/WelcomeMessage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { handleGenerateScaffold, handleImproveScaffold } from "./actions";
import type { GeneratedFile } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { FileOutput } from "lucide-react";


export default function StudioPage() {
  const [originalPrompt, setOriginalPrompt] = React.useState<string>("");
  const [generatedFiles, setGeneratedFiles] = React.useState<GeneratedFile[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<GeneratedFile | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const onPromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedFiles([]);
    setSelectedFile(null);
    setOriginalPrompt(prompt);

    const result = await handleGenerateScaffold(prompt);
    if (result.files) { 
      setGeneratedFiles(result.files);
      if (result.files.length > 0) {
        setSelectedFile(result.files[0]); 
        toast({ title: "App Scaffold Generated!", description: "Review the files and code." });
      } else {
        toast({ title: "Empty Scaffold Generated", description: "The AI generated an empty project. You can provide feedback or try a new prompt.", variant: "default" });
      }
    } else if (result.error) {
      setError(result.error);
      toast({ title: "Generation Error", description: result.error, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const onFeedbackSubmit = async (feedback: string) => {
    if (!originalPrompt || generatedFiles.length === 0 && !originalPrompt) { 
      setError("Cannot submit feedback without an initial prompt attempt.");
      toast({ title: "Feedback Error", description: "Please attempt to generate an app first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setError(null);

    const currentFilesJson = JSON.stringify(generatedFiles);
    const result = await handleImproveScaffold(currentFilesJson, feedback, originalPrompt);

    if (result.files) { 
      setGeneratedFiles(result.files);
      if (result.files.length > 0) {
        const currentSelectedStillExists = result.files.find(f => f.name === selectedFile?.name);
        setSelectedFile(currentSelectedStillExists || result.files[0]);
      } else {
        setSelectedFile(null);
        toast({ title: "No Changes Suggested", description: "The AI processed your feedback but returned no files. The project might be empty or unchanged.", variant: "default" });
      }
      toast({ title: "Scaffold Improved!", description: "The application scaffold has been updated based on your feedback." });
    } else if (result.error) {
      setError(result.error);
      toast({ title: "Improvement Error", description: result.error, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const projectNameForActions = React.useMemo(() => {
    return originalPrompt.substring(0,30).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || "ai-generated-app";
  }, [originalPrompt]);


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* --- Left Column: Inputs --- */}
          <div className="lg:col-span-4 space-y-6">
            <PromptForm onSubmit={onPromptSubmit} isLoading={isLoading} />
            { (originalPrompt || generatedFiles.length > 0) && !isLoading && (
              <FeedbackForm onSubmit={onFeedbackSubmit} isLoading={isLoading} />
            )}
          </div>

          {/* --- Right Column: Outputs & Previews --- */}
          <div className="lg:col-span-8 space-y-6">
            {isLoading && <LoadingSpinner text={isLoading ? "AI is thinking..." : "Loading..."} />}
            {error && !isLoading && <ErrorMessage message={error} />}
            
            {!isLoading && generatedFiles.length === 0 && !error && !originalPrompt && (
              <WelcomeMessage />
            )}

            {generatedFiles.length > 0 && !isLoading && (
              <Card className="shadow-xl">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <CardTitle className="font-headline text-2xl flex items-center">
                      <FileOutput className="mr-2 h-6 w-6 text-primary"/>
                      Generated Application
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <RunProjectButton files={generatedFiles} projectName={projectNameForActions} isLoading={isLoading} />
                      <DownloadButton files={generatedFiles} projectName={projectNameForActions} />
                    </div>
                  </div>
                  <CardDescription>Review the generated files and code. Select a file to view its content. You can run the project in StackBlitz or download it.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <h3 className="text-lg font-semibold mb-2 font-headline">File Explorer</h3>
                      <FileExplorer files={generatedFiles} selectedFile={selectedFile} onSelectFile={setSelectedFile} />
                    </div>
                    <div className="md:col-span-8">
                       <h3 className="text-lg font-semibold mb-2 font-headline">Code Preview</h3>
                      <CodeViewer file={selectedFile} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
             {!isLoading && generatedFiles.length === 0 && originalPrompt && !error && (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">No Files Generated</CardTitle>
                  <CardDescription>The AI did not generate any files for your prompt. You can provide feedback to refine it or try a new prompt.</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t mt-8">
        Azoums AI WebApp Studio &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
