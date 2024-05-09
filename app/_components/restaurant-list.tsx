import { db } from "../_lib/prisma";
import RestaurantItem from "./restauran-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
