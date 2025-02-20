import React, { ReactNode } from 'react';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import Link from 'next/link';
import { EditableProfilePhotoForm } from '../../atoms/editable-profile-photo-form';
import AppProfileNav from './app-profile-nav';

const AppProfile = async ({children}: {children: ReactNode}) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if(!session){
    redirect('/login');
  }
  

  return (
    <div className="px-4 pt-9 sm:px-[2vw] md:px-[4vw] lg:px-[6vw] border-t">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-1/4">
          <div className="flex-col p-3 xl:p-0">
            <div className="h-full" tabIndex={-1}>
              <div className="border rounded-lg p-3 w-full">
                <div className="text-center border-b p-4">
                  <div className="relative mb-2 inline-block">
                    <EditableProfilePhotoForm
                      photoUrl={session?.user?.image ?? undefined}
                    />
                  </div>
                  <h6 className="mb-0 font-medium">{session?.user.name}</h6>
                  <Link href="/account" className="text-sm text-gray-600 hover:text-primary-600">{session?.user.email}</Link>
                </div>
                <div className="mt-4">
                  <AppProfileNav/>
                </div>
              </div>
            </div>
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