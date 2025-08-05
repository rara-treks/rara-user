import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IconChevronDown, IconChevronRight, IconProps } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  DialogOrDrawer,
  DialogOrDrawerContent,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
} from "@/components/ui/dialog-or-drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  title: string;
  data: {
    name: string;
    icon: React.FC<IconProps>;
    description: string;
  }[];
  hideDescription?: boolean;
  className?: string;
  maxItems: {
    desktop: number;
    mobile: number;
  };
}

function IconList({ title, data, hideDescription, className, maxItems }: Props) {
  const initialItems = data.slice(0, maxItems.desktop);
  const moreItems = data.slice(maxItems.mobile);

  if (data.length === 0) return null;

  return (
    <Collapsible defaultOpen className={className}>
      <CollapsibleTrigger className="w-full md:pointer-events-none group">
        <h2 className="font-bold text-xl mb-5 flex justify-between items-center w-full">
          {title}
          <IconChevronDown className="block md:hidden group-aria-expanded:rotate-180 transition-transform" />
        </h2>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-4">
        <div className="items-container grid gap-y-5 gap-x-10 w-fit">
          {initialItems.map((item, index) => (
            <Item
              key={index}
              item={item}
              hideDescription={hideDescription}
              className={cn(index > maxItems.mobile - 1 ? "hidden md:grid" : "")}
            />
          ))}
        </div>
        <DialogOrDrawer>
          <DialogOrDrawerTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "w-fit gap-2 bg-primary-mustard text-white border-0",
                data.length > maxItems.mobile ? "" : "max-md:hidden",
                data.length > maxItems.desktop ? "" : "md:hidden"
              )}
            >
              View more <IconChevronRight size={16} />
            </Button>
          </DialogOrDrawerTrigger>
          <DialogOrDrawerContent className="md:max-w-5xl">
            <DialogOrDrawerTitle className="mb-7 font-semibold">{title}</DialogOrDrawerTitle>
            <ScrollArea
              className="max-md:h-[--items-height] max-h-[70vh]"
              style={{
                // @ts-ignore
                "--items-height": `${moreItems.length * 55}px`,
              }}
            >
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 overflow-auto">
                {moreItems.map((item, index) => (
                  <Item
                    key={index}
                    item={item}
                    hideDescription={hideDescription}
                    className={cn(index < Math.abs(maxItems.desktop - maxItems.mobile) ? "md:hidden" : "")}
                  />
                ))}
              </div>
            </ScrollArea>
          </DialogOrDrawerContent>
        </DialogOrDrawer>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default IconList;

function Item({ item, hideDescription, className }: { item: any; hideDescription?: boolean; className?: string }) {
  return (
    <div key={item.id} className={cn("grid grid-cols-[30px_1fr] gap-5 items-center icon-list-item", className)}>
      {item.icon ? <item.icon size={35} stroke={1.5} /> : <div />}
      <div>
        <h4 className="font-semibold">{item.name}</h4>
        {!hideDescription && <p className="text-gray-500 text-sm">{item.description}</p>}
      </div>
    </div>
  );
}
