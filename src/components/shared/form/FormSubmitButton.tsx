import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  isPending: boolean;
  className?: string;
  children: React.ReactNode;
};

export function FormSubmitButton({ isPending, className, children }: Props) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      className={cn("w-full", className)}
      size="lg"
    >
      {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
}
