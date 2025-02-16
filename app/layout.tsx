import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { fontMap } from '@/shared/lib/utils/font';
import { Provider } from '@/shared/providers';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const inter = fontMap['inter'].next;

  return (
    <html lang="en">
      <body className={`${inter.variable} r font-sans antialiased`}>
        <Provider>
              {children}
        </Provider>
        <Toaster richColors />
      </body>
    </html>
  );
}
