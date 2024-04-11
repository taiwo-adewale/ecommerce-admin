import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CategoryFilters() {
  return (
    <Card className="mb-5">
      <form className="flex flex-col md:flex-row gap-4 lg:gap-6">
        <Input
          type="search"
          placeholder="Search by category name"
          className="h-12 md:basis-1/2"
        />

        <div className="flex gap-4 md:basis-1/2">
          <Button size="lg" className="w-full">
            Filter
          </Button>
          <Button size="lg" variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}
