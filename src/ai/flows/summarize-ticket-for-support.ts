// SummarizeTicketForSupport flow generates a concise summary of a user's hardware issue for support tickets.
// - summarizeTicketForSupport: The main function to summarize the ticket.
// - SummarizeTicketInput: Interface for the input schema.
// - SummarizeTicketOutput: Interface for the output schema.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTicketInputSchema = z.object({
  name: z.string().describe('The name of the user submitting the ticket.'),
  email: z.string().email().describe('The email address of the user.'),
  issueType: z.string().describe('The type of issue the user is experiencing.'),
  issueDescription: z.string().describe('A detailed description of the hardware issue.'),
});

export type SummarizeTicketInput = z.infer<typeof SummarizeTicketInputSchema>;

const SummarizeTicketOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the hardware issue for support.'),
});

export type SummarizeTicketOutput = z.infer<typeof SummarizeTicketOutputSchema>;

export async function summarizeTicketForSupport(input: SummarizeTicketInput): Promise<SummarizeTicketOutput> {
  return summarizeTicketFlow(input);
}

const summarizeTicketPrompt = ai.definePrompt({
  name: 'summarizeTicketPrompt',
  input: {schema: SummarizeTicketInputSchema},
  output: {schema: SummarizeTicketOutputSchema},
  prompt: `You are a support agent summarizing hardware issue tickets for the support team.

  Summarize the following issue in a concise manner:

  User Name: {{name}}
  User Email: {{email}}
  Issue Type: {{issueType}}
  Issue Description: {{issueDescription}}
  `,
});

const summarizeTicketFlow = ai.defineFlow(
  {
    name: 'summarizeTicketFlow',
    inputSchema: SummarizeTicketInputSchema,
    outputSchema: SummarizeTicketOutputSchema,
  },
  async input => {
    const {output} = await summarizeTicketPrompt(input);
    return output!;
  }
);
