import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export const H1: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={clsx(
        className,
        'leading-none tracking-tighter text-7xl font-cartridge md:text-front',
      )}
    >
      {children}
    </h1>
  );
};
