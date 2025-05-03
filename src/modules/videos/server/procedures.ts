import { db } from "@/db";
import { videos, videoUpdateSchema } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId,
        playback_policies: ["public"],
        input: [
          {
            generated_subtitles: [
              {
                language_code: "en",
                name: "English",
              },
            ],
          },
        ],
      },
      cors_origin: "*", // TODO: in production, set to your url
    });
    console.log("🚀 ~ create:protectedProcedure.mutation ~ upload:", upload);

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
      url: upload.url,
    };
  }),
  update: protectedProcedure
    .input(videoUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Video id is required",
        });
      }

      const video = await db
        .update(videos)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
        .returning()
        .then((res) => res[0]);

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      return video;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const deletedVideo = await db
        .delete(videos)
        .where(and(eq(videos.id, input.id), eq(videos.userId, userId)));
      if (!deletedVideo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }
      return deletedVideo 
    }),
});
