import { db } from "@/db";
import { users } from "@/db/schema";
import { ratelimit } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  const { userId } = await auth();
  return { clerkId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // console.log("🚀 ~ protectedProcedure ~ ctx.clerkId:", ctx.clerkId)
  if (!ctx.clerkId) {
    throw new TRPCError({
      message: "Unauthorized",
      code: "UNAUTHORIZED",
    });
  }

  const user = await db
  .select()
  .from(users)
  .where(eq(users.clerkId, ctx.clerkId))
  .limit(1)
  .then((users) => users[0]);
  
  // console.log("🚀 ~ protectedProcedure ~ user:", user)
  if (!user)
    throw new TRPCError({
      message: "Unauthorized",
      code: "UNAUTHORIZED",
    });

  const { success } = await ratelimit.limit(user.id);

  if (!success)
    throw new TRPCError({
      message: "Too many requests",
      code: "TOO_MANY_REQUESTS",
    });

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
