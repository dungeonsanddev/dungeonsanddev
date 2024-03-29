import { H1 } from '~/components/H1';
import { Markdown } from '~/components/Markdown';
import clsx from 'clsx';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { CourseWithAuthor } from '~/pages/courses';
import Link from 'next/link';

export const CourseInList = ({
  course,
  index,
}: {
  course: CourseWithAuthor;
  index: number;
}) => {
  return (
    <div
      key={course.id}
      className={clsx(
        'mx-auto flex flex-col w-full',
        index % 2 ? ' items-end' : 'items-start',
      )}
    >
      <H1 className="font-bold font-cartdrige">{course.name}</H1>
      <p className="text-sm text-slate-600">
        By{' '}
        <Link
          className="font-bold underline"
          href={`teachers/${course.author.id}`}
        >
          {course.author.name}
        </Link>
      </p>
      <span className="inline-flex items-center rounded-full my-2 bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 lowercase">
        {course.category}
      </span>
      <div
        className={clsx(
          'mt-8 flex items-start gap-8',
          index % 2 && 'flex-row-reverse ',
        )}
      >
        <div className="grow shrink-0">
          <img
            className="rounded-md shrink-0"
            src={course.media}
            alt={course.name}
            width="300px"
          />
          <Link
            href={`course/${course.slug}`}
            className=" mt-4 w-full inline-flex justify-center items-center gap-x-2 rounded-md bg-yellow-500 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            More Details
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
    </div>
  );
};
