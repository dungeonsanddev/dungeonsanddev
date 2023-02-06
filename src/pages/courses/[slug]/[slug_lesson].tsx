import { prisma } from '~/server/prisma';
import { getAllPaths, getLesson, getLessons } from '~/utils/lessons-api';

const Course = ({ lessons }) => {
  return <pre>{JSON.stringify(lessons, null, 2)}</pre>;
};

export const getStaticProps = async ({ params }) =>
  getLesson({ slug: params.slug, lessonSlug: params.slug_lesson });

export const getStaticPaths = () => getAllPaths();
export default Course;
