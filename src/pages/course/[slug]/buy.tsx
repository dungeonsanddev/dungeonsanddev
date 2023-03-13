import { getServerSession } from 'next-auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FancyButton } from '~/components/FancyButton';
import { DefaultLayout } from '~/components/Layout/Default';
import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { prisma } from '~/server/prisma';
import { trpc } from '~/utils/trpc';

const BuyCourse = ({ course, user }) => {
  const { mutateAsync } = trpc.course.buy.useMutation();
  const { push } = useRouter();

  const buyCourse = async () => {
    try {
      await mutateAsync({
        userid: user.id,
        courseid: course.id,
      });
      push(`/app/courses/${course.slug}`);
    } catch {
      toast.error('There was an issue buying your course');
    }
  };
  return (
    <DefaultLayout>
      <FancyButton onClick={buyCourse}>Buy</FancyButton>
    </DefaultLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const course = await prisma.course.findFirst({
    where: {
      slug: ctx.params.slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
  return {
    props: { course, user: session?.user },
  };
};

export default BuyCourse;
