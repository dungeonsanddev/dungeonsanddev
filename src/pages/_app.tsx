import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

import { DefaultLayout } from '~/components/DefaultLayout';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { SessionProvider } from 'next-auth/react';
import '../styles/global.css';
import { Toaster } from 'react-hot-toast';

export type NextPageWithLayout = NextPage & {
  layout?: ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (props: AppPropsWithLayout) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = (Component.layout || DefaultLayout) as any;

  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
