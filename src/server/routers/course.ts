import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

export const courseRouter = router({
  buy: publicProcedure
    .input(
      z.object({
        courseid: z.string(),
        userid: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { courseid, userid } = input;

      const buyCourse = await prisma.userCourse.create({
        data: {
          userId: userid,
          courseId: courseid,
        },
      });

      return buyCourse;
    }),
  updateProgress: publicProcedure
    .input(
      z.object({
        progress: z.number(),
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { progress, id } = input;

      const progressUpdated = await prisma.userCourse.update({
        where: {
          id,
        },
        data: {
          progress
        },
      });

      return progressUpdated;
    }),

  all: publicProcedure.query(async () => {
    const items = await prisma.course.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return items;
  }),
  bySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { slug } = input;
      const post = await prisma.course.findUnique({
        where: { slug },
        include: {
          author: true,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course with id '${slug}'`,
        });
      }
      return post;
    }),
  progress: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const post = await prisma.userCourse.findFirst({
        where: { id },
        select: {
          progress: true,
        }
      });
      return post;
    }),
});
