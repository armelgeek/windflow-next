import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import SearchInput from '@/components/ui/search-input';
import ThemeToggle from '@/components/ui/theme-toggle';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { UserNav } from './user-nav';
import { Separator } from '@/components/ui/separator';

export default async function Header() {
  const session  = await auth.api.getSession({headers: await headers()});
  return (
    <header className='flex py-2 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
       
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav session={session} />
        <ThemeToggle />
      </div>
    </header>
  );
}
