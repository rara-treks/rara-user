import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";

interface BreadcrumbsProps {
  data: {
    type?: string;
    title?: string;
    location?: string;
    rating?: number;
    total_rating?: number;
    tagline?: string;
  };
}

const Breadcrumbs = ({ data }: BreadcrumbsProps) => {
  if (!data) return null;

  const { type, title } = data;

  // Create breadcrumb segments based on API data
  const segments = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: type || "Tours",
      href: `/${type?.toLowerCase() || "tours"}`,
    },
    {
      label: title || "Tour Details",
      isCurrentPage: true,
    },
  ];

  return (
    <div className="flex w-full items-center">
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const isCurrentPage = segment.isCurrentPage || isLast;

            return (
              <div
                key={`${segment.label}-${index}`}
                className="flex items-center"
              >
                <BreadcrumbItem>
                  {isCurrentPage ? (
                    <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={segment.href!}>{segment.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
