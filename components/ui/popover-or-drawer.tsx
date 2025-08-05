"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useWindowSize } from "@uidotdev/usehooks";

function PopoverOrDrawer({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Root = isMobile ? Drawer : Popover;
  return <Root {...props}>{children}</Root>;
}

function PopoverOrDrawerContent({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Content = isMobile ? DrawerContent : PopoverContent;

  return <Content {...props}>{children}</Content>;
}

function PopoverOrDrawerTrigger({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Trigger = isMobile ? DrawerTrigger : PopoverTrigger;

  return <Trigger {...props}>{children}</Trigger>;
}

export { PopoverOrDrawer, PopoverOrDrawerTrigger, PopoverOrDrawerContent };
