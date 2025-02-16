"use client";

import { useSelectedLayoutSegment } from "next/navigation";



import { SettingsIcon } from "lucide-react";



import { cn } from '@/shared/lib/utils';
import { HomeIcon } from '@radix-ui/react-icons';
import { Link } from '@/i18n/routing';





type Props = { className?: string };

export function AccountNav({ className }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={cn('sticky top-14 z-10 flex items-center border-b bg-background', className)}>


      <Link
        href={`/account`}
        className={cn(
          'flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm transition-colors',
          segment === '' ? 'border-b-primary' : 'border-b-transparent',
        )}
      >
        <HomeIcon className="size-4" />
        Accueil
      </Link>
      <Link
        href={`/account/settings`}
        className={cn(
          'flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm transition-colors',
          segment === 'settings' ? 'border-b-primary' : 'border-b-transparent',
        )}
      >
        <SettingsIcon className="size-4" />
        Settings
      </Link>
    </div>
  );
}
