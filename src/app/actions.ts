"use server";

import { generateAppScaffold } from "@/ai/flows/generate-app-scaffold";
import type { GenerateAppScaffoldOutput } from "@/ai/flows/generate-app-scaffold";
import { improveAppScaffoldBasedOnFeedback } from "@/ai/flows/improve-app-scaffold-based-on-feedback";
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
    return { error: "AI did not return any files. Try a different prompt." };
  } catch (e) {
    console.error("Error generating scaffold:", e);
    return { error: "Failed to generate scaffold. Please try again." };
  }
}

export async function handleImproveScaffold(
  currentFilesJson: string,
  feedback: string,
  originalPrompt: string
): Promise<{ files?: GeneratedFile[]; error?: string; rawOutput?: string }> {
  if (!feedback.trim()) {
    return { error: "Feedback cannot be empty." };
  }
  try {
    const result = await improveAppScaffoldBasedOnFeedback({
      initialCode: currentFilesJson,
      userFeedback: feedback,
      prompt: originalPrompt,
    });

    if (result.improvedCode) {
      try {
        // Attempt to parse the improvedCode as an array of GeneratedFile objects
        const parsedFiles = JSON.parse(result.improvedCode) as GeneratedFile[];
        if (Array.isArray(parsedFiles) && parsedFiles.every(f => typeof f.name === 'string' && typeof f.content === 'string')) {
          return { files: parsedFiles };
        } else {
           // If parsing is successful but not in the correct format, return as raw.
          return { error: "Improved code is not in the expected file format. Displaying raw output.", rawOutput: result.improvedCode };
        }
      } catch (parseError) {
        // If JSON.parse fails, it's likely a single string of code or natural language response
        return { error: "Failed to parse improved code as a file structure. Displaying raw output.", rawOutput: result.improvedCode };
      }
    }
    return { error: "AI did not return improved code." };
  } catch (e) {
    console.error("Error improving scaffold:", e);
    return { error: "Failed to improve scaffold. Please try again." };
  }
}
