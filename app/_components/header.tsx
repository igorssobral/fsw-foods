"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignOut = () => {
    signOut();
  };
  const handleLogin = () => {
    signIn();
  };

  return (
    <div className="flex px-5 pt-6 justify-between">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="fsw foods"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data.user?.name?.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semi bold ">{data.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data.user?.email}
                    </span>
                  </div>
                </div>

                <Button onClick={handleSignOut} size="icon">
                  <LogOutIcon size={20} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center pt-8">
                <h2 className="font-semibold">Faça seu login</h2>
                <Button size="icon" onClick={handleLogin}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 text-sm font-normal rounded-full"
            >
              <HomeIcon />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 text-sm font-normal rounded-full"
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 text-sm font-normal rounded-full"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 text-sm font-normal rounded-full"
              onClick={handleSignOut}
            >
              <LogOutIcon />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
