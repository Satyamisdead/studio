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
    .describe('The initial generated code for the application scaffold.'),
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

const ImproveAppScaffoldBasedOnFeedbackOutputSchema = z.object({
  improvedCode: z
    .string()
    .describe('The improved code for the application scaffold.'),
});
export type ImproveAppScaffoldBasedOnFeedbackOutput = z.infer<
  typeof ImproveAppScaffoldBasedOnFeedbackOutputSchema
>;

export async function improveAppScaffoldBasedOnFeedback(
  input: ImproveAppScaffoldBasedOnFeedbackInput
): Promise<ImproveAppScaffoldBasedOnFeedbackOutput> {
  return improveAppScaffoldBasedOnFeedbackFlow(input);
}

const improveAppScaffoldBasedOnFeedbackPrompt = ai.definePrompt({
  name: 'improveAppScaffoldBasedOnFeedbackPrompt',
  input: {schema: ImproveAppScaffoldBasedOnFeedbackInputSchema},
  output: {schema: ImproveAppScaffoldBasedOnFeedbackOutputSchema},
  prompt: `You are an AI expert in generating web application scaffolds.

You have generated an initial application scaffold based on the following prompt:

Prompt: {{{prompt}}}

The initial code generated was:

Initial Code: {{{initialCode}}}

A user has provided the following feedback on the generated code:

User Feedback: {{{userFeedback}}}

Based on the user feedback, improve the generated code, ensuring that the improved code is functional, efficient, and addresses the user's concerns. The improved code should also adhere to best practices for web development.

Improved Code:`,
});

const improveAppScaffoldBasedOnFeedbackFlow = ai.defineFlow(
  {
    name: 'improveAppScaffoldBasedOnFeedbackFlow',
    inputSchema: ImproveAppScaffoldBasedOnFeedbackInputSchema,
    outputSchema: ImproveAppScaffoldBasedOnFeedbackOutputSchema,
  },
  async input => {
    const {output} = await improveAppScaffoldBasedOnFeedbackPrompt(input);
    return output!;
  }
);
