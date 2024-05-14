import { db } from "@/app/_lib/prisma";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restauran-item";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg mb-6 font-semibold">Restaurantes Favoritos</h2>
        <div className="w-full flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
