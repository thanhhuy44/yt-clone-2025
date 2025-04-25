import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const video = await db
      .insert(videos)
      .values({
        userId,
        title: "Untitled",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      })
      .returning()
      .then((res) => res[0]);
    return video;
  }),
});
