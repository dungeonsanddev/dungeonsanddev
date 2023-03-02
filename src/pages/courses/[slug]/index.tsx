import { GetServerSideProps } from 'next';
import { getServerSession, User } from 'next-auth';
import { FC } from 'react';
import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { getLesson, getLessons, Lesson } from '~/utils/lessons-api';
import LessonPage from './[lessonSlug]';

type Props = {
  lessons: Lesson[];
  user: Omit<User, 'id'>;
  courseSlug: string;
  lesson: Lesson;
};

const Lesson: FC<Props> = (props) => <LessonPage {...props} />;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
  res,
}) => {
  const { lessons } = await getLessons({ slug: params!.slug });
  const { lesson } = await getLesson({
    slug: params!.slug,
    lessonSlug: lessons[0]?.data.slug,
  });
  const session = await getServerSession(req, res, authOptions);

  if (!lesson) {
    return { notFound: true };
  }

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      courseSlug: params!.slug as string,
      lessons,
      lesson,
      user: session?.user,
    },
  };
};

export default Lesson;
