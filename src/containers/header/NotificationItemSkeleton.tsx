import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationItemSkeleton() {
  return (
    <div className="p-3 border-t border-t-border first:border-t-0 sm:gap-x-2">
      <div className="flex items-center gap-x-3 w-full">
        <Skeleton className="size-[1.875rem] rounded-full flex-shrink-0 self-start mt-1.5 sm:mt-0 sm:self-center" />

        <div className="flex flex-col space-y-1.5 w-full">
          <Skeleton className="w-5/6 h-4" />

          <div className="flex flex-col-reverse items-start sm:items-center sm:flex-row gap-x-2 gap-y-2">
            <Skeleton className="w-20 h-4" />

            <Skeleton className="w-28 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
