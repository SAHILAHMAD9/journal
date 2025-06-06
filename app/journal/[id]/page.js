"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Edit, ChevronLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

export default function JournalDetail({ params }) {
  const router = useRouter();
  const [journal, setJournal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
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
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      // In a real app, we'd send a delete request to the API
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Journal entry deleted successfully");
      router.push('/journal');
    } catch (error) {
      console.error(error);
      toast.error("Error deleting journal entry");
    } finally {
      setIsDeleting(false);
    }
  };
  
  const getMoodEmoji = (mood) => {
    const moods = {
      happy: "😊",
      sad: "😢",
      angry: "😠",
      neutral: "😐",
      excited: "🤩",
      anxious: "😰",
      tired: "😴",
      calm: "😌"
    };
    return moods[mood] || "😐";
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-6" 
        onClick={() => router.push('/journal')}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Journal
      </Button>
      
      {isLoading ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-40 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ) : journal ? (
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl md:text-4xl    ">{journal.title}</h1>
            <div className="text-3xl">{getMoodEmoji(journal.mood)}</div>
          </div>
          
          <div className="text-sm text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
            <div>
              <span className="font-medium">Date:</span>{' '}
              {format(new Date(journal.date), 'PPPP')}
            </div>
            <div>
              <span className="font-medium">Mood:</span>{' '}
              {journal.mood.charAt(0).toUpperCase() + journal.mood.slice(1)}
            </div>
          </div>
          
          <div className="bg-card/50 border rounded-2xl p-6 whitespace-pre-wrap">
            {journal.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          
          {journal.tags && journal.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {journal.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => router.push(`/journal/${journal._id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this journal entry.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
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