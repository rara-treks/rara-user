// "use client";

// import React, { Suspense } from "react";
// import { useSearchParams } from "next/navigation";

// const DossierContent = () => {
//   const searchParams = useSearchParams();
//   const pdfUrl = searchParams.get("pdfUrl");

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className=" mx-auto">
//         <header className="border-b pb-4 mb-6">
//           <h1 className="text-2xl font-bold">Trip Dossier</h1>
//         </header>
//       </div>
//       <div className="mt-4">
//         <div className="prose max-w-none">
//           <h2 className="font-bold text-xl mb-4">Dossier Information</h2>
//           <p className="mb-4">
//             Every booking with Community Homestay Network includes detailed
//             dossier information. You can view and download the complete dossier
//             below.
//           </p>
//           {pdfUrl && (
//             <div>
//               <iframe
//                 src={pdfUrl}
//                 width="100%"
//                 height="600px"
//                 title="Dossier PDF"
//               ></iframe>
//               <a
//                 href={pdfUrl}
//                 download
//                 className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
//               >
//                 Download Dossier
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Dossier = () => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <DossierContent />
//   </Suspense>
// );

// export default Dossier;
const Dossier = () => {
  return (
    <div>Dossier</div>
  )
}
export default Dossier