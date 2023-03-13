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
        'leading-none tracking-tight text-6xl font-cartridge text-neutral-700',
      )}
    >
      {children}
    </h1>
  );
};
