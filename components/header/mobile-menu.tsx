"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import CHNLogo from "../chn-logo";
import { Separator } from "@/components/ui/separator";
import SocialIcons from "../footer/social-icons";
import MenuIcon from "./menu-icon";
import Search from "./search";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PrimaryMenuMobile from "./primary-menu-mobile";
import { useUser } from "@/lib/context/user-context";
import { Button } from "@/components/ui/button";

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="bg-primary-light" side="left" onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader>
          <Link href="/">
            <CHNLogo className="h-12 w-auto mx-auto mb-2" />
          </Link>
        </SheetHeader>
        <Separator className="my-6" />
        <div className="flex flex-col gap-6 my-6">
          <PrimaryMenuMobile />
          <div className="grid grid-cols-2 gap-2">
            {user ? (
              <>
                <Button className="rounded-full text-base font-semibold" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button variant="secondary" className="rounded-full text-base font-semibold" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button className="rounded-full text-base font-semibold col-span-2" asChild>
                <Link href="/login" scroll={false}>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
        <SocialIcons size={25} />
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
