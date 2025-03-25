import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from '@/shared/providers';
import NextTopLoader from 'nextjs-toploader';
import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import {  Outfit } from 'next/font/google';
interface RootLayoutProps {
  readonly children: React.ReactNode;
}
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <html lang="en" className={`${outfit.className}`} suppressHydrationWarning>
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <NextTopLoader showSpinner={true} />
        <Provider>
              {children}
        </Provider>
        <Toaster richColors />
      </body>
    </html>
  );
}
