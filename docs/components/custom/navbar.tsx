import { Heart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto lg:px-8 px-6">
        <div className="relative flex h-14 items-center justify-between">
          <Link
            href="/"
            className="relative sm:absolute inset-y-0 left-0 flex items-center font-semibold"
          >
            <img
              src="/swear-emoji.png"
              alt="Swear Emoji"
              className="h-6 w-6 mr-1.5"
            />
            ProfanityValidator
          </Link>

          {/* placeholder */}
          <div className="hidden sm:block invisible">ProfanityValidator</div>

          <div className="hidden sm:flex items-center gap-6">
            <Link className="hover:underline" href="/#install">
              Installation
            </Link>
            <Link className="hover:underline" href="/#try-it">
              Try Now
            </Link>
            <Link className="hover:underline" href="/#intro">
              Video Demo
            </Link>
            <Link className="hover:underline" href="/examples">
              Examples
            </Link>
            <Link
              className="hover:underline"
              href="https://l.devwtf.in/discord"
            >
              Support
            </Link>
          </div>

          <Link
            href="https://l.devwtf.in/profanity"
            target="_blank"
            referrerPolicy="no-referrer"
            className={buttonVariants({ variant: "secondary" })}
          >
            Star on GitHub <Heart className="h-4 w-4 ml-1.5 fill-red-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
