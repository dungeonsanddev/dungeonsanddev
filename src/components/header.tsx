import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const Header = () => {
  const { data: session } = useSession();
  return (
    <header>
      <ul className="flex gap-4 max-w-[80%] w-7xl mx-auto">
        <li>
          <Link href="/" className="underline">
            Home
          </Link>
        </li>
        {session?.user ? (
          <>
            <Link href="/create-post" className="underline">
              Create Post
            </Link>
            <button
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: '/',
                })
              }
              className="underline"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/auth/signin" className="underline">
            Sign In
          </Link>
        )}
      </ul>
    </header>
  );
};
