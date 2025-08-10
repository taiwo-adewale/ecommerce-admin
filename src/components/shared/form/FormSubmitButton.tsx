import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface Props extends ButtonProps {
  isPending: boolean;
  children: React.ReactNode;
}

export function FormSubmitButton({
  isPending,
  className,
  children,
  ...props
}: Props) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      className={cn(className)}
      size="lg"
      {...props}
    >
      {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
}
