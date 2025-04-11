// crown-jewel-identification.ts
'use server';
/**
 * @fileOverview A crown jewel identification AI agent.
 *
 * - identifyCrownJewel - A function that handles the crown jewel identification process.
 * - IdentifyCrownJewelInput - The input type for the identifyCrownJewel function.
 * - IdentifyCrownJewelOutput - The return type for the identifyCrownJewel function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const IdentifyCrownJewelInputSchema = z.object({
  businessImpact: z.number().describe('The business impact of the asset (0-1).'),
  dataSensitivity: z.number().describe('The data sensitivity of the asset (0-1).'),
  accessFrequency: z.number().describe('The access frequency of the asset (0-1).'),
  complianceRequirement: z.number().describe('The compliance requirement of the asset (0-1).'),
});
export type IdentifyCrownJewelInput = z.infer<typeof IdentifyCrownJewelInputSchema>;

const IdentifyCrownJewelOutputSchema = z.object({
  isCrownJewel: z.boolean().describe('Whether the asset is a crown jewel.'),
  crownJewelScore: z.number().describe('The calculated crown jewel score.'),
  tags: z.array(z.string()).describe('Tags associated with the asset, such as "Critical to Safety" or "GDPR-Relevant".'),
});
export type IdentifyCrownJewelOutput = z.infer<typeof IdentifyCrownJewelOutputSchema>;

export async function identifyCrownJewel(input: IdentifyCrownJewelInput): Promise<IdentifyCrownJewelOutput> {
  return identifyCrownJewelFlow(input);
}

const identifyCrownJewelPrompt = ai.definePrompt({
  name: 'identifyCrownJewelPrompt',
  input: {
    schema: z.object({
      businessImpact: z.number().describe('The business impact of the asset (0-1).'),
      dataSensitivity: z.number().describe('The data sensitivity of the asset (0-1).'),
      accessFrequency: z.number().describe('The access frequency of the asset (0-1).'),
      complianceRequirement: z.number().describe('The compliance requirement of the asset (0-1).'),
    }),
  },
  output: {
    schema: z.object({
      isCrownJewel: z.boolean().describe('Whether the asset is a crown jewel.'),
      crownJewelScore: z.number().describe('The calculated crown jewel score.'),
      tags: z.array(z.string()).describe('Tags associated with the asset, such as "Critical to Safety" or "GDPR-Relevant".'),
    }),
  },
  prompt: `You are an expert security analyst tasked with identifying crown jewel assets.

  Given the following information about an asset, determine if it is a crown jewel based on a weighted scoring system.

  The crown jewel score is calculated as follows:

  crown_jewel_score = (
      0.4 * business_impact +
      0.3 * data_sensitivity +
      0.2 * access_frequency +
      0.1 * compliance_requirement
  )

  If the crown_jewel_score is greater than 0.7, then the asset is a crown jewel.

  Business Impact: {{{businessImpact}}}
  Data Sensitivity: {{{dataSensitivity}}}
  Access Frequency: {{{accessFrequency}}}
  Compliance Requirement: {{{complianceRequirement}}}

  Consider the following tags for the asset:
  - "Critical to Safety" if the asset is critical to the safety of personnel or the environment.
  - "GDPR-Relevant" if the asset stores or processes personal data subject to GDPR.
  - Add other custom tags as appropriate.

  Return a JSON object indicating whether the asset is a crown jewel, the crown jewel score, and any relevant tags.
`,
});

const identifyCrownJewelFlow = ai.defineFlow<
  typeof IdentifyCrownJewelInputSchema,
  typeof IdentifyCrownJewelOutputSchema
>(
  {
    name: 'identifyCrownJewelFlow',
    inputSchema: IdentifyCrownJewelInputSchema,
    outputSchema: IdentifyCrownJewelOutputSchema,
  },
  async input => {
    const {
      businessImpact,
      dataSensitivity,
      accessFrequency,
      complianceRequirement,
    } = input;

    const crownJewelScore = (
      0.4 * businessImpact +
      0.3 * dataSensitivity +
      0.2 * accessFrequency +
      0.1 * complianceRequirement
    );

    const isCrownJewel = crownJewelScore > 0.7;

    const {output} = await identifyCrownJewelPrompt({
      businessImpact,
      dataSensitivity,
      accessFrequency,
      complianceRequirement,
    });

    return {
      ...output!,
      isCrownJewel,
      crownJewelScore,
    };
  }
);
