import { GetServerSideProps } from 'next';
import { getServerSession, User } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { getLesson, getLessons, Lesson } from '~/utils/lessons-api';
import { Markdown } from '~/components/Markdown';

type Props = {
  lessons: Lesson[];
  lesson: Lesson;
  user: Omit<User, 'id'>;
  courseSlug: string;
};

export const LessonPage: FC<Props> = ({
  lesson,
  lessons,
  user,
  courseSlug,
}) => {
  if (!user) {
    return null;
  }
  return (
    <div className="h-full grid grid-rows-[56px,auto]">
      <header className="flex items-center justify-between p-4 shadow">
        <div>Dungeons & Dev</div>
        <div>
          <img
            className="w-8 rounded-full"
            alt={user.name || ''}
            src={user.image || ''}
          />
          {/* @todo add hover menu to logout */}
        </div>
      </header>
      <div className="grid grid-cols-[1fr,4fr]">
        <div className="grid grid-rows-[40px,auto,40px]">
          <div className="flex items-center p-4 border-neutral-200">
            Lessons
          </div>
          <div className="px-4">
            <nav>
              <ul>
                {lessons.map((lesson) => (
                  <li key={lesson.title}>
                    <Link href={`/courses/${courseSlug}/${lesson.data.slug}`}>
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center justify-center p-4 text-red-700 border-t border-neutral-200">
            Leave
          </div>
        </div>
        <div className="border-l border-neutral-200 grid grid-rows-[40px,auto,auto]">
          <div className="flex items-center px-4 border-b border-neutral-200">
            progress bar
          </div>
          <div className="flex items-center justify-center bg-black">
            <ReactPlayer
              autoPlay
              muted
              width="100%"
              height="100%"
              url={lesson?.data?.video ?? ''}
            />
          </div>
          <div className="grid gap-4 p-4 text-lg leading-relaxed">
            <Markdown>{lesson?.content ?? ''}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
  res,
}) => {
  const { lessons } = await getLessons({ slug: params!.slug });
  const { lesson } = await getLesson({
    slug: params!.slug,
    lessonSlug: params!.lessonSlug,
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
      lesson,
      lessons,
      user: session?.user,
    },
  };
};

export default LessonPage;
