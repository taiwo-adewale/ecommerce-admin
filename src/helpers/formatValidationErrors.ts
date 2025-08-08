type FieldErrors = Record<string, string[]>;
type FlattenedErrors = Record<string, string>;

export function formatValidationErrors(errors: FieldErrors): FlattenedErrors {
  return Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = value[0];
    return acc;
  }, {} as FlattenedErrors);
}
