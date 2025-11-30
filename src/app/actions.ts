// src/app/actions.ts
'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  try {
    // Here you would typically send an email (e.g., using Resend, SendGrid)
    // or save the submission to a database (e.g., Firebase Firestore).
    // For this example, we'll just log the data and simulate a success.

    console.log('New contact form submission to sharmashyama1988@gmail.com:', values);

    // Simulate network delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simulate a random error for demonstration purposes
    // if (Math.random() > 0.5) {
    //   throw new Error("Failed to send message due to a simulated server error.");
    // }

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    // In a real application, you might want to log this error to a service like Sentry.
    return { success: false, message: 'Sorry, something went wrong on our end. Please try again later.' };
  }
}
