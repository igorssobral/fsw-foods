"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurant?: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurant,
}: RestaurantItemProps) => {
  const { data } = useSession();

  const isFavorite = userFavoriteRestaurant?.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    try {
      await toggleFavoriteRestaurant(data?.user.id, restaurant.id);

      toast.success(
        isFavorite
          ? "Restaurante removido dos Favoritos"
          : "Restaurante adicionado as favoritos",
      );
    } catch (error) {
      toast.error("Erro ao adicionar aos favritos");
    }
  };

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="w-full space-y-3">
        <div className="w-full h-[136px] relative">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              className="rounded-lg object-cover"
              alt={restaurant.name}
            />
          </Link>

          <div className="absolute flex items-center gap-[2px] top-2 left-2 bg-white px-2 py-[2px] rounded-full ">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-xs">5.0</span>
          </div>

          {data?.user.id && (
            <Button
              size="icon"
              className={`absolute top-2 right-2 bg-zinc-800/80 rounded-full h-7 w-7 ${isFavorite && "bg-primary"}`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>
        <h3 className="font-semibold text-sm">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon className="text-primary" size={12} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
