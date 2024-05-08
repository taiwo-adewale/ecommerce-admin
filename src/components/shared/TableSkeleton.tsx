import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonColumn } from "@/types/skeleton";

type Props = {
  columns: SkeletonColumn[];
  perPage: number;
};

export default function TableSkeleton({ columns, perPage }: Props) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-popover">
          <TableRow className="hover:bg-transparent">
            {columns.map((column, index) => {
              return (
                <TableHead
                  key={`header-${index}`}
                  className="uppercase whitespace-nowrap"
                >
                  {column.header}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: perPage }, () => "item").map((row, index) => (
            <TableRow key={`row-${index}`} className="hover:bg-transparent">
              {columns.map((column, colIndex) => (
                <TableCell
                  key={`row-${index}-${column}-${colIndex}`}
                  className="whitespace-nowrap"
                >
                  {column.cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3.5 p-4 bg-popover">
        <Skeleton className="w-44 h-9" />

        <Skeleton className="w-full max-w-80 h-9" />
      </div>
    </div>
  );
}
