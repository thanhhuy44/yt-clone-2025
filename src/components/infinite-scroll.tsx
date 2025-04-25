import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect } from "react";
import { Button } from "./ui/button";

type InfiniteScrollProps = {
  isManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  isManual = false,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "1000px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [
    isIntersecting,
    hasNextPage,
    isFetchingNextPage,
    isManual,
    fetchNextPage,
  ]);

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div className="h-1" ref={targetRef}></div>
      {hasNextPage ? (
        <Button
          variant="secondary"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={fetchNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      ) : (
        <p className="text-xs text-muted-foreground">
          You have reach the end of the list
        </p>
      )}
    </div>
  );
};
