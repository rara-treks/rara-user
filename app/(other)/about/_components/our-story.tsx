import TextWithBrandmark from "@/components/text-with-brandmark";
import { cn } from "@/lib/utils";
import React from "react";
import Story2024 from "./story/2024";
import Story2023 from "./story/2023";
import Story2022 from "./story/2022";
import Story2021 from "./story/2021";
import Story2020 from "./story/2020";
import Story2019 from "./story/2019";
import Story2018 from "./story/2018";
import Story2017 from "./story/2017";
import Story2016 from "./story/2016";
import Story2015 from "./story/2015";
import Story2014 from "./story/2014";
import Story2013 from "./story/2013";
import Story2012 from "./story/2012";

interface Props {
  description: string;
}

function OurStory({ description }: Props) {
  return (
    <section className="overflow-hidden" id="our-story">
      <div className="container">
        <TextWithBrandmark size={70} type="h2" className="*:font-bebas-neue *:font-medium justify-center">
          Our <span className="text-primary">story</span>
        </TextWithBrandmark>
        <div className="prose max-w-4xl mx-auto text-center mt-5 relative">
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      </div>
      <div
        className={cn(
          "relative text-left p-10 md:px-20 select-none mx-auto max-w-screen-2xl",
          "[&_h2]:font-bebas-neue [&_h2]:text-4xl [&_h2]:mb-5 [&_h2]:text-primary",
          "[&_p]:mb-2 [&_b]:text-gray-900 [&_b]:font-semibold [&_a_b]:text-primary"
        )}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5">
          <Story2024 />
          <Story2023 />
          <Story2022 />
          <Story2021 />
          <Story2020 />
          <Story2019 />
          <Story2018 />
          <Story2017 />
          <Story2016 />
          <Story2015 />
          <Story2014 />
          <Story2013 />
          <Story2012 />
        </div>
      </div>
    </section>
  );
}

export default OurStory;
