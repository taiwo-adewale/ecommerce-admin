import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { TypographyProps } from "@/types/typography";

const Typography = ({
  variant = "span",
  component,
  className,
  href,
  target = undefined,
  children,
}: TypographyProps) => {
  const classNameVariants = {
    h1: "text-2xl md:text-3xl font-semibold",
    h2: "text-xl md:text-2xl font-semibold",
    h3: "text-lg md:text-xl font-semibold",
    h4: "text-base md:text-lg font-semibold",
    p: "text-sm md:text-base",
    span: "",
    a: "text-sm md:text-base text-primary underline-offset-4 hover:underline transition-colors",
    // blockquote: "text-base md:text-lg italic border-l-4 pl-4 border-border",
  };

  const mergedClassName = cn(classNameVariants[variant], className);

  if (variant === "a" && href) {
    return (
      <Link href={href} target={target} className={mergedClassName}>
        {children}
      </Link>
    );
  }

  return React.createElement(
    component || variant,
    { className: mergedClassName },
    children
  );
};

export default Typography;
