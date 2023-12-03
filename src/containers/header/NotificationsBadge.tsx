import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

type Props = {
  value: number;
};

const NotificationsBadge = ({ value }: Props) => {
  return (
    <div
      className={cn(
        "absolute rounded-full flex justify-center items-center text-white bg-red-500 dark:bg-red-600 pointer-events-none",
        value < 100
          ? "left-[15%] top-[10%] w-4 h-4"
          : "left-[8%] top-[4%] w-5 h-5"
      )}
    >
      <Typography className="text-[0.5rem] md:text-[0.5rem] mt-0.5">
        {value < 100 ? (
          value
        ) : (
          <>
            99<sup>+</sup>
          </>
        )}
      </Typography>
    </div>
  );
};

export default NotificationsBadge;
