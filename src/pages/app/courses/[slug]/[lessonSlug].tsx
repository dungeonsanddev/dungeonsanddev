import { GetServerSideProps } from 'next';
import { getServerSession, User } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { getLesson, getLessons, Lesson } from '~/utils/lessons-api';
import { Markdown } from '~/components/Markdown';
import { Header } from '~/components/Header';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { prisma } from '~/server/prisma';
import { trpc } from '~/utils/trpc';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

type Props = {
  lessons: Lesson[];
  lesson: Lesson;
  user: Omit<User, 'id'>;
  courseSlug: string;
  lessonIndex: number;
  userCourseID: string;
};

export const LessonPage: FC<Props> = ({
  lesson,
  lessons,
  user,
  courseSlug,
  lessonIndex,
  userCourseID,
}) => {
  const pathname = usePathname();
  const utils = trpc.useContext();
  const { data: progressData } = trpc.course.progress.useQuery({
    id: userCourseID,
  });
  const { mutateAsync } = trpc.course.updateProgress.useMutation({
    onSuccess: () => {
      utils.course.progress.invalidate({ id: userCourseID });
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="h-full mx-auto grid gap-8 grid-rows-[64px,auto]">
      <Header />
      <div className="grid w-full grid-cols-[320px,auto] mx-auto max-w-7xl">
        <div className="w-full grid grid-rows-[auto,40px]">
          <div className="relative px-4">
            <nav className="sticky top-8">
              <ul className="grid gap-2">
                {lessons.map((lesson, i) => (
                  <li key={lesson.title}>
                    <Link
                      className={clsx(
                        'items-center gap-2 p-2 border-b rounded hover:bg-neutral-100 flex',
                        pathname?.includes(String(lesson.data.slug)) &&
                          'font-bold',
                        i < (progressData?.progress || 0) &&
                          'text-green-600 opacity-90',
                      )}
                      href={`/app/courses/${courseSlug}/${lesson.data.slug}`}
                    >
                      {lesson.title}
                      {i < (progressData?.progress || 0) && (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Link
            href="/app"
            className="flex items-center justify-center p-4 text-red-700 border-t border-neutral-200"
          >
            Leave
          </Link>
        </div>
        <div className="grid gap-8 px-4">
          <div className="sticky top-4 flex resize items-center justify-center w-full overflow-hidden bg-black rounded shadow-lg -left-[50%] aspect-video">
            <ReactPlayer
              onEnded={() =>
                mutateAsync({
                  progress: lessonIndex + 1,
                  id: userCourseID,
                })
              }
              muted
              width="100%"
              height="100%"
              url={lesson?.data?.video ?? ''}
              controls={true}
            />
          </div>
          <div className="grid gap-4 pb-4 overflow-auto text-lg leading-relaxed">
            <Markdown>{lesson?.content ?? ''}</Markdown>
          </div>
          <div className="flex items-center justify-between pb-4">
            {lessons[lessonIndex - 1] && (
              <Link
                href={`/app/courses/${courseSlug}/${
                  lessons[lessonIndex - 1]?.data.slug
                }`}
                className="flex flex-col items-start justify-center p-4 border rounded"
              >
                <strong>Previous Lesson</strong>
                <span className="text-sm">
                  {lessons[lessonIndex - 1]?.data.title}
                </span>
              </Link>
            )}
            {lessonIndex < lessons.length - 1 && (
              <Link
                href={`/app/courses/${courseSlug}/${
                  lessons[lessonIndex + 1]?.data.slug
                }`}
                className="flex flex-col items-start justify-center p-4 border rounded"
              >
                <strong>Next Lesson</strong>
                <span className="text-sm">
                  {lessons[lessonIndex + 1]?.data.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const { lessons } = await getLessons({ slug: params?.slug });
  const { lesson } = await getLesson({
    slug: params?.slug,
    lessonSlug: params?.lessonSlug,
  });
  const session = await getServerSession(req, res, authOptions);
  const lessonIndex = lessons.findIndex(
    (lesson) => lesson.data.slug === params?.lessonSlug,
  );

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

  const userCourse = await prisma.userCourse.findFirst({
    where: {
      user: { email: session?.user?.email as string },
      course: { slug: params?.slug as string },
    },
  });


  return {
    props: {
      courseSlug: params?.slug as string,
      lesson,
      lessons,
      user: session?.user,
      lessonIndex,
      userCourseID: userCourse?.id,
    },
  };
};

export default LessonPage;
