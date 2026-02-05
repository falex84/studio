'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered hardware diagnostics.
 *
 * The flow takes a user's description of a hardware issue and returns a preliminary AI diagnosis.
 *
 * @exports diagnoseHardwareIssue - An async function that triggers the hardware diagnosis flow.
 * @exports HardwareDiagnosticInput - The input type for the diagnoseHardwareIssue function.
 * @exports HardwareDiagnosticOutput - The output type for the diagnoseHardwareIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the hardware diagnostic flow.
const HardwareDiagnosticInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('A detailed description of the hardware issue experienced by the user.'),
  ticketType: z.string().describe('The type of support ticket (e.g., Hardware Failure, Software Maintenance).'),
  userName: z.string().describe('The name of the user submitting the ticket.'),
});
export type HardwareDiagnosticInput = z.infer<typeof HardwareDiagnosticInputSchema>;

// Define the output schema for the hardware diagnostic flow.
const HardwareDiagnosticOutputSchema = z.object({
  diagnosis: z
    .string()
    .describe('A preliminary AI diagnosis of the hardware issue, including potential causes and solutions.'),
});
export type HardwareDiagnosticOutput = z.infer<typeof HardwareDiagnosticOutputSchema>;

// Define the main function that will be called to trigger the flow.
export async function diagnoseHardwareIssue(
  input: HardwareDiagnosticInput
): Promise<HardwareDiagnosticOutput> {
  return diagnoseHardwareIssueFlow(input);
}

// Define the prompt for the AI model.
const hardwareDiagnosticPrompt = ai.definePrompt({
  name: 'hardwareDiagnosticPrompt',
  input: {schema: HardwareDiagnosticInputSchema},
  output: {schema: HardwareDiagnosticOutputSchema},
  prompt: `You are an AI assistant specialized in diagnosing hardware issues for AlexPC, a computer hardware and support company.

  Based on the user's problem description, provide a preliminary diagnosis. Consider the type of the ticket and the
  user's description of the problem when forming your diagnosis. Be concise and professional.

  User Name: {{{userName}}}
  Ticket Type: {{{ticketType}}}
  Problem Description: {{{problemDescription}}}`,
});

// Define the Genkit flow.
const diagnoseHardwareIssueFlow = ai.defineFlow(
  {
    name: 'diagnoseHardwareIssueFlow',
    inputSchema: HardwareDiagnosticInputSchema,
    outputSchema: HardwareDiagnosticOutputSchema,
  },
  async input => {
    const {output} = await hardwareDiagnosticPrompt(input);
    return output!;
  }
);
