import React from 'react';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { UserAvatar } from '@/shared/components/molecules/user-avatar';
import Link from 'next/link';
import { AppLogo } from '@/shared/components/molecules/layout/app-logo';
import AppFooter from '@/shared/components/molecules/layout/app-footer';
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  const session = await auth.api.getSession({ headers: await headers() });


  return (
    <div  className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <header  className="flex items-center justify-between py-5 font-medium">
            <div className="flex gap-1 sm:gap-2 md:gap-3 items-center">
             <AppLogo/>
            </div>
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
              {[
                { href: "/", label: "HOME" },
                { href: "/collection", label: "COLLECTION" },
                { href: "/about", label: "ABOUT" },
                { href: "/contact", label: "CONTACT" }
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex flex-col items-center gap-1 group">
                    <p>{item.label}</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1 sm:gap-2">
              {session ? (
                <UserAvatar
                  isAnonymous={session.user.isAnonymous ?? false}
                  user={{
                    name: session.user.name,
                    email: session.user.email,
                    avatar: session.user.image,
                  }}
                />
              ) : (
                <Link href="/login" passHref>
                  Sign in
                </Link>
              )}
            </div>
          </header>
          <main>
              {children}
          </main>
          <AppFooter/>
    </div>
  );
}
