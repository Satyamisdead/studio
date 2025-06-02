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
        name: z.string().describe('The name of the file.'),
        content: z.string().describe('The content of the file.'),
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
  prompt: `You are an expert web application developer.  You will generate a basic, functional web application scaffold, including all necessary code files (HTML, CSS, JavaScript/Next.js) based on the user's prompt.

  The generated code should be well-structured, readable, and follow modern web development best practices.  Ensure that the generated files are a complete and runnable application.

  Prompt: {{{prompt}}}`,
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
