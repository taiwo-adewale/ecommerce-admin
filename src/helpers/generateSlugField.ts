import slugify from "slugify";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type SlugifyOptions<T> = {
  sourceField: Path<T>;
  targetField: Path<T>;
};

export function generateSlugField<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: SlugifyOptions<T>
) {
  const { sourceField, targetField } = options;

  const sourceValue = form.getValues(sourceField);

  if (sourceValue && typeof sourceValue === "string") {
    const generatedSlug = slugify(sourceValue, {
      lower: true,
      strict: true,
      locale: "en",
    }) as PathValue<T, Path<T>>;

    form.setValue(targetField, generatedSlug, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }
}
