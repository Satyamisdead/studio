
"use server";

import { generateAppScaffold } from "@/ai/flows/generate-app-scaffold";
import type { GenerateAppScaffoldOutput } from "@/ai/flows/generate-app-scaffold";
import { improveAppScaffoldBasedOnFeedback } from "@/ai/flows/improve-app-scaffold-based-on-feedback";
import type { ImproveAppScaffoldBasedOnFeedbackOutput } from "@/ai/flows/improve-app-scaffold-based-on-feedback"; // Updated import
import type { GeneratedFile } from "@/types";

export async function handleGenerateScaffold(
  prompt: string
): Promise<{ files?: GeneratedFile[]; error?: string }> {
  if (!prompt.trim()) {
    return { error: "Prompt cannot be empty." };
  }
  try {
    const result: GenerateAppScaffoldOutput = await generateAppScaffold({ prompt });
    if (result.files && result.files.length > 0) {
      return { files: result.files };
    }
    // It's possible AI returns an empty list of files.
    if (result.files && result.files.length === 0) {
      return { files: [] };
    }
    return { error: "AI did not return any files. Try a different prompt." };
  } catch (e) {
    console.error("Error generating scaffold:", e);
    const errorMessage = (e instanceof Error && e.message) ? e.message : "Please try again.";
    return { error: `Failed to generate scaffold: ${errorMessage}` };
  }
}

export async function handleImproveScaffold(
  currentFilesJson: string,
  feedback: string,
  originalPrompt: string
): Promise<{ files?: GeneratedFile[]; error?: string }> {
  if (!feedback.trim()) {
    return { error: "Feedback cannot be empty." };
  }
  try {
    const result: ImproveAppScaffoldBasedOnFeedbackOutput = await improveAppScaffoldBasedOnFeedback({
      initialCode: currentFilesJson,
      userFeedback: feedback,
      prompt: originalPrompt,
    });

    if (result.files && Array.isArray(result.files)) {
      // Check if files array is structurally sound (though Zod should catch this in the flow)
      if (result.files.every(f => typeof f.name === 'string' && typeof f.content === 'string')) {
        return { files: result.files }; // This includes an empty array if AI returns no files
      } else {
        return { error: "AI returned files in an unexpected format. Please try again." };
      }
    }
    return { error: "AI did not return improved files. Try different feedback." };
  } catch (e) {
    console.error("Error improving scaffold:", e);
    const errorMessage = (e instanceof Error && e.message) ? e.message : "Please try again.";
    return { error: `Failed to improve scaffold: ${errorMessage}` };
  }
}
