import { SBProduct } from "@/services/products/types";

type ValidationErrorsResponse = {
  validationErrors: Record<string, string>;
};

type DbErrorResponse = {
  dbError: string;
};

type ProductSuccessResponse = {
  success: boolean;
  product: SBProduct;
};

export type ProductServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | ProductSuccessResponse;
