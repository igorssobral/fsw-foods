import { db } from "@/app/_lib/prisma";
import Header from "@/app/components/header";
import ProductItem from "@/app/components/product-item";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPageProps = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) return notFound();

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg mb-6 font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPageProps;
