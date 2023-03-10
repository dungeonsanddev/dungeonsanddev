import { Author, Course } from '@prisma/client';
import { useCourses } from '~/utils/hooks/useCourses';
import { DefaultLayout } from '~/components/Layout/Default';
import { CourseInList } from '~/components/CourseInList';

export type CourseWithAuthor = Course & { author: Author };

const CoursesPage = () => {
  const { data: courses } = useCourses();
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-12 items-start">
        {(courses || []).map((course: CourseWithAuthor, i: number) => (
          <CourseInList course={course} i={i} key={course.id} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default CoursesPage;
