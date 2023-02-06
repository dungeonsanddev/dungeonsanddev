import { Course, User, UserCourse } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import { serialize } from 'superjson';

import { Button } from '~/components/Button';
import { H1 } from '~/components/H1';
import { prisma } from '~/server/prisma';
import { formatDate } from '~/utils/formatDate';
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  user: User;
  userCourses: (UserCourse & { course: Course })[];
};

const App: FC<Props> = ({ user, userCourses }) => {
  if (!userCourses) {
    return null;
  }

  return (
    <div className="grid max-w-screen-lg gap-8 py-8 mx-auto">
      <H1>Hey there, {user?.name?.split(' ')[0]}!</H1>
      <p className="text-4xl">
        Here are your courses that you&apos;ve signed up for.
      </p>
      <div className="grid grid-cols-4 gap-4">
        {userCourses.map((userCourse) => (
          <div key={userCourse.id} className="border border-gray-200 rounded">
            <div
              className="bg-cover aspect-square w-[200px] border-b border-gray-200"
              style={{ backgroundImage: `url(${userCourse.course.media})` }}
            />
            <div className="grid gap-4 p-4">
              <div className="grid gap-2">
                <h2 className="text-2xl">{userCourse.course.name}</h2>
                <span>Started on {formatDate(userCourse.startedDate)}</span>
                <progress
                  className="w-full h-2 overflow-hidden rounded bg-neutral-200"
                  max={100}
                  value={userCourse.progress || 0}
                />
              </div>
              <Button>Dive in!</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/?e=unauthd',
        permanent: false,
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
      course: { select: { id: true, name: true, media: true } },
    },
  });

  const userCourses = serialize(rawUserCourses).json;

  return {
    props: {
      user: session.user,
      userCourses,
    },
  };
};

export default App;
