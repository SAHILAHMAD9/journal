"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useSignUp, useUser } from '@clerk/nextjs';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function SignUpPage() {
    const { isSignedIn, user } = useUser();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });


    const onSubmit = async (data) => {
        if (!isLoaded) return;

        try {
            setIsLoading(true);

            // Create user
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
            });

            // Send email verification code (optional if auto-enabled)
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            toast.success("Check your email for the verification code");

            // Optionally you can redirect to a verification screen or auto-activate:
            // await signUp.attemptEmailAddressVerification({ code: '123456' }); // if you have the code
            // await setActive({ session: signUp.createdSessionId });

            // For now, route user to verification page (or login)
            router.push('/verify-email');
        } catch (error) {
            console.error(error);
            toast.error(error.errors?.[0]?.message || "Sign up failed");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoaded && user) {
        toast.success("Already signed in");
        router.push('/');
    }
    return (
        <div className="flex flex-col min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-card rounded-3xl shadow-xl"
            >
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <Heart className="h-12 w-12 text-primary" strokeWidth={1.5} fill="rgba(255,182,193,0.5)" />
                    </div>
                    <h1 className="text-3xl    ">Create an Account</h1>
                    <p className="text-sm text-muted-foreground">
                        Start journaling your thoughts today
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Danm Danm" className="rounded-xl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="your.email@example.com"
                                            className="rounded-xl"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                className="rounded-xl pr-10"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full rounded-xl"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>
                </Form>

                <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Button variant="link" className="p-0" asChild>
                            <Link href="/login">Sign in</Link>
                        </Button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
