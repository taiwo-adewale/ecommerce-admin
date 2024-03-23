import Typography from "@/components/ui/typography";
import { HeadingVariants } from "@/types/typography";

type Props = {
  children: string;
  component?: HeadingVariants;
};

export default function PageTitle({ children, component = "h1" }: Props) {
  return (
    <Typography variant="h3" component={component} className="mb-6">
      {children}
    </Typography>
  );
}
