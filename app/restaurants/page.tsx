"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import RestaurantItem from "../components/restauran-item";
import Header from "../components/header";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) return notFound();

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

export default Restaurants;
