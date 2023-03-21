import { QueueListIcon, WindowIcon } from '@heroicons/react/24/solid';
import { Course, User, UserCourse } from '@prisma/client';
import clsx from 'clsx';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FC, useState } from 'react';
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

const App: FC<Props> = ({ userCourses, recommendedCourses }) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('');
  const courses: Array<{ course: Course }> = userCourses?.length
    ? userCourses
    : recommendedCourses;

  return (
    <>
      <Header />
      <div className="grid w-full gap-8 px-4 py-8 mx-auto max-w-7xl">
        <div className="grid gap-2">
          <H1>Your Courses</H1>
          <p className="leading-relaxed">
            Welcome to your courses page! This is where you can access all the
            courses you&lsquo;ve enrolled in, track your progress, and complete
            your learning objectives. Feel free to explore your courses and take
            advantage of the learning resources available to you. To explore
            more courses than you&lsquo;ve enrolled in, be sure to visit the{' '}
            <Link className="underline" href="/courses">
              course catalog
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 leading-none">
          <label className="grid w-full gap-1 text-sm">
            Search courses...
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded border-neutral-300"
              type="text"
              placeholder="tailWIN"
            />
          </label>
          <div className="flex items-center mt-6 leading-none h-[43px] border border-neutral-300 rounded">
            <button
              className={clsx(
                layout === 'list' && 'shadow-inner bg-neutral-100',
                'h-full p-1 text-neutral-500 shrink-0 aspect-square',
              )}
              onClick={() => {
                setLayout('list');
              }}
            >
              <QueueListIcon className="mx-auto" width={24} />
            </button>
            <button
              className={clsx(
                layout === 'grid' && 'shadow-inner bg-neutral-100',
                'h-full p-1 border-l text-neutral-500 shrink-0 aspect-square',
              )}
              onClick={() => {
                setLayout('grid');
              }}
            >
              <WindowIcon className="mx-auto" width={24} />
            </button>
          </div>
        </div>
        <div
          className={clsx(
            layout === 'list' && 'grid gap-4',
            layout === 'grid' && 'grid grid-cols-3',
          )}
        >
          {courses
            ?.filter((c) => c.course.name.toLowerCase().includes(filter))
            .map(
              (
                userCourse:
                  | Props['userCourses'][-1]
                  | Props['recommendedCourses'][-1],
                index: number,
              ) => (
                <div
                  key={userCourse.id}
                  className={clsx(
                    'gap-4 p-4 border border-gray-200 rounded',
                    layout === 'list' && 'flex items-center',
                    layout === 'grid' && 'grid',
                  )}
                >
                  <div
                    className="min-w-[200px] bg-cover border-b border-gray-200 rounded shadow shrink-0 aspect-square"
                    style={{
                      backgroundImage: `url(${userCourse.course.media})`,
                    }}
                  />
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <h2 className="text-2xl font-semibold">
                        {userCourse.course.name}
                      </h2>
                      {'startedDate' in userCourse && (
                        <>
                          <span>
                            Started on {formatDate(userCourse.startedDate)}
                          </span>
                        </>
                      )}
                      <p className="text-sm line-clamp-3">
                        {userCourse.course.description}
                      </p>
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
      course: {
        select: {
          description: true,
          slug: true,
          id: true,
          name: true,
          media: true,
        },
      },
    },
  });

  const userCourses = serialize(rawUserCourses).json;

  const recommendedCourses = await prisma.course.findMany({
    where: { id: { notIn: rawUserCourses.map((c) => c.course.id) } },
    select: {
      id: true,
      name: true,
      media: true,
      slug: true,
    },
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
