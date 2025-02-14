import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { fontMap } from '@/shared/lib/utils/font';
import { Provider } from '@/shared/providers';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { UserAvatar } from '@/shared/components/molecules/user-avatar';
import Link from 'next/link';
import { AppLogo } from '@/shared/components/molecules/layout/app-logo';
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const inter = fontMap['inter'].next;
  const session = await auth.api.getSession({ headers: await headers() });


  return (
    <html lang="en">
      <body className={`${inter.variable} r font-sans antialiased`}>

        <Provider>
          <header className="z-10 flex sticky top-0 bg-background h-14 shrink-0 items-center gap-2 border-b px-4 justify-between">
            <div className="flex gap-1 sm:gap-2 md:gap-3 items-center">
             <AppLogo/>
            </div>
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
        </Provider>
        <Toaster richColors />
      </body>
    </html>
  );
}
