"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

export const VideosSection = () => {
  const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => ({
        id: lastPage.nextCursor?.id as string,
        updatedAt: new Date(lastPage.nextCursor?.updatedAt as string),
      }),
    }
  );
  console.log("🚀 ~ VideosSection ~ data:", data);

  return <div>{JSON.stringify(data)}</div>;
};
