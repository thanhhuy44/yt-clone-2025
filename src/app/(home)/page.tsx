import HomeView from "@/modules/home/views/home-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { PageProps } from "@/types";
import { FC } from "react";

export const dynamic = "force-dynamic";

const Home: FC<PageProps> = async ({ searchParams }) => {
  const { category } = await searchParams;
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView category={category} />
    </HydrateClient>
  );
};

export default Home;
