import { useEffect, useState } from 'react';

const IndexPage = () => {
  return (
    <section className="flex items-center justify-center w-screen h-screen">
      <h1 className="tracking-tighter text-white font-cartridge text-front">
        Dungeons and Devs
      </h1>
      {Array.from({ length: 500 }, (_, i) => (
        <>
          <Sprite key={i} path="/images/tree.png" />
        </>
      ))}
      {Array.from({ length: 20 }, (_, i) => (
        <>
          <Sprite key={i} path="/images/stone.png" />
        </>
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <Sprite key={i} path="/images/foliage.png" />
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <Sprite key={i} path="/images/statue.png" />
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <Sprite style={{ zIndex: -11 }} key={i} path="/images/pond.png" />
      ))}
    </section>
  );
};

const Sprite = ({ path, ...props }: { path: string }) => {
  const [[width, height], setWindowSize] = useState([0, 0]);
  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  return (
    <img
      style={{
        top: `${getRandomNumber(height)}px`,
        left: `${getRandomNumber(width)}px`,
        ...props.style,
      }}
      className={`absolute -z-10`}
      alt="Tree"
      src={path}
    />
  );
};

const getRandomNumber = (max: number, min = 0) =>
  min + Math.random() * (max - min);

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
