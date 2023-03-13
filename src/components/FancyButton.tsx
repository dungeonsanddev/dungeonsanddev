import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
};

export const FancyButton = ({ children, onClick, className }: Props) => {
  return (
    <button
      className={classNames(
        'flex py-2 px-11 decoration-none font-cartridge font-bold text-4xl text-slate-100 bg-indigo-600 focus:outline-none z-30 fancy-button -skew-x-12',
        className,
      )}
      onClick={onClick}
    >
      <span className="w-max">{children}</span>
      <span>
        <svg
          width="66px"
          height="43px"
          viewBox="0 0 66 43"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="arrow" fill="none" fillRule="evenodd">
            <path
              className="one"
              d="M14.6665 28.8001V21.5999H7.33333V28.8001H14.6665ZM0 28.8001V36H7.3335V28.8001H0ZM7.3335 14.4001H14.6667V7.1999H7.3335V14.4001ZM22 14.4001H14.6665V21.6H22V14.4001ZM7.3335 7.1999V0H0V7.1999H7.3335Z"
              fill="white"
            />
            <path
              className="two"
              d="M36.6665 28.8001V21.5999H29.3333V28.8001H36.6665ZM22 28.8001V36H29.3335V28.8001H22ZM29.3335 14.4001H36.6667V7.1999H29.3335V14.4001ZM44 14.4001H36.6665V21.6H44V14.4001ZM29.3335 7.1999V0H22V7.1999H29.3335Z"
              fill="white"
            />
            <path
              className="three"
              d="M56.6665 28.8001V21.5999H49.3333V28.8001H56.6665ZM42 28.8001V36H49.3335V28.8001H42ZM49.3335 14.4001H56.6667V7.1999H49.3335V14.4001ZM64 14.4001H56.6665V21.6H64V14.4001ZM49.3335 7.1999V0H42V7.1999H49.3335Z"
              fill="white"
            />
          </g>
        </svg>
      </span>
    </button>
  );
};
