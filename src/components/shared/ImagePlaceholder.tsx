"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Props = ImageProps & {
  skeletonClassName?: string;
  containerClassName?: string;
};

export function ImagePlaceholder({
  skeletonClassName,
  containerClassName,
  className,
  alt,
  ...imageProps
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative size-8", containerClassName)}>
      <Image
        {...imageProps}
        alt={alt}
        className={cn("object-cover", !isLoaded && "opacity-0", className)}
        onLoad={() => setIsLoaded(true)}
      />

      <Skeleton
        className={cn(
          "size-8 rounded-full absolute left-0 top-0",
          skeletonClassName,
          isLoaded && "hidden"
        )}
      />
    </div>
  );
}
