import { BookHeart, PenLine } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function EmptyState({ message, suggestion, actionLink, actionText }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center p-8 my-8"
    >
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <BookHeart className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-2xl     mb-3">{message || "No journal entries yet"}</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {suggestion || "Start capturing your thoughts and feelings by creating your first journal entry."}
      </p>
      <Button asChild size="lg" className="rounded-full">
        <Link href={actionLink || "/journal/new"}>
          <PenLine className="mr-2 h-5 w-5" />
          {actionText || "Write First Entry"}
        </Link>
      </Button>
    </motion.div>
  );
}