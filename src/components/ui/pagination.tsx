import * as React from "react";
import Link, { LinkProps } from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isActive?: boolean;
    disabled?: boolean;
  } & Pick<ButtonProps, "size">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    scroll={false}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "ghost",
        size,
      }),
      className,
      "w-9 h-9"
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  disabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink>) =>
  disabled ? (
    <Button variant="ghost" size="icon" disabled className="w-9 h-9">
      <ChevronLeft className="h-4 w-4" />
    </Button>
  ) : (
    <PaginationLink aria-label="Go to previous page" {...props}>
      <ChevronLeft className="h-4 w-4" />
    </PaginationLink>
  );
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  disabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink>) =>
  disabled ? (
    <Button variant="ghost" size="icon" disabled className="w-9 h-9">
      <ChevronRight className="h-4 w-4" />
    </Button>
  ) : (
    <PaginationLink aria-label="Go to next page" {...props}>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex w-9 h-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
