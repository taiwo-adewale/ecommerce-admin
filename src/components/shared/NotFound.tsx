import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import Typography from "@/components/ui/typography";
import notFoundImg from "public/assets/not-found.png";

export function NotFound({ page = "Page" }: { page?: string }) {
  return (
    <div className="py-16 sm:py-20 w-full h-full grid place-items-center px-2 max-w-3xl mx-auto">
      <div>
        <Image
          src={notFoundImg}
          alt={`${page} not found`}
          priority
          placeholder="blur"
          className="w-full"
        />

        <div className="flex flex-col text-center items-center mt-4 space-y-2">
          <Typography
            variant="h1"
            className="text-3xl min-[360px]:text-4xl md:text-5xl"
          >
            {page} not found!
          </Typography>

          <Typography
            component="p"
            className="text-sm min-[360px]:text-base md:text-lg font-semibold flex items-center gap-x-2"
          >
            Go to{" "}
            <Link
              href="/"
              className="underline text-primary flex items-center gap-x-1 dark:text-primary/90"
            >
              Dashboard <ExternalLink className="size-4 md:size-5" />
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
