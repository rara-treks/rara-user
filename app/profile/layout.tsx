import Promotions from "@/components/home/promotions";
import getHomePromotions from "@/lib/utils/server/get-home-promotions";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const promotions = await getHomePromotions();
  return (
    <main>
      <div className="container py-8 flex flex-col gap-5">
        {children}
        <Promotions data={promotions ?? []} />
      </div>
    </main>
  );
}

export default Layout;
export const dynamic = "force-dynamic";
