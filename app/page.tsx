import Image from "next/image";
import CategoryList from "./components/category-list";
import Header from "./components/header";
import Search from "./components/search";
import ProductList from "./components/product-list";
import { Button } from "./components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className=" pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          height={0}
          width={0}
          className="h-auto w-full"
          sizes="100vw"
          quality={100}
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="p-0 h-fit text-primary hover:bg-transparent"
          >
            Ver todos <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </>
  );
};
export default Home;
