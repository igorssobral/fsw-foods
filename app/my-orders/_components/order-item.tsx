"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import { formatCurrency } from "@/app/_helpers/price";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/app/_context/cart";
import { useRouter } from "next/navigation";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Entregue";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em Trabsporte";
    case "PREPARING":
      return "Preparando";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext);

  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: {
          ...orderProduct.product,
          restaurant: order.restaurant,
          quantity: orderProduct.quantity,
        },
      });
    }

    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`text-muted-foreground bg-[#EEEEEE] w-fit px-2 py-1 rounded-full ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
        >
          <span>{getOrderStatusLabel(order.status)}</span>
        </div>

        <div className="flex justify-between items-center pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <div className="py3">
            <Separator />
          </div>

          <Button
            variant="link"
            size="icon"
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="gap-2 flex items-center ">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="block text-xs text-muted-foreground">
                {product.product?.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary text-xs"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
          >
            Adicionar à Sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
