import { Course, User, UserCourse } from '@prisma/client';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import { serialize } from 'superjson';

import { Button } from '~/components/Button';
import { H1 } from '~/components/H1';
import { Header } from '~/components/Header';
import { prisma } from '~/server/prisma';
import { formatDate } from '~/utils/formatDate';
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  user: User;
  userCourses: (UserCourse & { course: Course })[];
  recommendedCourses: (Course & { course: Course })[];
};

const App: FC<Props> = ({ user, userCourses, recommendedCourses }) => {
  const courses = userCourses?.length ? userCourses : recommendedCourses;

  return (
    <>
      <Header />
      <div className="grid w-full gap-8 px-4 py-8 mx-auto max-w-7xl">
        <H1>Hey there, {user?.name?.split(' ')[0]}!</H1>
        <p className="text-4xl">
          {userCourses?.length > 0
            ? "Here are your courses that you've signed up for."
            : "You haven't yet signed up for any courses. Here are some we recommend!"}
        </p>
        <div className="grid grid-cols-4 gap-4">
          {courses?.map(
            (
              userCourse:
                | Props['userCourses'][-1]
                | Props['recommendedCourses'][-1],
              index: number,
            ) => (
              <div
                key={userCourse.id}
                className="border border-gray-200 rounded"
              >
                <div
                  className="bg-cover aspect-square w-[200px] border-b border-gray-200"
                  style={{ backgroundImage: `url(${userCourse.course.media})` }}
                />
                <div className="grid gap-4 p-4">
                  <div className="grid gap-2">
                    <h2 className="text-2xl">{userCourse.course.name}</h2>
                    {'startedDate' in userCourse && (
                      <>
                        <span>
                          Started on {formatDate(userCourse.startedDate)}
                        </span>
                        <progress
                          className="w-full h-2 overflow-hidden rounded bg-neutral-200"
                          max={100}
                          value={userCourse.progress || 0}
                        />
                      </>
                    )}
                  </div>
                  {userCourses[index] ? (
                    <Link
                      href={`/app/courses/${userCourses[index]!.course.slug}`}
                    >
                      <Button>Dive in!</Button>
                    </Link>
                  ) : (
                    <Link href={`/courses/${userCourse.course.slug}/buy`}>
                      <Button>Buy Course</Button>
                    </Link>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/?e=unauthd',
        statusCode: 302,
      },
    };
  }

  const rawUserCourses = await prisma.userCourse.findMany({
    where: { user: { email: session.user.email } },
    select: {
      startedDate: true,
      id: true,
      progress: true,
      course: { select: { slug: true, id: true, name: true, media: true } },
    },
  });

  const userCourses = serialize(rawUserCourses).json;

  const recommendedCourses = await prisma.course.findMany({
    where: { id: { notIn: rawUserCourses.map((c) => c.course.id) } },
    select: { id: true, name: true, media: true, slug: true },
    take: 5,
  });

  return {
    props: {
      user: session.user,
      userCourses,
      recommendedCourses: serialize(
        recommendedCourses.map((c) => ({ course: c, ...c })),
      ).json,
    },
  };
};

export default App;
