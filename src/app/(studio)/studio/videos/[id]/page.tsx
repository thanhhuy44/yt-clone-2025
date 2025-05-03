import { VideoView } from "@/modules/studio/ui/views/video-view";
import { trpc } from "@/trpc/server";
import { PageProps } from "@/types";

export const dynamic = "force-dynamic";

async function Page({ params }: PageProps) {
  const { id } = await params;
  void trpc.studio.getOne.prefetch({ id });

  return <VideoView id={id} />;
}

export default Page;
