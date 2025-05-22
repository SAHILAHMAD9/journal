"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp, useUser } from "@clerk/nextjs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const formSchema = z.object({
    code: z.string().min(6, { message: "Verification code must be 6 digits" }),
});

export default function VerifyEmailPage() {
    const { isSignedIn, user, } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data) => {
        if (!isLoaded) return;

        try {
            setIsLoading(true);

            const result = await signUp.attemptEmailAddressVerification({
                code: data.code,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                toast.success("Email verified successfully");
                router.push("/journal");
            } else {
                toast.error("Verification incomplete. Try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.errors?.[0]?.message || "Invalid verification code");
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
                        <ShieldCheck className="h-12 w-12 text-primary" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl    ">Verify Your Email</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the 6-digit code sent to your email
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="******"
                                            className="rounded-xl text-center tracking-widest"
                                            maxLength={6}
                                            {...field}
                                        />
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
                            {isLoading ? "Verifying..." : "Verify Email"}
                        </Button>
                    </form>
                </Form>
            </motion.div>
        </div>
    );
}
