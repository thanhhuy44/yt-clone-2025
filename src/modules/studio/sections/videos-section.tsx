"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEFAULT_LIMIT } from "@/constants";
import { snakeCaseToTitle } from "@/lib/utils";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import { trpc } from "@/trpc/client";
import { format } from "date-fns";
import { Globe, Lock } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const VideosSectionSuspense = () => {
  const [data, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <Link
                  key={video.id}
                  href={`/studio/videos/${video.id}`}
                  className="block"
                  legacyBehavior
                >
                  <TableRow className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-x-3">
                        <div className="aspect-video w-36">
                          <VideoThumbnail
                            title={video.title}
                            duration={video.duration!}
                            imageUrl={video.thumbnailUrl!}
                            previewUrl={video.previewUrl!}
                          />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium line-clamp-1">
                            {video.title}
                          </h5>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {video.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center ">
                        {video.visibility === "private" ? (
                          <Lock className="size-4" />
                        ) : (
                          <Globe className="size-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {snakeCaseToTitle(video.muxStatus)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm truncate">
                      {format(new Date(video.createdAt), "d MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-right">Views</TableCell>
                    <TableCell className="text-right">Comments</TableCell>
                    <TableCell className="text-right">Likes</TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};

const VideosSectionSkeleton = () => {
  return (
    <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6 w-[510px]">Video</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Comments</TableHead>
            <TableHead className="text-right pr-6">Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }, (_, index) => index).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="">
                <div className="flex items-center gap-x-3">
                  <Skeleton className="h-20 w-36" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center ">
                  <Skeleton className="size-4" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-20" />
                </div>
              </TableCell>
              <TableCell className="text-sm truncate">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const VideosSection = () => {
  return (
    <Suspense fallback={<VideosSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};
