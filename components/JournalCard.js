"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function JournalCard({ journal, onDelete }) {
  // console.log(journal);
  
  return (
    <div className="bg-[url('/images/paperbg.jpeg')] bg-cover bg-center bg-no-repeat border border-pink-200 rounded-lg p-5 shadow-inner h-full overflow-auto">
      <div className="text-sm text-pink-600 italic mb-2">
        {new Date(journal.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <h2 className="text-2xl font-handwriting text-pink-700 mb-2">
        {journal.title}
      </h2>
      <div className="relative">
        <Image className="absolute rotate-45 rounded-r-lg right-0 bottom-0 z-10" alt="Journal Cover" width={70} height={70} src={'/images/stamp2.png'} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px)",
            backgroundPosition: "0 2px",
          }}
        ></div>
        <p
          className="min-h-[400px] font-handwriting resize-none border-none bg-transparent text-lg leading-6 pt-1 focus-visible:ring-1 placeholder:text-slate-400 text-slate-800"
          style={{ lineHeight: "32px" }}
        >{journal.content}</p>
      </div>
      <p className="text-sm text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed">
        
      </p>

      <div className="flex flex-wrap gap-2">
        {journal.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex bottom-2 justify-end">
        <Button
          variant="ghost"
          className="text-red-500 hover:bg-red-100"
          onClick={() => onDelete(journal._id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Caveat&family=Indie+Flower&display=swap");

        .font-handwriting {
          font-family: "Indie Flower", "Caveat", cursive;
        }

        .journal-container {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
