// import React from "react";
// import HeroSection from "./_components/hero-section";
// import { Metadata } from "next";
// import getBlogs from "@/lib/utils/server/get-blogs";
// import AllCoverage from "./_components/all-coverage";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Press",
//     description: "Press",
//     keywords: "Press",
//   };
// }

// async function Press() {
//   const mediaCoverage = await getBlogs({
//     filters: {
//       type: "mediaCoverage",
//     },
//     perPage: 12,
//   });

//   if (!mediaCoverage) return null;

//   return (
//     <main>
//       <div className="pb-10">
//         <HeroSection />
//         <div className="container py-8 flex flex-col gap-10">
//           <AllCoverage coverage={mediaCoverage} />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Press;
// export const dynamic = "force-static";


const Press = () => {
  return (
    <div>Press</div>
  )
}
export default Press