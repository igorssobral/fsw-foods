import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restauran-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });
  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurant={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
