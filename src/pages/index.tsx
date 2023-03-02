import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { H1 } from '~/components/H1';
import { useLDtk } from '~/utils/hooks/useLDtk';

const IndexPage = () => {
  const session = useSession();
  const router = useRouter();
  const levels = useLDtk({
    sprite: '/images/Modern_Exteriors_Complete_Tileset_32x32.png',
    ldtk: '/images/dungeons_devs.ldtk',
  });

  return (
    <section className="w-screen h-screen overflow-hidden text-gray-50">
      <div className="absolute flex flex-col justify-center gap-4 text-center z-10 w-screen h-screen">
        {/* <h2 className="text-3xl leading-none tracking-normal md:text-5xl font-cartridge">
          Embark on a magical learning quest of HTML.
        </h2> */}
        <section className="header">
          <div className="title-wrapper">
            <h1 className="sweet-title">
              <span data-text="Dungeons">Dungeons</span>
              <span className="ampersdand" data-text="&">
                &
              </span>
              <span data-text="Dev">Dev</span>
            </h1>
          </div>
          <button
            onClick={() => {
              session ? router.push('/app') : signIn();
            }}
            className="p-2 px-4 text-xl leading-none transition transform border-4 rounded shadow-xl hover:scale-110 outline-4 outline outline-solid outline-white font-cartridge border-lime-700 mt-12 bg-lime-600"
          >
            Get Started
          </button>
        </section>
      </div>

      {levels ? (
        <div
          style={{
            background: '#479757',
            width: '100vw',
            height: '100vh',
          }}
        >
          {levels.map((level) => (
            <div
              key={level.iid}
              style={{
                margin: 'auto',
                ...level.style,
              }}
            >
              {level.layerInstances.map((layer) => (
                <div style={layer.style} key={layer.iid}>
                  {layer.gridTiles.map((tile, i) => (
                    <div key={i} style={tile.style}></div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
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
