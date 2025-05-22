'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookHeart, Heart, PenLine } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  // console.log(user);
  // console.log(isSignedIn);
  
  return (
    <div className="flex flex-col space-y-12 pb-8">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl     font-bold text-primary">
            Dear Diary
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your safe space to express yourself, capture your thoughts,
            and document your daily journey.
          </p>
          {isSignedIn ? <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/journal/new">
                <PenLine className="mr-2 h-5 w-5" />
                Write New Entry
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/journal">
                <BookHeart className="mr-2 h-5 w-5" />
                View My Journal
              </Link>
            </Button>
          </div> :
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/login">
                  Log In
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/signup">
                  Sign Up
                </Link>
              </Button>
            </div>}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-secondary/10 rounded-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl     text-center mb-12">
            Express Your Feelings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mood Tracking */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl md:text-4xl">Track Your Moods</h2>
            <p className="text-muted-foreground">
              Understand your emotional patterns by tracking how you feel each day.
              Our beautiful mood trackers help you visualize your emotional journey.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {moods.map((mood) => (
                <div key={mood.name} className="flex items-center gap-2 p-3 rounded-full bg-background shadow-sm">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${mood.bgColor}`}>
                    {mood.emoji}
                  </div>
                  <span className="pr-2">{mood.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative h-[300px] rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg" 
              alt="Journaling" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl    ">Start Your Journal Today</h2>
          <p className="text-lg">
            Begin your journey of self-reflection and emotional awareness.
            Your thoughts deserve to be captured and cherished.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/journal/new">
              <Heart className="mr-2 h-5 w-5" />
              Begin Writing
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Daily Reflections",
    description: "Document your daily experiences and reflect on your emotions in a safe, private space.",
    icon: <BookHeart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Emotional Release",
    description: "Express your frustrations, joys, and everything in between without judgment.",
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Personal Growth",
    description: "Track your emotional patterns over time and gain insights into your personal growth journey.",
    icon: <PenLine className="h-6 w-6 text-primary" />,
  },
];

const moods = [
  { name: "Happy", emoji: "😊", bgColor: "bg-[#FFF3C4]" },
  { name: "Sad", emoji: "😢", bgColor: "bg-[#D6E8FF]" },
  { name: "Angry", emoji: "😠", bgColor: "bg-[#FFDAD6]" },
  { name: "Calm", emoji: "😌", bgColor: "bg-[#E0FFE0]" },
  { name: "Excited", emoji: "🤩", bgColor: "bg-[#FFE9C8]" },
];