
import { Icons } from "@/components/custom/Icons";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Github, Heart, Twitter, Youtube } from "lucide-react";
import TryCard from "@/components/custom/try-card";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <section className="grainy-light w-full p-6">
        <div className="flex justify-center text-center">
          <h2 className="font-heading text-5xl lg:text-6xl font-bold leading-tight text-balance sm:leading-none tracking-tight">
            &quot;Hate speech{" "}
            <span className="bg-red-500 text-white px-3">f@#k!ng</span>{" "}
            sucks&quot;
          </h2>
        </div>

        <p className="text-center mx-auto mt-12 text-lg max-w-xl text-balance">
          <span className="font-semibold bg-red-500 text-white px-3">
            Moderating profanity is a thankless job.
          </span>{" "}
          If you run a web app with any kind of user generated content,
          it&apos;s your responsibility to keep things in order. That&apos;s a
          challenge if your users keep dropping F-bombs like confetti at a
          toddler&apos;s birthday party.
        </p>

        <div className="flex items-center justify-center">
          <Icons.arrow className="h-60  text-zinc-400 fill-zinc-400 pointer-events-none select-none" />
        </div>

        <p className="mt-6 sm:mt-12 z-10 text-center mx-auto text-3xl font-semibold">
          Profanity on your website...
        </p>

        <div className="grid gap-40 sm:grid-cols-2 sm:gap-16 max-w-3xl mx-auto mt-40 text-center">
          <div className="relative z-10">
            <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
              <div className="absolute inset-x-0 -bottom-0 h-16 bg-gradient-to-t 0 from-blue-50 pointer-events-none"></div>
              <img
                alt="shocked-emoji"
                src="/shocked-emoji.png"
                className="h-24 relative -z-10 select-none"
              />
            </div>
            <p className="font-semibold text-lg">
              ...compromises the integrity
            </p>
            <p className="mt-2 text-balance">
              Imagine users trying to fill out a form on your website, only to
              be bombarded with offensive language. Not exactly a welcoming
              environment for user engagement, is it?
            </p>
          </div>

          <div className="relative z-10">
            <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
              <div className="absolute inset-x-0 -bottom-0 h-16 bg-gradient-to-t from-blue-50 pointer-events-none"></div>
              <img
                alt="swear-emoji"
                src="/swear-emoji.png"
                className="relative -z-10 h-24 select-none"
              />
            </div>
            <p className="font-semibold text-lg">...makes you look bad</p>
            <p className="mt-2 text-balance">
              Imagine users trying to give you feedback on your website. Do you
              really want them to be like,
              <span className="font-semibold text-red-600">
                &quot;What in tarnation?!&quot;
              </span>
              Not exactly the kind of feedback you were hoping for, right?
            </p>
          </div>
        </div>
      </section>

      <section id="intro" className="bg-blue-50 grainy-dark p-6">
        <h2 className="mx-auto text-balance text-5xl sm:text-6xl text-center font-bold leading-[4.25rem] tracking-tight max-w-2xl text-slate-900">
          There&apos;s a{" "}
          <span className="px-2 bg-red-500 text-white">solution</span>
        </h2>
        <p className="text-center mx-auto mt-8 text-lg max-w-xl text-balance">
          <span className="font-semibold">
            F@#k moderating content manually!
          </span>{" "}
          Let{" "}
          <span className="px-2 bg-red-500 text-white">ProfanityValidator</span>
          {""} do the dirty work of keeping your user input clean.
        </p>
        <div className="relative mx-4 rounded-xl aspect-video md:mx-auto max-w-4xl mt-12 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="top-in-bottom-out"
            videoSrc=""
            thumbnailSrc="https://i.imgur.com/KCJmPOa.png"
            thumbnailAlt="Hero Video"
          />
        </div>

        <section
          id="install"
          className="w-full flex flex-col items-center mt-12 px-4"
        >
          <p className="font-bold text-2xl my-4">Install the package</p>
          <div className="relative max-w-md w-full text-left p-2 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 rounded-xl shadow">
            <div className="flex flex-row items-center justify-center px-4">
              <span className="text-lg">
                npm install profanity-validator@latest
              </span>
            </div>
          </div>
          <p className="text-center mx-auto text-sm max-w-xl text-balance mt-2">
            fyi, you can also use bun, pnpm or yarn.
          </p>
          <p className="text-center mx-auto text-sm max-w-xl text-balance">
            Checkout{" "}
            <a
              className="underline"
              href="https://www.npmjs.com/package/profanity-validator"
              target="_blank"
              rel="noopener"
            >
              registry
            </a>{" "}
            for more info.
          </p>
        </section>
      </section>

      <section
        id="try-it"
        className="flex flex-col items-center justify-center bg-blue-50 grainy-light p-6"
      >
        <h2 className="mx-auto text-balance text-5xl sm:text-6xl text-center font-bold leading-[4.25rem] tracking-tight max-w-2xl text-slate-900">
          Do you have the{" "}
          <span className="px-2 bg-red-500 text-white">b@lls</span> ?
        </h2>
        <p className="text-center mx-auto mt-8 text-lg max-w-xl text-balance">
          <span className="font-semibold">
            Got a collection of swear words?
          </span>{" "}
          Let{" "}
          <span className="px-2 bg-red-500 text-white ml-1">
            ProfanityValidator
          </span>
          {""} handle the dirty work and keep your content clean.
        </p>
        <div className="relative flex items-center mt-12 max-w-2xl w-full text-left p-2 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 rounded-xl shadow">
          <img
            alt="try-it"
            aria-hidden="true"
            src="/try-it.png"
            height={200}
            width={200}
            className="absolute w-40 left-2/4 -top-16 "
          />
          <TryCard />
        </div>
        <p className="text-center mx-auto mt-8 text-lg max-w-xl text-balance">
          <span className="font-semibold">Heads up!</span> We know{" "}
          <span className="px-2 bg-red-500 text-white">v1.3.3</span>
          {""} is a bit buggy, but don&apos;t worry,{" "}
          <span className="px-2 bg-red-500 text-white">v1.3.5</span>
          {""} is on it&apos;s way!
        </p>
      </section>

      <footer className="bg-blue-50 grainy-light p-6">
        <div className="p-6 mx-auto relative z-10 overflow-hidden border ring-1 ring-inset ring-gray-900/10 rounded-xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="max-w-md text-sm text-gray-500 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 fill-red-500" /> by
              <a
                className="underline mx-1"
                href="https://devwtf.in/"
                target="_blank"
                rel="noopener"
              >
                Saidev Dhal,
              </a>{" "}
              Feel free to raise issue(s) & pr(s) 👻
            </p>
            <p className="text-sm leading-5 text-gray-400">
              © {new Date().getFullYear()} ProfanityValidator
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://dub.sh/saidev-twitter"
                target="_blank"
                rel="noopener"
                className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-4 w-4 text-gray-600 transition-colors group-hover:text-black" />
              </a>
              <a
                href="https://git.new/skidgod"
                target="_blank"
                rel="noopener"
                className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100"
              >
                <span className="sr-only">Github</span>
                <Github className="h-4 w-4 text-gray-600 transition-colors group-hover:text-black" />
              </a>

              <a
                href="https://dub.sh/skidgod"
                target="_blank"
                rel="noopener"
                className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100"
              >
                <span className="sr-only">YouTube</span>
                <Youtube className="h-4 w-4 text-gray-600 transition-colors group-hover:text-[#ff0000]" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
