import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Header } from './header';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
        <main>{children}</main>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
