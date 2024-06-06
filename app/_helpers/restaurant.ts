import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  userFavoriteRestaurant: UserFavoriteRestaurant[],
  restaurantId: string,
) => userFavoriteRestaurant?.some((fav) => fav.restaurantId === restaurantId);
