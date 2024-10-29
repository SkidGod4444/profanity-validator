"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profanity } from "profanity-validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Initialize profanity checker
const profanity = new Profanity({
  customWords: ["badword", "inappropriate"],
  heat: 0.5,
});

// Profanity validator function
const profanityCheck = async (value: string) => {
  const result = await profanity.validateField(value);
  return result.isValid;
};

// Zod schema with profanity validation
const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .refine(async (val) => await profanityCheck(val), {
      message: "Inappropriate content detected in title",
    }),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .refine(async (val) => await profanityCheck(val), {
      message: "Inappropriate content detected in description",
    }),
});

// Type inference
type PostSchema = z.infer<typeof postSchema>;

export default function Example3() {
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostSchema) => {
    try {
      // Split tags manually here
      const validatedData = await postSchema.parseAsync({ ...data });
      console.log("Validated data:", validatedData);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Validation failed. Check form errors.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto p-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting ? "Checking..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
