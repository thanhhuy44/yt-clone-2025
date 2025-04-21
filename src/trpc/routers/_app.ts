import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      console.log("🚀 ~ .query ~ opts:", opts)
      // query data && return
      console.log("🚀 ~ .query ~ opts.ctx.clerkUserId:", opts.ctx.clerkUserId)
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  test: baseProcedure.input(
    z.object({
      text: z.string(),
    }),
  ).query((opts) => {
    return {
      greeting: `test ${opts.input.text}`,
    }}
  )
});
// export type definition of API
export type AppRouter = typeof appRouter;