import { Header } from '../Header';

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="w-full p-4 mx-auto mt-12 max-w-7xl">{children}</main>
    </div>
  );
};
