"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Profanity } from "profanity-validator";
import { useState } from "react";
import { toast } from "sonner";

const profanity = new Profanity({
  customWords: ["badword", "inappropriate", "submit"],
  heat: 0.5,
});

export default function Example1() {
  const [title, setTitle] = useState("Can you hit the 'submit' button");
  const [description, setDescription] = useState(
    "I'm so f**king tired of this s**t.",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const titleResult = await profanity.validateField(title);
      const descriptionResult = await profanity.validateField(description);

      const newErrors: Record<string, string> = {};

      if (!titleResult.isValid) {
        newErrors.title =
          titleResult.message || "Inappropriate content detected";
      }

      if (!descriptionResult.isValid) {
        newErrors.description =
          descriptionResult.message || "Inappropriate content detected";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // If no profanity detected, proceed with form submission
      console.log("Form submitted:", { title, description });
      toast("Form submitted check console log!");
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Validation failed. Check form errors.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto p-6 rounded-md"
    >
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <Alert variant="destructive">
            <AlertDescription>{errors.title}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <Alert variant="destructive">
            <AlertDescription>{errors.description}</AlertDescription>
          </Alert>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Checking..." : "Submit"}
      </Button>
    </form>
  );
}
