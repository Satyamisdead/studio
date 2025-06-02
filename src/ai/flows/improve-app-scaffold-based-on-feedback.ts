
'use server';

/**
 * @fileOverview A flow to improve the generated application scaffold based on user feedback.
 *
 * - improveAppScaffoldBasedOnFeedback - A function that handles the improvement process.
 * - ImproveAppScaffoldBasedOnFeedbackInput - The input type for the improveAppScaffoldBasedOnFeedback function.
 * - ImproveAppScaffoldBasedOnFeedbackOutput - The return type for the improveAppScaffoldBasedOnFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveAppScaffoldBasedOnFeedbackInputSchema = z.object({
  initialCode: z
    .string()
    .describe('The initial generated code for the application scaffold, as a JSON string representing an array of {name: string, content: string} objects.'),
  userFeedback: z
    .string()
    .describe('The feedback provided by the user on the generated code.'),
  prompt: z
    .string()
    .describe('The original prompt used to generate the application scaffold.'),
});
export type ImproveAppScaffoldBasedOnFeedbackInput = z.infer<
  typeof ImproveAppScaffoldBasedOnFeedbackInputSchema
>;

// Output schema should be an array of files, similar to GenerateAppScaffoldOutputSchema
const ImprovedAppScaffoldOutputSchema = z.object({
  files: z
    .array(
      z.object({
        name: z.string().describe('The full path and name of the file (e.g., "src/app/page.tsx").'),
        content: z.string().describe('The new, complete content of the file.'),
      })
    )
    .describe('An array of files representing the improved web application scaffold. This should be the complete set of files for the application after applying the feedback.'),
});
export type ImproveAppScaffoldBasedOnFeedbackOutput = z.infer<
  typeof ImprovedAppScaffoldOutputSchema
>;

export async function improveAppScaffoldBasedOnFeedback(
  input: ImproveAppScaffoldBasedOnFeedbackInput
): Promise<ImproveAppScaffoldBasedOnFeedbackOutput> {
  return improveAppScaffoldBasedOnFeedbackFlow(input);
}

const improveAppScaffoldBasedOnFeedbackPrompt = ai.definePrompt({
  name: 'improveAppScaffoldBasedOnFeedbackPrompt',
  input: {schema: ImproveAppScaffoldBasedOnFeedbackInputSchema},
  output: {schema: ImprovedAppScaffoldOutputSchema}, // Use the new output schema
  prompt: `You are an AI expert in modifying web application scaffolds.
You previously generated an application scaffold based on an original prompt. The user has provided feedback on this scaffold.
Your task is to update the application scaffold based on this feedback.

Original Prompt:
{{{prompt}}}

Current Application Files (JSON array of {name: string, content: string}):
{{{initialCode}}}

User Feedback:
{{{userFeedback}}}

Based on the user feedback, you must provide an updated set of files.
- If a file needs to be modified, include its full name and the new, complete content.
- If a new file needs to be created, include its full name and content.
- If a file is to be deleted, do not include it in the output array.
- You are providing a complete new set of files that should constitute the entire application after improvements.

The output MUST be a JSON object matching the following Zod schema:
{{output_schema}}

Specifically, the output should be a JSON object with a single key "files".
The value of "files" should be an array of objects, where each object has two keys:
- "name": A string representing the full path and name of the file (e.g., "src/app/page.tsx").
- "content": A string containing the new, complete code for that file.

Do not include any explanatory text or markdown formatting outside of the JSON object.
The entire response must be only the valid JSON object.
`,
});

const improveAppScaffoldBasedOnFeedbackFlow = ai.defineFlow(
  {
    name: 'improveAppScaffoldBasedOnFeedbackFlow',
    inputSchema: ImproveAppScaffoldBasedOnFeedbackInputSchema,
    outputSchema: ImprovedAppScaffoldOutputSchema, // Use the new output schema
  },
  async input => {
    const {output} = await improveAppScaffoldBasedOnFeedbackPrompt(input);
    return output!;
  }
);
