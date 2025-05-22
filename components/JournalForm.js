"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar, X, Tag, Save, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  mood: z.string(),
  date: z.date(),
  tags: z.array(z.string()).optional(),
});

export default function JournalForm({ initialData, onSubmit, isSubmitting }) {
  const { user } = useUser();
  const { userId, isSignedIn } = useAuth();
  const [newTag, setNewTag] = useState("");
  const [pageFlip, setPageFlip] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      mood: "neutral",
      date: new Date(),
      tags: [],
      userId: isSignedIn ? userId : "temp-user-id",
    },
  });

  const moodOptions = [
    { value: "happy", label: "Happy", emoji: "😊" },
    { value: "sad", label: "Sad", emoji: "😢" },
    { value: "angry", label: "Angry", emoji: "😠" },
    { value: "neutral", label: "Neutral", emoji: "😐" },
    { value: "excited", label: "Excited", emoji: "🤩" },
    { value: "anxious", label: "Anxious", emoji: "😰" },
    { value: "tired", label: "Tired", emoji: "😴" },
    { value: "calm", label: "Calm", emoji: "😌" },
  ];

  const handleFormSubmit = (data) => {
    setPageFlip(true);
    setTimeout(() => {
      onSubmit({...data,userId: userId});
      setPageFlip(false);
    }, 800);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !form.getValues().tags.includes(newTag.trim())) {
      form.setValue("tags", [...form.getValues().tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    form.setValue(
      "tags",
      form.getValues().tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(e);
    }
  };
  // console.log(userId);
  return (
    <div className="relative rounded-xl flex justify-center items-center py-8 sm:px-6 lg:px-8">
      {/* Stickers */}
      <motion.div
        className="journal-container w-full max-w-4xl"
        animate={{
          rotateY: pageFlip ? 180 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative bg-white !rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-pink-800 rounded-l-lg z-10 flex items-center justify-center">
            <div className="h-5/6 w-1 bg-pink-600"></div>
          </div>
          {/* <div className="absolute -right-2 top-8 z-20">
            <Bookmark className="h-10 w-8 text-blue-500 fill-blue-500" />
          </div> */}

          <div className="md:pl-10 pl-8 pr-4 py-8 bg-[url('/images/paperbg.jpeg')] bg-cover bg-center bg-no-repeat rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-slate-200 pb-4 mb-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="mb-0">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="ghost"
                                className="font-handwriting text-xl text-slate-700 hover:text-slate-800 hover:bg-slate-100 px-2 py-1"
                              >
                                {field.value ? (
                                  <span className="scheme-dark">
                                  <input type="date" />
                                  </span>
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                {/* <Calendar className="ml-2 h-4 w-4 opacity-50" /> */}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                      <FormItem className="mb-0">
                        <div className="flex flex-wrap gap-2 justify-end">
                          {moodOptions.map((mood) => (
                            <Button
                              key={mood.value}
                              type="button"
                              variant="ghost"
                              className={cn(
                                "h-8 w-8 p-0 rounded-full",
                                field.value === mood.value && "bg-pink-100"
                              )}
                              onClick={() => field.onChange(mood.value)}
                              title={mood.label}
                            >
                              <span className="text-xl">{mood.emoji}</span>
                            </Button>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Entry Title..."
                          className="text-2xl caret-pink-700 font-handwriting border-none bg-transparent border-b-2 border-slate-200 focus-visible:ring-1 focus-visible:border-pink-700 placeholder:text-pink-900 text-slate-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px)",
                              backgroundPosition: "0 2px",
                            }}
                          ></div>
                          <Textarea
                            placeholder="Dear diary..."
                            className="min-h-[400px] caret-pink-700 resize-none border-none bg-transparent font-handwriting text-lg leading-8 pt-1 focus-visible:ring-1 placeholder:text-pink-900 text-slate-800"
                            style={{ lineHeight: "32px" }}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <AnimatePresence>
                          {field.value.map((tag) => (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{
                                opacity: 0,
                                scale: 0.8,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 px-3 py-1 font-handwriting text-sm">
                                {tag}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 ml-1 text-pink-600 hover:text-pink-800"
                                  onClick={() => handleRemoveTag(tag)}
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">Remove {tag}</span>
                                </Button>
                              </Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      <div className="flex gap-1">
                        <Input
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={handleTagKeyPress}
                          className="rounded-l-md caret-pink-700 border-slate-300 focus-visible:ring-pink-700 placeholder:text-pink-900 font-handwriting"
                        />
                        <Button
                          type="button"
                          onClick={handleAddTag}
                          className="rounded-r-md flex"
                        >
                          <Tag className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="rounded-full px-6 flex font-handwriting text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Entry
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-slate-200 to-transparent"></div>

          <div
            className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-tl-lg shadow-[-2px_-2px_5px_rgba(0,0,0,0.1)] z-10 transform rotate-0"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          >
            <div
              className="absolute right-0 bottom-0 w-14 h-14 bg-gradient-to-tl from-slate-100 to-transparent"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            ></div>
          </div>
        </div>
      </motion.div>

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