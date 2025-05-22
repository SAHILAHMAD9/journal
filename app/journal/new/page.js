"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JournalForm from '@/components/JournalForm';
import { toast } from 'sonner';
import { useAuth, useUser } from '@clerk/nextjs';

export default function NewJournalPage() {
  const {userId } = useAuth()
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(user);
  
  const handleSubmit = async (data) => {
  try {
    setIsSubmitting(true);

    // Send data to the API to save in MongoDB
    const response = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create journal entry');
    }

    toast.success("Journal entry created successfully");
    router.push('/journal');
  } catch (error) {
    console.error(error);
    toast.error("Error creating journal entry");
  } finally {
    setIsSubmitting(false);
  }
};

  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl     mb-8">New Journal Entry</h1>
      <JournalForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}