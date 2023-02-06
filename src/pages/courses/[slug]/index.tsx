import { getLessons } from '~/utils/lessons-api';
import { prisma } from '~/server/prisma';

const Lesson = ({ lessons }) => {
  return <pre>{JSON.stringify(lessons, null, 2)}</pre>;
};

export const getStaticProps = async ({ params: { slug } }) =>
  getLessons({ slug });

export const getStaticPaths = async () => {
  const paths = await prisma.course.findMany({
    select: {
      slug: true,
    },
  });
  return {
    paths: paths.map((p) => ({ params: { slug: p.slug } })),
    fallback: false, // can also be true or 'blocking'
  };
};
export default Lesson;
