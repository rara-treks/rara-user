import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
}

export default Layout;

function Fallback() {
  return (
    <div>
      <div className="w-full h-[57px] bg-white border-b block"></div>
      <div className="h-1/2 md:h-screen"></div>
    </div>
  );
}
