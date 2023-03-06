import { Course } from '@prisma/client';
import { useCourses } from '~/utils/hooks/useCourses';

import Link from 'next/link';
import { DefaultLayout } from '~/components/Layout/Default';
import { Markdown } from '~/components/Markdown';

const CoursesPage = () => {
  const { data: courses } = useCourses();
  console.log(courses);
  return (
    <DefaultLayout>
      {(courses || []).map((course: Course) => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <small className="capitalize">
            {course.category.toLocaleLowerCase()}
          </small>
          <div className="flex items-start gap-4">
            <img
              className="shrink-0"
              src={course.media}
              alt={course.name}
              width="200px"
            />
            <div>
              <Markdown>{course.description}</Markdown>
            </div>
          </div>
          <Link href={`course/${course.slug}`}>Go to course {'->'}</Link>
        </div>
      ))}
    </DefaultLayout>
  );
};

export default CoursesPage;
