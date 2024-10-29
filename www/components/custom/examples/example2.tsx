"use client";
import React from "react";
import { useForm } from "react-hook-form";
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
import { Profanity } from "profanity-validator";
import { toast } from "sonner";

const profanity = new Profanity({
  customWords: ["badword", "inappropriate"],
  heat: 0.5,
});

interface FormValues {
  title: string;
  description: string;
  tags: string;
}

export default function Example2() {
  const form = useForm<FormValues>({
    defaultValues: {
      title: "This is a clean title",
      description: "This description is free of profanity",
      tags: "clean, safe, f*ck friendly, boobs less",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Validate all fields
      const results = await Promise.all([
        profanity.validateField(data.title),
        profanity.validateField(data.description),
        profanity.validateField(data.tags),
      ]);

      const [titleResult, descriptionResult, tagsResult] = results;

      if (!titleResult.isValid) {
        form.setError("title", { message: titleResult.message });
      }
      if (!descriptionResult.isValid) {
        form.setError("description", { message: descriptionResult.message });
      }
      if (!tagsResult.isValid) {
        form.setError("tags", { message: tagsResult.message });
      }

      if (results.every((r) => r.isValid)) {
        // All validations passed
        console.log("Form submitted:", data);
        toast("Form submitted check console log!");
      }
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

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter comma-separated tags"
                />
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
