import { SBProduct } from "@/services/products/types";

type ValidationErrorsResponse = {
  validationErrors: Record<string, string>;
};

type DbErrorResponse = {
  dbError: string;
};

type SuccessResponse = {
  success: boolean;
};

export type DeleteServerActionResponse = DbErrorResponse | SuccessResponse;

export type ProductServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | (SuccessResponse & {
      product: SBProduct;
    });
