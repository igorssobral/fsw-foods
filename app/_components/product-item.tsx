"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("min-w-[150px] w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className="space-y-2 w-full ">
        <div className="aspect-square w-full relative ">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          {product.discountPercentage && (
            <div className="absolute flex items-center gap-[2px] top-2 left-2 bg-primary px-2 py-[2px] rounded-full text-white">
              <ArrowDownIcon size={12} />
              <span className="font-semibold text-xs">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>
        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3>
              R$
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs line-through text-muted-foreground">
                {" "}
                R$
                {Intl.NumberFormat("pt-BR", {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                }).format(Number(product.price))}
              </span>
            )}
          </div>
          <span className="text-muted-foreground text-xs block">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
