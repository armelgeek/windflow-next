import React, { ReactNode } from 'react';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import AppProfileNav from './app-profile-nav';
import SignOutButton from '../../atoms/signout-button';
import ProjectNav from './projects-nav';

const AppProfile = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect('/login');
  }


  return (
    <div className="px-4 pt-9 sm:px-[2vw] md:px-[4vw] lg:px-[6vw] border-t">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-1/4">
          <div className="flex-col p-3 xl:p-0">
            <div className={`flex flex-col gap-1 group`}>
              <p className='font-medium text-md uppercase text-gray-500'>Personal information</p>
              <hr className="border-t transition-opacity duration-300 opacity-100 group-hover:opacity-100" />
            </div>
            <div className="h-full py-4" tabIndex={-1}>
              <AppProfileNav />
            </div>
            <div className={`flex flex-col mb-2 gap-1 group`}>
              <p className='font-medium text-md uppercase text-gray-500'>Projects</p>
              <hr className="border-t transition-opacity duration-300 opacity-100 group-hover:opacity-100" />
            </div>
            <ProjectNav />
            <div className={`flex flex-col mb-2 gap-1 group`}>
              <p className='font-medium text-md uppercase text-gray-500'>Settings</p>
              <hr className="border-t transition-opacity duration-300 opacity-100 group-hover:opacity-100" />
            </div>

            <SignOutButton active={false} />
          </div>
        </div>
        <div className="xl:w-3/4">
          {children}
        </div>
      </div>
    </div>
  );
};


export default AppProfile;