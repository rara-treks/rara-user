import React from "react";
import { Button } from "@/components/ui/button";
import { safetyData } from "@/lib/data/safety";
import {
  DialogOrDrawer,
  DialogOrDrawerContent,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
} from "@/components/ui/dialog-or-drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function CHNSafety() {
  return (
    <section className="bg-slate-200 py-10 md:py-20">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-9">Safety at Community Homestay Network</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {safetyData.map((item) => (
            <SafetyCard key={item.title} title={item.title} description={item.description} content={item.content} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CHNSafety;

interface SafetyCardProps {
  title: string;
  description: string;
  content: { title: string; description: string }[];
  className?: string;
}

function SafetyCard({ title, description, content, className }: SafetyCardProps) {
  return (
    <div key={title} className={cn("bg-background rounded-2xl p-4 md:p-8 flex flex-col gap-6", className)}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{description}</p>
      {content.length > 0 && (
        <DialogOrDrawer>
          <DialogOrDrawerTrigger asChild>
            <Button className="rounded-full w-fit mt-auto">Learn More</Button>
          </DialogOrDrawerTrigger>
          <DialogOrDrawerContent className="md:max-w-4xl">
            <DialogOrDrawerTitle className="mb-4">{title}</DialogOrDrawerTitle>
            <ScrollArea className="h-[70vh] px-2">
              <div className="grid md:grid-cols-2 gap-8">
                {content.map((item) => (
                  <SafetyCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    content={[]}
                    className="!p-0 [&_h3]:text-base gap-2"
                  />
                ))}
              </div>
            </ScrollArea>
          </DialogOrDrawerContent>
        </DialogOrDrawer>
      )}
    </div>
  );
}
