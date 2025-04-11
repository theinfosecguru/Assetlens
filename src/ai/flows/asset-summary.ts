'use server';
/**
 * @fileOverview Summarizes information about an asset.
 *
 * - assetSummary - A function that summarizes asset information.
 * - AssetSummaryInput - The input type for the assetSummary function.
 * - AssetSummaryOutput - The return type for the assetSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AssetSummaryInputSchema = z.object({
  assetDetails: z.string().describe('Detailed information about the asset.'),
});
export type AssetSummaryInput = z.infer<typeof AssetSummaryInputSchema>;

const AssetSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the asset information.'),
});
export type AssetSummaryOutput = z.infer<typeof AssetSummaryOutputSchema>;

export async function assetSummary(input: AssetSummaryInput): Promise<AssetSummaryOutput> {
  return assetSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assetSummaryPrompt',
  input: {
    schema: z.object({
      assetDetails: z.string().describe('Detailed information about the asset.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the asset information.'),
    }),
  },
  prompt: `You are an expert cybersecurity analyst.

  Please provide a concise summary of the following asset details:

  {{{assetDetails}}}
  `,
});

const assetSummaryFlow = ai.defineFlow<
  typeof AssetSummaryInputSchema,
  typeof AssetSummaryOutputSchema
>(
  {
    name: 'assetSummaryFlow',
    inputSchema: AssetSummaryInputSchema,
    outputSchema: AssetSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
