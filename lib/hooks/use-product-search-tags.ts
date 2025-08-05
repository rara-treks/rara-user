import useProductSearch from "./use-product-search";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { defaultCenter, useMapView } from "../context/google-map-provider";

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: string;
  latitude: number;
  longitude: number;
  display_order: string;
  zoom_level: string;
}

function useProductSearchTags() {
  const { filter, updateFilter } = useProductSearch();
  const { map, reset } = useMapView();
  const { data: tags, isPending } = useQuery({
    queryKey: ["search-tags", filter.type],
    queryFn: async () => {
      if (filter.type === "all") return [];
      const { data } = await axios.get(`/api/product/tags/${filter.type.slice(0, -1)}`);
      return data.data as Tag[];
    },
    throwOnError: false,
  });
  const activeTag = useMemo(() => {
    const lastUsedTag = filter.tags[filter.tags.length - 1];
    if (lastUsedTag) {
      const tag = tags?.find((t) => t.id === lastUsedTag);
      if (tag) {
        return tag;
      }
    }
  }, [filter.tags, tags]);

  function selectTag(tagId: number) {
    const selectedTags = new Set(filter.tags);
    if (selectedTags.has(tagId)) {
      selectedTags.delete(tagId);
      updateFilter([
        {
          key: "tags",
          value: Array.from(selectedTags).join(","),
        },
        {
          key: "page",
          value: 1,
        },
      ]);
      updateMapView(Array.from(selectedTags));
    } else {
      updateFilter([
        {
          key: "tags",
          value: [...filter.tags, tagId].join(","),
        },
      ]);
      updateMapView(Array.from([...filter.tags, tagId]));
    }
  }

  function updateMapView(activeTags: number[]) {
    const lastUsedTag = activeTags[activeTags.length - 1];
    if (lastUsedTag) {
      const tag = tags?.find((t) => t.id === lastUsedTag);
      if (tag) {
        map?.setZoom(Number(tag.zoom_level));
        map?.setCenter({ lat: Number(tag.latitude), lng: Number(tag.longitude) });
      }
    } else {
      reset();
      map?.setCenter(defaultCenter);
    }
  }

  return { tags, activeTag, isPending, selectTag, filter };
}

export default useProductSearchTags;
