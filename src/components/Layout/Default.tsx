import { Header } from '../Header';

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};
