import { GetServerSideProps } from 'next';
import { DefaultSession, getServerSession } from 'next-auth';
import { FC } from 'react';
import { H1 } from '~/components/H1';
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  user: DefaultSession['user'];
};

const App: FC<Props> = ({ user }) => {
  return (
    <div className="grid max-w-screen-lg gap-8 py-8 mx-auto">
      <H1>Hey there, {user?.name?.split(' ')[0]}!</H1>
      <p className="text-4xl">
        Here are your courses that you&apos;ve signed up for.
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/?e=unauthd',
        permanent: false,
        statusCode: 401,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default App;
