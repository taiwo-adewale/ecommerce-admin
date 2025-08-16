import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { HeadingVariants } from "@/types/typography";

type Props = {
  children: string;
  className?: string;
  component?: HeadingVariants;
};

export default function PageTitle({
  children,
  className,
  component = "h1",
}: Props) {
  return (
    <Typography
      variant="h3"
      component={component}
      className={cn("mb-6", className)}
    >
      {children}
    </Typography>
  );
}
