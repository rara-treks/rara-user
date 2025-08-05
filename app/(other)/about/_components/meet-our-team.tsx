import TextWithBrandmark from "@/components/text-with-brandmark";
import React from "react";
import server from "@/lib/server";
import { Memeber } from "@/types/page.types";
import dynamic from "next/dynamic";
const TeamGrid = dynamic(() => import("./team-grid"), { ssr: false });

async function MeetOurTeam() {
  const team = await server.get<{ data: Memeber[] }>("/page/team");

  return (
    <section className="container">
      <div className="mb-10">
        <TextWithBrandmark size={70} type="h2" className="*:font-bebas-neue *:font-medium justify-center">
          Meet our <span className="text-primary">team</span>
        </TextWithBrandmark>
        <p className="text-center mt-5">
          We are a Kathmandu, Nepal based startup made of hip youth, driven to use tourism for good. We are
          mountaineers, artists, musicians, serial entrepreneurs.
        </p>
      </div>
      <div>
        <TeamGrid data={team.data.data} />
      </div>
    </section>
  );
}

export default MeetOurTeam;
