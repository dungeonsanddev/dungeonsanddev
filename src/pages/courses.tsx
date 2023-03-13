import { Author, Course } from '@prisma/client';
import { useCourses } from '~/utils/hooks/useCourses';
import { DefaultLayout } from '~/components/Layout/Default';
import { CourseInList } from '~/components/CourseInList';
import { useState } from 'react';

export type CourseWithAuthor = Course & { author: Author };

const CoursesPage = () => {
  const { data: courses } = useCourses();
  const [filter, setFilter] = useState('');
  return (
    <DefaultLayout>
      <div className="flex flex-col items-start w-full gap-12">
        <label className="grid w-full gap-1 text-sm">
          Search courses...
          <input
            className="w-full border-none rounded shadow"
            type="text"
            placeholder="intro to qwik"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
        {(courses || [])
          .filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
          .map((course: CourseWithAuthor, index: number) => (
            <CourseInList course={course} index={index} key={course.id} />
          ))}
      </div>
    </DefaultLayout>
  );
};

export default CoursesPage;
