import { useRouter } from 'next/router';

import { GithubLoginButton } from '~/components/GithubLoginButton';
import { Input } from '~/components/Form';

import { Button } from '~/components/Button';
import Link from 'next/link';
import { useSignIn } from '~/utils/hooks/useRegistration';
import { redirectIfAuthenticated } from '~/utils/session';
import { Feedback } from '~/components/Feedback';
import { STATES } from '~/utils/constants/signin-states';

function SignIn() {
  const { isFilledIn, setPassword, setEmail, error, signIn, signingIn } =
    useSignIn();
  const router = useRouter();

  return (
    <>
      <div className="max-w-[500px] m-auto p-15">
        <h2 className="text-center pb-8 font-bold text-3xl">Sign In</h2>
        <h3 className="text-center text-2xl font-bold my-4">Social</h3>
        <GithubLoginButton />
        <h3 className="text-center text-2xl font-bold my-4">
          Username & Password
        </h3>
        <form onSubmit={(e) => signIn(e, router)}>
          {router.query.state === STATES.PASSWORD_UPDATED ? (
            <Feedback
              variant="warning"
              message="Please sign in with your new password"
            />
          ) : null}
          <div className="mb-6">
            <Input
              label="Your Email"
              type="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-12">
            <Input
              label="Your Password"
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Feedback variant="error" message={error} />}
          </div>

          <Button disabled={!isFilledIn()} type="submit" loading={signingIn}>
            Login
          </Button>
        </form>
      </div>
      <Button variant="secondary" className="mt-6" href="/auth/signup">
        Sign Up
      </Button>
      <Link
        href="/auth/forgot-password"
        className="block mt-2 text-center text-opacity-50 hover:text-opacity-100 text-white disabled:opacity-50"
      >
        Forgot your password
      </Link>
    </>
  );
}
export const getServerSideProps = redirectIfAuthenticated;

export default SignIn;
