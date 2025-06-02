
'use server';

/**
 * @fileOverview A flow that generates a basic web application scaffold based on a user prompt.
 *
 * - generateAppScaffold - A function that generates the application scaffold.
 * - GenerateAppScaffoldInput - The input type for the generateAppScaffold function.
 * - GenerateAppScaffoldOutput - The return type for the generateAppScaffold function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAppScaffoldInputSchema = z.object({
  prompt: z.string().describe('A detailed prompt describing the desired web application.'),
});
export type GenerateAppScaffoldInput = z.infer<typeof GenerateAppScaffoldInputSchema>;

const GenerateAppScaffoldOutputSchema = z.object({
  files: z
    .array(
      z.object({
        name: z.string().describe('The full path and name of the file (e.g., "src/app/page.tsx").'),
        content: z.string().describe('The complete content of the file.'),
      })
    )
    .describe('An array of files that make up the web application scaffold.'),
});
export type GenerateAppScaffoldOutput = z.infer<typeof GenerateAppScaffoldOutputSchema>;

export async function generateAppScaffold(input: GenerateAppScaffoldInput): Promise<GenerateAppScaffoldOutput> {
  return generateAppScaffoldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAppScaffoldPrompt',
  input: {schema: GenerateAppScaffoldInputSchema},
  output: {schema: GenerateAppScaffoldOutputSchema},
  prompt: `You are an expert web application developer. Your task is to generate a basic, functional web application scaffold based on the user's prompt.
The scaffold should include all necessary code files (e.g., Next.js/React components, Tailwind CSS, utility files).
The generated code must be well-structured, readable, and follow modern web development best practices.
Ensure that the generated files constitute a complete and runnable application.

You MUST output your response as a JSON object matching the following Zod schema:
{{output_schema}}

Specifically, the output should be a JSON object with a single key "files".
The value of "files" should be an array of objects, where each object has two keys:
- "name": A string representing the full path and name of the file (e.g., "src/app/page.tsx", "src/components/MyComponent.tsx").
- "content": A string containing the complete code for that file.

Do not include any explanatory text or markdown formatting outside of the JSON object.
The entire response must be only the valid JSON object.

User Prompt: {{{prompt}}}`,
});

const generateAppScaffoldFlow = ai.defineFlow(
  {
    name: 'generateAppScaffoldFlow',
    inputSchema: GenerateAppScaffoldInputSchema,
    outputSchema: GenerateAppScaffoldOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
