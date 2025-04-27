import React from 'react';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
