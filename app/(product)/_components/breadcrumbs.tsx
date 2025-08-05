import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  title: string;
  productType: string;
}

function Breadcrumbs({ title, productType }: Props) {
  return (
    <Breadcrumb className="hidden md:block font-medium *:text-base">
      <BreadcrumbList className="!gap-1">
        <BreadcrumbItem className="underline text-black">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="capitalize underline text-black">
          <BreadcrumbLink href={`/${productType}s`}>{productType}s</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
