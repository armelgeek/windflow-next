'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BookAIcon, BookTemplateIcon, List, LucideArchive } from 'lucide-react';

export const NavItem = ({
  href,
  children,
  active,
  className = '',
}: {
  href: string;
  children: ReactNode;
  active: boolean;
  className?: string;
}) => {
  const baseClasses = 'flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 rounded-md';
  const activeClasses = active ? 'bg-gray-200 text-gray-800' : '';
  return (
    <li>
      <Link
        href={href}
        className={`${baseClasses} ${activeClasses} ${className}`}
      >
        {children}
      </Link>
    </li>
  );
};

const ProjectNav = () => {
  const pathname = usePathname();
  return (
    <div>
      <ul className="my-2 flex flex-col space-y-3">
        <NavItem
          href="/account/projects"
          active={pathname === '/account/projects'}
        >
          <LucideArchive
            size={18}
            className="mr-2"
          />
          Projects
        </NavItem>
        <NavItem
          href="/account/templates"
          active={pathname === '/account/templates'}
        >
          <BookTemplateIcon
            size={18}
            className="mr-2"
          />
          Templates
        </NavItem>
      </ul>
    </div>
  );
};

export default ProjectNav;
