'use server';
/**
 * @fileOverview A data query AI agent.
 *
 * - dataQuery - A function that handles the data query process.
 * - DataQueryInput - The input type for the dataQuery function.
 * - DataQueryOutput - The return type for the dataQuery function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const DataQueryInputSchema = z.object({
  query: z.string().describe('The query to be executed against the data.'),
  data: z.string().describe('The available data to query.'),
});
export type DataQueryInput = z.infer<typeof DataQueryInputSchema>;

const DataQueryOutputSchema = z.object({
  response: z.string().describe('The AI response to the query based on the data.'),
});
export type DataQueryOutput = z.infer<typeof DataQueryOutputSchema>;

export async function dataQuery(input: DataQueryInput): Promise<DataQueryOutput> {
  return dataQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dataQueryPrompt',
  input: {
    schema: z.object({
      query: z.string().describe('The query to be executed against the data.'),
      data: z.string().describe('The available data to query.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The AI response to the query based on the data.'),
    }),
  },
  prompt: `You are an AI assistant that answers questions based on the given data.

Data:
{{{data}}}

Query:
{{{query}}}

Response:`,
});

const dataQueryFlow = ai.defineFlow<
  typeof DataQueryInputSchema,
  typeof DataQueryOutputSchema
>(
  {
    name: 'dataQueryFlow',
    inputSchema: DataQueryInputSchema,
    outputSchema: DataQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
