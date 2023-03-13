import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Logo } from './Logo';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Header = () => {
  const { pathname } = useRouter();
  const session = useSession();

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b border-neutral-200 overflow-hidden"
    >
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <Logo width="140" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className={classNames(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2',
                      pathname === '/'
                        ? 'border-logoGreen text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    )}
                  >
                    Home
                  </Link>
                  <Link
                    href="/courses"
                    className={classNames(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2',
                      pathname.includes('/course')
                        ? 'border-logoGreen  text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    )}
                  >
                    Courses
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {session.data?.user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={session.data.user.image as string}
                          alt={session.data.user.name as string}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                signOut({
                                  redirect: true,
                                  callbackUrl: '/',
                                })
                              }
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 w-full text-right',
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link href="/auth/signin" className="underline">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              <Disclosure.Button
                as="a"
                href="#"
                className="block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Courses
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
