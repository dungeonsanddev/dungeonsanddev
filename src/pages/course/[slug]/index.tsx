import { getLessons, Lesson } from '~/utils/lessons-api';
import { prisma } from '~/server/prisma';
import SuperJSON from 'superjson';
import { Course as CourseType } from '@prisma/client';
import { DefaultLayout } from '~/components/Layout/Default';
import Link from 'next/link';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { Markdown } from '~/components/Markdown';
import clsx from 'clsx';
import { H1 } from '~/components/H1';

const Course = ({ data }) => {
  const { course, lessons } = SuperJSON.parse(data) as {
    course: CourseType;
    lessons: Lesson[];
  };
  return (
    <DefaultLayout>
      <H1 className="font-cartdrige font-bold">{course.name}</H1>
      <div className={clsx('mt-8 flex items-start gap-8')}>
        <div className="grow shrink-0">
          <img
            className="shrink-0 rounded-md"
            src={course.media}
            alt={course.name}
            width="300px"
          />
          <Link
            href={`${course.slug}/buy`}
            className="mt-4 w-full inline-flex justify-center items-center gap-x-2 rounded-md bg-yellow-500 py-2.5 px-3.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            Get course
            <ChevronDoubleRightIcon
              className="-mr-0.5 h-5 w-5"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div>
          <Markdown>{course.description}</Markdown>
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps = async (query) => {
  const course = await prisma.course.findFirst({
    where: {
      slug: query.params.slug,
    },
  });
  const lessons = await getLessons({ slug: query.params.slug });
  const jsonString = SuperJSON.stringify({
    course,
    lessons,
  });
  console.log(jsonString);
  return {
    props: { data: jsonString },
  };
};

export default Course;
