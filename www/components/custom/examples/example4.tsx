"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Profanity } from "profanity-validator";
import { toast } from "sonner";

const profanity = new Profanity({
  customWords: ["badword", "inappropriate"],
  heat: 0.5,
});

interface FieldError {
  message: string;
  isPending: boolean;
}

export default function Example4() {
  const [fields, setFields] = useState([
    { id: 1, value: "", type: "input", label: "Title" },
    { id: 2, value: "", type: "textarea", label: "Description" },
  ]);

  const [errors, setErrors] = useState<Record<number, FieldError>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounced validation
  useEffect(() => {
    const timeouts: Record<number, NodeJS.Timeout> = {};

    fields.forEach((field) => {
      if (field.value.trim()) {
        setErrors((prev) => ({
          ...prev,
          [field.id]: { ...prev[field.id], isPending: true },
        }));

        timeouts[field.id] = setTimeout(async () => {
          try {
            const result = await profanity.validateField(field.value);
            setErrors((prev) => ({
              ...prev,
              [field.id]: {
                message: result.message || "",
                isPending: false,
              },
            }));
          } catch (error) {
            console.error(`Validation error for field ${field.id}:`, error);
          }
        }, 500);
      }
    });

    return () => {
      Object.values(timeouts).forEach((timeout) => clearTimeout(timeout));
    };
  }, [fields]);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((f) => f.id)) + 1,
        value: "",
        type: "input",
        label: `Field ${prev.length + 1}`,
      },
    ]);
  };

  const removeField = (id: number) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleFieldChange = (id: number, value: string) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value } : field)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const results = await Promise.all(
        fields.map(async (field) => ({
          id: field.id,
          result: await profanity.validateField(field.value),
        })),
      );

      const newErrors: Record<number, FieldError> = {};
      results.forEach(({ id, result }) => {
        if (!result.isValid) {
          newErrors[id] = {
            message: result.message || "Inappropriate content detected",
            isPending: false,
          };
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log("Form submitted:", fields);
        toast.success("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Validation failed. Check form errors.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto p-6"
    >
      {fields.map((field) => (
        <div key={field.id} className="space-y-2 relative">
          <div className="flex items-center gap-2">
            {field.type === "input" ? (
              <Input
                type="text"
                placeholder={field.label}
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className={errors[field.id]?.message ? "border-red-500" : ""}
              />
            ) : (
              <Textarea
                placeholder={field.label}
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className={errors[field.id]?.message ? "border-red-500" : ""}
              />
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeField(field.id)}
            >
              ×
            </Button>
          </div>

          {errors[field.id]?.isPending && (
            <Badge variant="secondary">Checking...</Badge>
          )}

          {errors[field.id]?.message && !errors[field.id]?.isPending && (
            <Alert variant="destructive">
              <AlertDescription>{errors[field.id].message}</AlertDescription>
            </Alert>
          )}
        </div>
      ))}

      <div className="space-x-4">
        <Button type="button" variant="outline" onClick={addField}>
          Add Field
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
