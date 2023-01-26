import Link from 'next/link';
import { usePosts } from '~/utils/hooks/usePosts';

const IndexPage = () => {
  const posts = usePosts();
  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <h1 className="text-front tracking-tighter text-white">
        Dungeons and Devs
      </h1>
      {Array.from({ length: 45 }, (_, i) => (
        <img className="absolute" key={i} alt="Tree" src="/images/tree.png" />
      ))}
      <img alt="Stone" src="/images/stone.png" />
    </section>
  );
};

// const Tree = () => {};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
