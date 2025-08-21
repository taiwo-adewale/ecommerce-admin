import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import PageTitle from "@/components/shared/PageTitle";
import { ProductBadgeVariants } from "@/constants/badge";
import { EditProductSheet } from "./_components/EditProductSheet";

import { fetchProductDetails } from "@/services/products";
import { createServerClient } from "@/lib/supabase/server";

type PageParams = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: PageParams): Promise<Metadata> {
  try {
    const { product } = await fetchProductDetails(createServerClient(), {
      slug,
    });

    return { title: product.name };
  } catch (e) {
    return { title: "Product not found" };
  }
}

export default async function ProductDetails({ params: { slug } }: PageParams) {
  try {
    const { product } = await fetchProductDetails(createServerClient(), {
      slug,
    });

    return (
      <section>
        <PageTitle className="lg:mb-10">Product Details</PageTitle>

        <div className="flex flex-col gap-6 lg:gap-8 md:flex-row mb-6">
          <div className="flex-shrink-0 w-full max-w-80 mx-auto md:mx-0 md:max-w-72  xl:max-w-80">
            <Image
              src={product.image_url}
              alt={product.name}
              width={320}
              height={320}
              priority
              className="w-full aspect-square object-cover rounded-3xl"
            />
          </div>

          <div className="flex flex-col xl:pr-12">
            <div className="flex items-center gap-x-2 mb-2">
              <Typography component="p" className="font-semibold">
                Status:
              </Typography>

              <Badge
                variant={
                  ProductBadgeVariants[
                    product.stock > 0 ? "selling" : "out-of-stock"
                  ]
                }
                className="flex-shrink-0 text-xs"
              >
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </Badge>
            </div>

            <Typography variant="h1" className="mb-2">
              {product.name}
            </Typography>

            <Typography component="p" className="mb-3">
              <Typography className="font-semibold">SKU:</Typography>{" "}
              <Typography className="text-foreground/60">
                {product.sku}
              </Typography>
            </Typography>

            <Typography
              variant="h1"
              component="span"
              className="mb-3 text-3xl md:text-4xl"
            >
              ${product.selling_price}
            </Typography>

            <Typography component="p" className="mb-2">
              <Typography className="font-semibold">Quantity:</Typography>{" "}
              <Typography className="text-foreground/60">
                {product.stock}
              </Typography>
            </Typography>

            <Typography
              component="p"
              className="mb-4 text-foreground/60 text-justify"
            >
              {product.description}
            </Typography>

            <Typography component="p" className="mb-6">
              <Typography className="font-semibold">Category:</Typography>{" "}
              <Typography className="text-foreground/60">
                {product.categories.name}
              </Typography>
            </Typography>

            <div>
              <EditProductSheet product={product}>
                <Button size="lg" className="w-auto text-base">
                  Edit Product
                </Button>
              </EditProductSheet>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (e) {
    return notFound();
  }
}
