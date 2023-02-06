import { Course } from '@prisma/client';
import { useCourses } from '~/utils/hooks/useCourses';
import ReactMarkdown from 'react-markdown';

const CoursesPage = () => {
  const { data: courses } = useCourses();
  console.log(courses);
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      {(courses || []).map((course: Course) => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <div className="flex items-start gap-4">
            <img
              className="shrink-0"
              src={course.media}
              alt={course.name}
              width="200px"
            />
            <div>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;
