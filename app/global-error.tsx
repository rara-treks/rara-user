"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main>
      <section className="flex flex-col justify-center items-center py-20 gap-10">
        <div className="flex flex-col gap-3 justify-center items-center">
          <h1 className="font-bebas-neue text-4xl md:text-5xl">Something Went Wrong</h1>
          <Button className="rounded-full w-fit" onClick={reset}>
            Retry
          </Button>
        </div>
      </section>
    </main>
  );
}

export default GlobalError;
