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
});
