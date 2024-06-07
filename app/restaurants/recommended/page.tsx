import { db } from "@/app/_lib/prisma";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restauran-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg mb-6 font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="w-full flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              userFavoriteRestaurant={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
