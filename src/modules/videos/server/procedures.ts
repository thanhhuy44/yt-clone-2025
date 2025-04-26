import { db } from "@/db";
import { videos } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId,
        playback_policies: ["public"],
      },
      cors_origin: "*", // TODO: in production, set to your url
    })
    console.log("🚀 ~ create:protectedProcedure.mutation ~ upload:", upload)

    const video = await db
      .insert(videos)
      .values({
        userId,
        title: "Untitled",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        muxStatus: "waiting",
        muxUploadId: upload.id,
      })
      .returning()
      .then((res) => res[0]);
    return {
      video,
      url: upload.url
    };
  }),
});
