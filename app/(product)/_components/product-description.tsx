import React from "react";
import { Button } from "@/components/ui/button";
import { IconChevronRight } from "@tabler/icons-react";
import { DialogOrDrawer, DialogOrDrawerContent, DialogOrDrawerTrigger } from "@/components/ui/dialog-or-drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  title: string;
  shortDescription: string;
  longDescription: string;
}

function ProductDescription({ title, shortDescription, longDescription }: Props) {
  return (
    <section>
      <h2 className="font-bold text-xl mb-3 text-orange-700/90">{title}</h2>
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{
          __html: shortDescription,
        }}
      />
      <DialogOrDrawer>
        <DialogOrDrawerTrigger asChild>
          <Button size="sm" variant="outline" className="gap-2 mt-5 bg-primary-mustard text-white border-0">
            Read more <IconChevronRight size={16} />
          </Button>
        </DialogOrDrawerTrigger>
        <DialogOrDrawerContent className="md:max-w-4xl">
          <ScrollArea className="max-md:h-[70vh] max-h-[70vh]">
            <article className="prose max-w-full text-black" dangerouslySetInnerHTML={{ __html: longDescription }} />
          </ScrollArea>
        </DialogOrDrawerContent>
      </DialogOrDrawer>
    </section>
  );
}

export default ProductDescription;
