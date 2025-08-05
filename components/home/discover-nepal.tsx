import React from "react";
import TextWithBrandmark from "../text-with-brandmark";
import Homestays from "./homestays";
import getHomeProducts from "@/lib/utils/server/get-home-products";
import Experiences from "./experiences";
import getHomeExperiencesTags from "@/lib/utils/server/get-home-experience-tags";
import Packages from "./packages";
import Trips from "./trips";

async function DiscoverNepal() {
  const homestays = await getHomeProducts("homestay");
  const circuits = await getHomeProducts("circuit");
  const packages = await getHomeProducts("package");
    const experiences = await getHomeProducts("experience");

  // const experiences = await getHomeExperiencesTags();

  return (
    <section>
      <div className="container flex flex-col gap-10">
        <TextWithBrandmark type="h2" className="justify-center" size={70}>
          Discover Nepal
        </TextWithBrandmark>
        <Packages data={packages ?? []} />
        <Trips data={circuits ?? []} />
        <Experiences data={experiences ?? []} />
        <Homestays data={homestays ?? []} />
      </div>
    </section>
  );
}

export default DiscoverNepal;
