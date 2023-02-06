import { prisma } from '~/server/prisma';
import { getLessons } from '~/utils/getLessons';

const Lesson = ({ lessons }) => {
  return <pre>{JSON.stringify(lessons, null, 2)}</pre>;
};

export async function getStaticProps({ params: { slug } }) {
  return getLessons({ slug });
}

export async function getStaticPaths() {
  const paths = await prisma.course.findMany({
    select: {
      slug: true,
    },
  });
  return {
    paths: paths.map((p) => ({ params: { slug: p.slug } })),
    fallback: false, // can also be true or 'blocking'
  };
}

export default Lesson;
