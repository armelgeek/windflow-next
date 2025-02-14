"use client";
import { ReactNode } from "react";
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

type Props = { title?: ReactNode; className?: string; children?: ReactNode };

export function AppHeader({ title, className, children }: Props) {

  return (
    <div
      className={cn(
        "flex gap-4 items-center",
        children ? "justify-between" : "justify-start",
        className
      )}
    >
    <Link href='/'>
      {typeof title === "string" ? (
            <h1 className="flex-1 text-xl">{title}</h1>
          ) : (
            title
          )}
    </Link>
      {children}
    </div>
  );
}
