"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Profanity, ProfanityResolver } from "profanity-validator";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

type FormData = {
  name: string;
  framework: string;
  desc: string;
};

export default function TryCard() {
  const [heat, setHeat] = useState(0.8);
  const [excluded, setExclude] = useState<string[] | undefined>(["name"]);
  const [cwords, setCwords] = useState<string[] | undefined>(["to-do"]);

  const profanityInit = new Profanity({
    heat: heat,
    customWords: cwords,
    excludeFields: excluded,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: ProfanityResolver(profanityInit),
  });
  const onSubmit = async (data: { name: string; framework: string; desc: string }) => {
    toast(
      `Name: ${data.name}, Framework: ${data.framework}, Desc: ${data.desc}`,
    );
  };

  return (
    <div className="flex h-full w-full flex-col md:flex-row gap-10 items-center justify-between">
      <Card className="w-[280px]">
        <CardHeader>
          <CardTitle>Customize</CardTitle>
          <CardDescription>Our SDK is a moderation tool.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mb-2">
            <div className="flex items-center">
              <p>Heat: ({heat})</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="ml-2 size-4 text-gray-400 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>
                      Heat is a parameter to detect the level of profanity.{" "}
                      <br />
                      Anything above this parameter will be detected. <br />
                      By default it is 0.9
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              defaultValue={[0.8]}
              max={1}
              step={0.1}
              onValueChange={(e) => setHeat(e[0])}
            />
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex items-center">
              <p>Custom words</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="ml-2 size-4 text-gray-400 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Add your custom swear words.
                      <br /> Our SDK will flag that word.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              placeholder="Separate your words using ',' between them."
              defaultValue={"todo"}
              onChange={(e) => {
                const value = e.target.value;
                const valuesArray =
                  value.includes(" ") || value.includes(",")
                    ? value.split(/[\s,]+/)
                    : [value];
                setCwords(valuesArray);
              }}
            />
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex items-center">
              <p>Excluded field</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="ml-2 size-4 text-gray-400 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Exclude one/more input fields in your form.
                      <br /> Our SDK will ignore those fileds. <br /> Users can
                      use any type of swear words.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="text"
              placeholder="Try framework, desc or name."
              defaultValue={"name"}
              onChange={(e) => {
                const value = e.target.value;
                const valuesArray =
                  value.includes(" ") || value.includes(",")
                    ? value.split(/[\s,]+/)
                    : [value];
                setExclude(valuesArray);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <p className="text-sm">
            Wanna see the source code?{" "}
            <a
              className="underline"
              href="https://l.devwtf.in/profanity"
              target="_blank"
              rel="noopener noreferrer"
            >
              here you go
            </a>
            . Make sure to hit a star!
          </p>
        </CardFooter>
      </Card>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name of your project"
                  defaultValue={"100x Todo App"}
                  {...register("name")}
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Input
                  id="framework"
                  type="text"
                  placeholder="Name of your project"
                  defaultValue={"Boobs Js"}
                  {...register("framework")}
                />
                {errors.framework && (
                  <div className="text-red-500 text-sm">
                    {String(errors.framework.message)}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  defaultValue={
                    "Am a software developer who just codes to-do apps all day."
                  }
                  placeholder="Type your message here."
                  {...register("desc")}
                />
                {errors.desc && (
                  <div className="text-red-500 text-sm">
                    {String(errors.desc.message)}
                  </div>
                )}
              </div>
              <Button type="submit">Deploy</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
