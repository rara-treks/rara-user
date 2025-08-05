import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { ProductHost } from "@/types/product.types";
import {
  DialogOrDrawer,
  DialogOrDrawerContent,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
} from "@/components/ui/dialog-or-drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  sideImage: string;
  hosts: ProductHost[];
}

function MeetTheHostCard({ sideImage, hosts }: Props) {
  return (
    <div className="grid md:grid-cols-3 items-center rounded-2xl border w-full md:max-w-80 relative overflow-hidden bg-white">
      <Image
        className="aspect-[4/3] md:aspect-square object-cover object-top h-fit md:h-24 self-start bg-white"
        width={500}
        height={500}
        src={sideImage}
        alt="Hosts"
      />
      <div className="md:col-span-2 p-3">
        <h2 className="font-semibold md:text-lg leading-6 mb-2">Meet the Hosts</h2>
        <DialogOrDrawer>
          <DialogOrDrawerTrigger asChild>
            <Button className="w-full" size="sm">
              View hosts
            </Button>
          </DialogOrDrawerTrigger>
          <DialogOrDrawerContent className="md:max-w-4xl">
            <DialogOrDrawerTitle className="mb-4">Host Stories</DialogOrDrawerTitle>
            <ScrollArea className="max-md:h-[70vh] max-h-[70vh]">
              <div className="grid md:grid-cols-2 gap-8">
                {hosts.map((host) => (
                  <HostCard
                    key={host.id}
                    title={host.fullname}
                    description={host.description}
                    image={host.profileImage}
                  />
                ))}
              </div>
            </ScrollArea>
          </DialogOrDrawerContent>
        </DialogOrDrawer>
      </div>
    </div>
  );
}

export default MeetTheHostCard;

function HostCard({ title, image, description }: { image: string; title: string; description: string }) {
  return (
    <div>
      <Image
        className="border rounded-lg aspect-[4/3] object-top object-cover bg-white"
        src={image}
        alt={title}
        width={800}
        height={800}
      />
      <h5 className="my-2 font-semibold text-lg">{title}</h5>
      <p className="">{description}</p>
    </div>
  );
}
