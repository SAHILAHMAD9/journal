"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JournalForm from '@/components/JournalForm';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function EditJournalPage({ params }) {
  const router = useRouter();
  const [journal, setJournal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        // In a real app with auth, we would fetch from the API
        // For now, we'll simulate it
        
        // Simulate API call delay
        setTimeout(() => {
          const mockJournals = getMockJournals();
          const foundJournal = mockJournals.find(j => j._id === params.id);
          
          if (foundJournal) {
            // Ensure date is a Date object
            foundJournal.date = new Date(foundJournal.date);
            setJournal(foundJournal);
          } else {
            router.push('/journal');
            toast.error("Journal entry not found");
          }
          
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error(error);
        toast.error("Failed to load journal entry");
        setIsLoading(false);
        router.push('/journal');
      }
    };
    
    fetchJournal();
  }, [params.id, router]);
  
  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // In a real app, we'd send this to the API
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Journal entry updated successfully");
      router.push(`/journal/${params.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error updating journal entry");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-6" 
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      
      <h1 className="text-3xl md:text-4xl     mb-8">Edit Journal Entry</h1>
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : journal ? (
        <JournalForm 
          initialData={journal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <div className="text-center py-10">
          <p>Journal entry not found.</p>
        </div>
      )}
    </div>
  );
}

// Mock data - would be replaced with actual API calls
function getMockJournals() {
  return [
    {
      _id: '1',
      title: 'Had a wonderful day at the park',
      content: 'Today I spent the afternoon at the park with friends. The weather was perfect, sunny but not too hot. We had a picnic and played frisbee for hours. It was exactly what I needed after a stressful week.\n\nWe also went for a walk around the lake and fed the ducks. It felt so peaceful and relaxing. Sometimes I forget how important it is to take breaks and enjoy nature.\n\nI should plan more outdoor activities like this in the future.',
      mood: 'happy',
      date: new Date('2023-04-15'),
      tags: ['friends', 'outdoors', 'weekend'],
    },
    {
      _id: '2',
      title: 'Feeling overwhelmed with work',
      content: 'There\'s so much to do at work right now. Three deadlines coming up next week and I don\'t know how I\'ll manage to complete everything in time. I need to talk to my manager about this workload.\n\nI\'ve been staying late at the office every day this week and I\'m starting to feel burned out. My sleep schedule is completely off too.\n\nI need to prioritize better and maybe ask for an extension on some of these projects.',
      mood: 'anxious',
      date: new Date('2023-04-12'),
      tags: ['work', 'stress'],
    },
    {
      _id: '3',
      title: 'Argument with my boyfriend',
      content: 'We had a big fight over something so trivial. I wish we could communicate better sometimes. Need to reflect on how I react when I\'m upset.\n\nI know I tend to get defensive quickly, but he also doesn\'t always express his feelings clearly. We both need to work on this.\n\nI\'ll try to talk to him calmly tomorrow after we\'ve both had some time to cool down.',
      mood: 'angry',
      date: new Date('2023-04-10'),
      tags: ['relationship', 'conflict'],
    },
    {
      _id: '4',
      title: 'Started a new book',
      content: 'Finally started reading that novel everyone\'s been talking about. Only two chapters in but already hooked! The protagonist reminds me of myself in many ways.\n\nThe writing style is so engaging and the world-building is incredible. I can see why this book has won so many awards.\n\nI\'m looking forward to curling up with it again tonight. Reading has always been my favorite escape.',
      mood: 'excited',
      date: new Date('2023-04-08'),
      tags: ['books', 'hobbies'],
    },
    {
      _id: '5',
      title: 'Missing home',
      content: 'Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.\n\nI miss mom\'s cooking and our family game nights. Even though I love my independence, there are days when I wish I could just pop by for dinner.\n\nNeed to remember to call my brother tomorrow for his birthday.',
      mood: 'sad',
      date: new Date('2023-04-05'),
      tags: ['family', 'homesick'],
    },
    {
      _id: '6',
      title: 'Peaceful evening by myself',
      content: 'Spent the evening doing self-care. Took a long bath, made my favorite tea, and watched the sunset from my balcony. Sometimes these quiet moments are the most precious.\n\nI\'ve been so busy lately that I haven\'t had much time for myself. Tonight reminded me how important it is to slow down sometimes.\n\nI lit my favorite candles and just enjoyed the silence. No social media, no TV, just me and my thoughts. I should do this more often.',
      mood: 'calm',
      date: new Date('2023-04-02'),
      tags: ['self-care', 'relaxation'],
    },
  ];
}