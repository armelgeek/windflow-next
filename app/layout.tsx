import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from '@/shared/providers';
import NextTopLoader from 'nextjs-toploader';
import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import { Lato } from 'next/font/google';
interface RootLayoutProps {
  readonly children: React.ReactNode;
}
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <html lang="en" className={`${lato.className}`} suppressHydrationWarning>
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
