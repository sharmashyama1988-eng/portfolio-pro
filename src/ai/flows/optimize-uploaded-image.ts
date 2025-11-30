'use server';

/**
 * @fileOverview Optimizes uploaded images by reducing file size without significant quality loss.
 *
 * - optimizeImage - A function that handles the image optimization process.
 * - OptimizeImageInput - The input type for the optimizeImage function.
 * - OptimizeImageOutput - The return type for the optimizeImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to optimize, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OptimizeImageInput = z.infer<typeof OptimizeImageInputSchema>;

const OptimizeImageOutputSchema = z.object({
  optimizedPhotoDataUri: z
    .string()
    .describe(
      'The optimized photo, as a data URI with Base64 encoding.'
    ),
});
export type OptimizeImageOutput = z.infer<typeof OptimizeImageOutputSchema>;

export async function optimizeImage(input: OptimizeImageInput): Promise<OptimizeImageOutput> {
  return optimizeImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeImagePrompt',
  input: {schema: OptimizeImageInputSchema},
  output: {schema: OptimizeImageOutputSchema},
  prompt: `You are an expert image optimization service.  You will take in an image, and output an optimized version of the image that is smaller in file size, but retains good visual quality.

Take the following image and optimize it:

{{media url=photoDataUri}}`,
});

const optimizeImageFlow = ai.defineFlow(
  {
    name: 'optimizeImageFlow',
    inputSchema: OptimizeImageInputSchema,
    outputSchema: OptimizeImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
