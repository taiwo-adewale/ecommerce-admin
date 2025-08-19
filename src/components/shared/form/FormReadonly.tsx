import { FormItem, FormLabel } from "@/components/ui/form";

type FormReadonlyProps = {
  label: string;
  value: string;
};

function FormReadonly({ label, value }: FormReadonlyProps) {
  return (
    <FormItem className="flex flex-col md:flex-row md:gap-x-4 md:space-y-0">
      <FormLabel className="md:flex-shrink-0 md:w-1/4 md:mt-2 leading-snug">
        {label}
      </FormLabel>

      <div className="w-full">
        <div className="flex items-center h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm cursor-not-allowed opacity-50">
          {value}
        </div>
      </div>
    </FormItem>
  );
}

export default FormReadonly;
