'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating insights on student attendance based on historical data.
 *
 * The flow takes historical attendance data as input and returns insights about student attendance patterns.
 * It exports:
 * - `generateAttendanceInsights`: The main function to trigger the attendance insights generation flow.
 * - `GenerateAttendanceInsightsInput`: The TypeScript type for the input to the flow.
 * - `GenerateAttendanceInsightsOutput`: The TypeScript type for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAttendanceInsightsInputSchema = z.object({
  attendanceData: z.string().describe('Historical attendance data in JSON format.'),
});
export type GenerateAttendanceInsightsInput = z.infer<typeof GenerateAttendanceInsightsInputSchema>;

const GenerateAttendanceInsightsOutputSchema = z.object({
  insights: z.string().describe('Generated insights on student attendance patterns.'),
});
export type GenerateAttendanceInsightsOutput = z.infer<typeof GenerateAttendanceInsightsOutputSchema>;

export async function generateAttendanceInsights(input: GenerateAttendanceInsightsInput): Promise<GenerateAttendanceInsightsOutput> {
  return generateAttendanceInsightsFlow(input);
}

const generateAttendanceInsightsPrompt = ai.definePrompt({
  name: 'generateAttendanceInsightsPrompt',
  input: {schema: GenerateAttendanceInsightsInputSchema},
  output: {schema: GenerateAttendanceInsightsOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing student attendance data and generating insights.

  Analyze the following historical attendance data and identify any patterns, anomalies, or potential issues.
  Provide a concise summary of your findings, highlighting key trends and suggesting possible interventions.

  Data: {{{attendanceData}}}

  Ensure that the insights are clear, actionable, and relevant to improving student attendance.
  `,
});

const generateAttendanceInsightsFlow = ai.defineFlow(
  {
    name: 'generateAttendanceInsightsFlow',
    inputSchema: GenerateAttendanceInsightsInputSchema,
    outputSchema: GenerateAttendanceInsightsOutputSchema,
  },
  async input => {
    const {output} = await generateAttendanceInsightsPrompt(input);
    return output!;
  }
);
