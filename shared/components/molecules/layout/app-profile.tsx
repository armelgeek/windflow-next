import React, { ReactNode } from 'react';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  User,
  Shield,
  Bell,
  Briefcase,
  CreditCard,
  ShoppingBag,
  Heart,
  Trash,
  LogOut
} from 'lucide-react';
import SignOutButton from '../../atoms/signout-button';
import Link from 'next/link';
import { EditableProfilePhotoForm } from '../../atoms/editable-profile-photo-form';

const AppProfile = async ({children}: {children: ReactNode}) => {
  const session = await auth.api.getSession({ headers: await headers() });
    if(!session){
        redirect('/login');
    }
  return (
    <div className="px-4 pt-9 sm:px-[2vw] md:px-[4vw] lg:px-[6vw]  border-t">
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
                  <ul>
                    <NavItem href="/account" icon="user" active={false}>
                      My profile
                    </NavItem>

                    <SignOutButton active={false}/>
                  </ul>
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

const NavItem = ({ href, icon, children, active, className = '' }: { href: string; icon: string; children: ReactNode; active: boolean; className?: string }) => {
  const baseClasses = "flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 rounded-md";
  const activeClasses = active ? "bg-primary-50 text-primary-600" : "";
  
  return (
    <li>
      <Link 
        href={href}
        className={`${baseClasses} ${activeClasses} ${className}`}
      >
        <span className="w-5 h-5 mr-2">
          {getIcon(icon)}
        </span>
        {children}
      </Link>
    </li>
  );
};

const getIcon = (name: string) => {
  const icons = {
    user: <User size={18}/>,
    shield: <Shield size={18}/>,
    bell: <Bell size={18}/>,
    briefcase: <Briefcase size={18}/>,
    "credit-card": <CreditCard size={18}/>,
    "shopping-bag": <ShoppingBag size={18}/>,
    heart: <Heart size={18}/>,
    trash: <Trash size={18}/>,
    logout: <LogOut size={18}/>
  };
  
  return icons[name as keyof typeof icons] || null;
};

export default AppProfile;