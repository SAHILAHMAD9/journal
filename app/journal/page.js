"use client";

import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';
import JournalBook from '@/components/JournalBook';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function JournalPage() {
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch('/api/journal');
        if (!response.ok) throw new Error("Failed to fetch journals");
        const data = await response.json();
        setJournals(data);
        setFilteredJournals(data);
      } catch (error) {
        toast.error("Failed to load journal entries");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournals();
  }, []);
 
  useEffect(() => {
    let result = journals;
    if (searchQuery) {
      result = result.filter((journal) =>
        journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (journal.tags && journal.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
    }
    setFilteredJournals(result);
  }, [searchQuery, journals]);

  const handleDelete = (id) => {
    setJournals(journals.filter(journal => journal._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl  ncing text-pink-700">My Journal</h1>
        <Button asChild className="rounded-full bg-pink-500 hover:bg-pink-400 text-white">
          <Link href="/journal/new">
            

            <Plus className="mr-2 h-5 w-5" />
            New Entry
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-2 md:mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-300" />
          <Input
            placeholder="Search entries..."
            className="pl-10 rounded-full caret-pink-700 border-pink-300 focus:border-pink-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Skeleton className="w-[400px] h-[600px] rounded-xl" />
        </div>
      ) : filteredJournals.length > 0 ? (
        // Single flipbook with all entries
        <JournalBook journals={filteredJournals} onDelete={handleDelete} />
      ) : journals.length > 0 ? (
        <EmptyState
          message="No matching entries"
          suggestion="Try adjusting your search..."
        />
      ) : (
        <EmptyState />
      )}

    </div>
  );
}

// Mock data - would be replaced with actual API call
// Mock data - would be replaced with actual API calls
function getMockJournals() {
  return [
    {
      _id: '1',
      title: 'Had a wonderful day at the park',
      content: 'Today I spent the afternoon at the park with friends. The weather was perfect, sunny but not too hot. We had a picnic and played frisbee for hours. It was exactly what I needed after a stressful week.',
      mood: 'happy',
      date: new Date('2023-04-15'),
      tags: ['friends', 'outdoors', 'weekend'],
    },
    {
      _id: '2',
      title: 'Feeling overwhelmed with work',
      content: 'There\'s so much to do at work right now. Three deadlines coming up next week and I don\'t know how I\'ll manage to complete everything in time. I need to talk to my manager about this workload.',
      mood: 'anxious',
      date: new Date('2023-04-12'),
      tags: ['work', 'stress'],
    },
    {
      _id: '3',
      title: 'Argument with my boyfriend',
      content: 'We had a big fight over something so trivial. I wish we could communicate better sometimes. Need to reflect on how I react when I\'m upset.',
      mood: 'angry',
      date: new Date('2023-04-10'),
      tags: ['relationship', 'conflict'],
    },
    {
      _id: '4',
      title: 'Started a new book',
      content: 'Finally started reading that novel everyone\'s been talking about. Only two chapters in but already hooked! The protagonist reminds me of myself in many ways.',
      mood: 'excited',
      date: new Date('2023-04-08'),
      tags: ['books', 'hobbies'],
    },
    {
      _id: '5',
      title: 'Missing home',
      content: 'Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.Called mom and dad today. Being away from family is hard sometimes. Planning to visit them next month if I can get time off work.',
      mood: 'sad',
      date: new Date('2023-04-05'),
      tags: ['family', 'homesick'],
    },
    {
      _id: '6',
      title: 'Peaceful evening by myself',
      content: 'Spent the evening doing self-care. Took a long bath, made my favorite tea, and watched the sunset from my balcony. Sometimes these quiet moments are the most precious.',
      mood: 'calm',
      date: new Date('2023-04-02'),
      tags: ['self-care', 'relaxation'],
    },
  ];
}