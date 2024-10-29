import Example1 from "@/components/custom/examples/example1";
import Example2 from "@/components/custom/examples/example2";
import Example3 from "@/components/custom/examples/example3";
import Example4 from "@/components/custom/examples/example4";
import { Separator } from "@/components/ui/separator";
import { dynamicLinks } from "@/lib/defaults";
import React from "react";

export default function ExamplesPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <section className="w-full p-6">
        <div className="flex justify-center text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance sm:leading-none tracking-tight">
            &quot;All{" "}
            <span className="bg-red-500 text-white px-3">use-case</span>{" "}
            examples&quot;
          </h2>
        </div>

        <div className="flex flex-col text-start items-center justify-center mt-10">
          <div className="flex flex-col items-start justify-center">
            <section id="basic-example" className="space-y-5">
              <p className="text-2xl">
                <span className="bg-red-500 text-white px-3">Example 1:</span>{" "}
                <a
                  href="/examples/#basic-example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline cursor-pointer"
                >
                  Basic Profanity Validation
                </a>
              </p>
              <p className="text-md py-3">
                This example demonstrates a basic profanity validation form.
                <br /> It allows users to input text and checks it against a
                predefined array of profane words i.e [&quot;badword&quot;,
                &quot;inappropriate&quot;, &quot;submit&quot;] . <br /> If any
                profanity is detected, it will alert the user.
              </p>
              <p className="hover:underline text-blue-600">
                <a
                  href={dynamicLinks.example1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Feel free to take a peek on this implementation code.
                </a>
              </p>
              <div className="flex items-center mt-12 max-w-sm w-full text-left p-2 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 rounded-xl shadow">
                <Example1 />
              </div>
            </section>

            <Separator className="my-4" />

            <section id="react-hook-form-example" className="space-y-5">
              <p className="text-2xl">
                <span className="bg-red-500 text-white px-3">Example 2:</span>{" "}
                <a
                  href="/examples/#react-hook-form-example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline cursor-pointer"
                >
                  Profanity Validation with React Hook Form
                </a>
              </p>
              <p className="text-md py-3">
                To integrate profanity validation with React Hook Form, <br />{" "}
                this example uses a custom Profanity class to validate fields
                like "title," "description," and "tags" for inappropriate
                language on form submission, <br /> setting errors as needed and
                allowing submission only if all fields pass validation.
              </p>
              <p className="hover:underline text-blue-600">
                <a
                  href={dynamicLinks.example2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Feel free to take a peek on this implementation code.
                </a>
              </p>
              <div className="flex items-center mt-12 max-w-sm w-full text-left p-2 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 rounded-xl shadow">
                <Example2 />
              </div>
            </section>

            <Separator className="my-4" />

            <section id="zod-schema-example" className="space-y-5">
              <p className="text-2xl">
                <span className="bg-red-500 text-white px-3">Example 3:</span>{" "}
                <a
                  href="/examples/#zod-schema-example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline cursor-pointer"
                >
                  Integrating with Zod schema validation
                </a>
              </p>
              <p className="text-md py-3">
                To integrate with React Hook Form and Zod for a
                profanity-validated form. <br /> It uses a custom Profanity
                validator to check fields like "title," "description," and
                "tags" for inappropriate language, <br /> setting "custom
                errors" through Zod if profanity is detected.
              </p>
              <p className="hover:underline text-blue-600">
                <a
                  href={dynamicLinks.example3}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Feel free to take a peek on this implementation code.
                </a>
              </p>
              <div className="flex items-center mt-12 max-w-sm w-full text-left p-2 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 rounded-xl shadow">
                <Example3 />
              </div>
            </section>

            <Separator className="my-4" />

            <section id="real-time-validation-example" className="space-y-5">
              <p className="text-2xl">
                <span className="bg-red-500 text-white px-3">Example 4:</span>{" "}
                <a
                  href="/examples/#real-time-validation-example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline cursor-pointer"
                >
                  Multiple fields and real-time validation
                </a>
              </p>
              <p className="text-md py-3">
                This example demonstrates a dynamic form using ShadCN UI, where
                fields can be added or removed <br /> and are validated for
                profanity in real-time with debouncing. A custom Profanity class
                checks each field's <br /> content for inappropriate language,
                displaying error messages if any are detected. <br /> The form
                highlights fields with profanity and allows users to address
                issues before submitting, <br /> with notifications for both
                successful and failed submissions.
              </p>
              <p className="hover:underline text-blue-600">
                <a
                  href={dynamicLinks.example4}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Feel free to take a peek on this implementation code.
                </a>
              </p>
              <div className="flex items-center mt-12 max-w-sm w-full text-left p-2 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 rounded-xl shadow">
                <Example4 />
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
