import { Loader2, ShieldAlert } from "lucide-react";

import Typography from "@/components/ui/typography";

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

export default function FetchDropdownContainer({
  children,
  isLoading,
  isError,
  errorMessage,
}: Props) {
  if (isLoading)
    return (
      <div className="flex flex-col gap-2 items-center px-2 py-6">
        <Loader2 className="size-4 animate-spin" />
        <Typography>Loading...</Typography>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col gap-2 items-center px-2 py-6 max-w-full">
        <ShieldAlert className="size-6" />
        <Typography>{errorMessage}</Typography>
      </div>
    );

  return <>{children}</>;
}
