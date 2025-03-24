import React from 'react';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { UserAvatar } from '@/shared/components/atoms/user-avatar';
import Link from 'next/link';
import { AppLogo } from '@/shared/components/atoms/app-logo';
import AppFooter from '@/shared/components/atoms/app-footer';
import AppNav from '@/shared/components/molecules/layout/app-nav';
import AppClientMenu from '@/shared/components/molecules/layout/app-client-menu';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <AppClientMenu />
      <main>
        {children}
      </main>
      {/**<AppFooter/>**/}
    </div>
  );
}
