import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  HeadingProps,
  ParagraphProps,
  AnchorProps,
  SpanProps,
  QuoteProps,
} from "@/types/typography";

const typographyVariants = {
  h1: "text-3xl md:text-4xl font-semibold",
  h2: "text-2xl md:text-3xl font-semibold",
  h3: "text-xl md:text-2xl font-semibold",
  h4: "text-lg md:text-xl font-semibold",
  p: "text-sm md:text-base",
  span: "text-sm md:text-base",
  a: "text-sm md:text-base text-primary underline-offset-4 hover:underline transition-colors",
  blockquote: "text-base md:text-lg italic border-l-4 pl-4 border-border",
};

/* h1 */
const TypographyH1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = "h1", ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(typographyVariants[as], className)}
      {...props}
    />
  )
);
TypographyH1.displayName = "TypographyH1";

/* h2 */
const TypographyH2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = "h2", ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(typographyVariants[as], className)}
      {...props}
    />
  )
);
TypographyH2.displayName = "TypographyH2";

/* h3 */
const TypographyH3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = "h3", ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(typographyVariants[as], className)}
      {...props}
    />
  )
);
TypographyH3.displayName = "TypographyH3";

/* h4 */
const TypographyH4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = "h4", ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(typographyVariants[as], className)}
      {...props}
    />
  )
);
TypographyH4.displayName = "TypographyH4";

/* p */
const TypographyP = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, as = "p", ...props }, ref) => (
    <p ref={ref} className={cn(typographyVariants[as], className)} {...props} />
  )
);
TypographyP.displayName = "TypographyP";

/* span */
const TypographySpan = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, as = "span", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(typographyVariants[as], className)}
      {...props}
    />
  )
);
TypographySpan.displayName = "TypographySpan";

/* a */
const TypographyLink = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, as = "a", href, ...props }, ref) => (
    <Link
      ref={ref}
      href={href}
      className={cn(typographyVariants[as], className)}
      {...props}
    />
  )
);
TypographyLink.displayName = "TypographyLink";

/* blockquote */
const TypographyBlockquote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, as = "blockquote", children, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(typographyVariants[as], className)}
      {...props}
    >
      &ldquo;{children}&rdquo;
    </blockquote>
  )
);
TypographyBlockquote.displayName = "TypographyBlockquote";

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographySpan,
  TypographyLink,
  TypographyBlockquote,
};
