import Typography from "@/components/ui/typography";

type Props = {
  children: string;
};

export default function PageTitle({ children }: Props) {
  return (
    <Typography variant="h4" component="h1">
      {children}
    </Typography>
  );
}
