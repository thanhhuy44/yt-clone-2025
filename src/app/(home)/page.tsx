import { HydrateClient, trpc } from "@/trpc/server";
import ClientComp from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Home = async () => {
  void trpc.hello.prefetch({ text: "Huy dep try" });

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <ClientComp />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};

export default Home;
