"use client";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TeamMember from "./team-member";
import { Memeber } from "@/types/page.types";

interface Props {
  data: Memeber[];
}

function TeamGrid({ data }: Props) {
  return (
    <section className="max-w-7xl mx-auto">
      <ResponsiveMasonry columnsCountBreakPoints={{ 200: 2, 768: 3, 1024: 4, 1280: 5 }}>
        <Masonry className="*:!items-center [&>div:nth-of-type(2)]:mt-20 [&>div:nth-of-type(4)]:mt-20" gutter={"20px"}>
          {data.map((member) => (
            <TeamMember
              className="max-w-64"
              key={member.name}
              name={member.name}
              position={member.position}
              linkedinUrl={member.linkedin_link}
              image={member.whyUsImage}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}

export default TeamGrid;
