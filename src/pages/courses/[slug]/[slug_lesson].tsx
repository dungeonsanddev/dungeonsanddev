import { prisma } from '~/server/prisma';
import { getLessons } from '~/utils/getLessons';

const Course = ({ lessons }) => {
  return <pre>{JSON.stringify(lessons, null, 2)}</pre>;
};

export async function getStaticProps({ params }) {
  console.log(params);
  return getLessons({ slug: params.slug });
}

export async function getStaticPaths(params) {
  console.log(params);
  const paths = await getLessons({ slug: params.slug });
  return {
    paths: paths.props.lessons.map((p) => ({ params: { slug: p.data.slug } })),
    fallback: false, // can also be true or 'blocking'
  };
}

export default Course;
