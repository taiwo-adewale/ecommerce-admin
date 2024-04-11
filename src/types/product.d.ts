import { Category } from "./category";

type Status = "selling" | "out-of-stock";

type Price = {
  price: number;
  discount: number;
};

type Variant = {
  _id: string;
  name: string;
  slug: string;
  prices: Price;
  images: string[];
  status: Status;
  stock: number;
  sku: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  categories: Category[];
  prices: Price;
  stock: number;
  sales: number;
  sku: string;
  status: Status;
  images: string[];
  published: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
};
