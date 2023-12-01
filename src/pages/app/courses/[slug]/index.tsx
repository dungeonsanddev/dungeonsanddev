import { GetServerSideProps } from 'next';
import { getServerSession, User } from 'next-auth';
import { FC } from 'react';
import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { prisma } from '~/server/prisma';
import { getLesson, getLessons, Lesson } from '~/utils/lessons-api';

type Props = {
  lessons: Lesson[];
  user: Omit<User, 'id'>;
  courseSlug: string;
  lesson: Lesson;
};

const Lesson: FC<Props> = (props) => null;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
  res,
}) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const userCourse = await prisma.userCourse.findFirst({
    where: {
      user: { email: session?.user?.email as string },
      course: { slug: params!.slug as string },
    },
  });

  if (!userCourse) {
    return { notFound: true };
  }

  const { lessons } = await getLessons({ slug: params!.slug });
  const { lesson } = await getLesson({
    slug: params!.slug,
    lessonSlug: lessons[userCourse.progress || 0]?.data.slug,
  });

  if (!lesson) {
    return { notFound: true };
  }

  return {
    redirect: {
      destination: `/app/courses/${params!.slug}/${lesson.data.slug}`,
      permanent: false,
    },
  };
};

export default Lesson;
