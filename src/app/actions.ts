// src/app/actions.ts
'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  // Here you would typically send an email (e.g., using Resend, SendGrid)
  // or save the submission to a database (e.g., Firebase Firestore).
  // For this example, we'll just log the data and simulate a success.

  console.log('New contact form submission to sharmashyama1988@gmail.com:', values);

  // Simulate network delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would add error handling here.
  // if (error) {
  //   return { success: false, message: 'Failed to send message.' };
  // }

  return { success: true };
}
