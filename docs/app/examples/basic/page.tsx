"use client";
import { Profanity, ProfanityResolver } from "profanity-validator";
import React from "react";
import { useForm } from "react-hook-form";

export default function BasicExample() {
  const profanity = new Profanity({
    customWords: ["saidev"],
    excludeFields: ["email"],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: ProfanityResolver(profanity),
  });
  const onSubmit = async (data: unknown) => {
    // Only called if no profanity is detected
    console.log("Clean data:", data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("username")} />
          {errors.username && (
            <div className="text-red-500 text-sm">
              {errors.username.message as React.ReactNode}
            </div>
          )}
        </div>

        <div>
          <textarea {...register("comment")} />
          {errors.comment && (
            <div className="text-red-500 text-sm">
              {errors.comment.message as React.ReactNode}
            </div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
