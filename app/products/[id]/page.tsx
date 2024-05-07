import Image from "next/image";
import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import { formatCurrency } from "@/app/_helpers/price";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="relative w-full h-[360px]">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          className="absolute left-2 top-2 bg-white text-foreground rounded-full hover:text-white"
        >
          <ChevronLeftIcon />
        </Button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="textxs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
        <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>
        <div className="flex justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">
              {formatCurrency(Number(product.price))}
            </h2>
            {product.discountPercentage > 0 && (
              <div className="absolute flex items-center gap-[2px] top-2 left-2 bg-primary px-2 py-[2px] rounded-full text-white">
                <ArrowDownIcon size={12} />
                <span className="font-semibold text-xs">
                  {product.discountPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
