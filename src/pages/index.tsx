import { signIn } from 'next-auth/react';
import { FancyButton } from '~/components/FancyButton';
import { useLDtk } from '~/utils/hooks/useLDtk';

const IndexPage = () => {
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
        <section className="font-cartridge absolute top-1/2 left-1/2 z-20 -translate-y-1/2 -translate-x-1/2">
          <div className="title-wrapper grid justify-center items-center -skew-y-12">
            <h1 className="website-title order-2 font-black uppercase text-slate-100 text-center">
              <span
                className="block relative before:absolute before:z-[1]"
                data-text="Dungeons"
              >
                Dungeons
              </span>
              <span
                className=" block before:absolute before:z-[1] relative"
                data-text="& Dev"
              >
                & Dev
              </span>
            </h1>
          </div>
          <FancyButton
            className="absolute left-1/2 mt-12 -translate-x-1/2"
            onClick={() => {
              signIn('github', { callbackUrl: '/app' });
            }}
          >
            Get Started
          </FancyButton>
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
                ...level.style,
                margin: 'auto',
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
