import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getLeaderboard, addLeaderboardEntry, getUserBestScore } from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leaderboard: router({
    getTop: publicProcedure
      .input(z.object({ limit: z.number().optional().default(100) }))
      .query(async ({ input }) => {
        return await getLeaderboard(input.limit);
      }),
    addEntry: publicProcedure
      .input(
        z.object({
          playerName: z.string().min(1).max(50),
          score: z.number().int().positive(),
          level: z.number().int().positive(),
          userId: z.number().int().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await addLeaderboardEntry({
          playerName: input.playerName,
          score: input.score,
          level: input.level,
          userId: input.userId,
        });
        return { success: true };
      }),
    getUserBest: publicProcedure
      .input(z.object({ userId: z.number().int() }))
      .query(async ({ input }) => {
        return await getUserBestScore(input.userId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
