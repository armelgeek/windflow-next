import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { auth } from '@/auth';
import { kAppName } from '@/core/domain/constants/app.constant';
import { AccountNav } from '@/shared/components/molecules/navs/account-nav';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileSidebar from "@/shared/components/molecules/layout/app-profile";
import AppProfile from "@/shared/components/molecules/layout/app-profile";

type Props = { children: ReactNode };

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth.api.getSession({ headers: await headers() });
  const pageTitle = session?.user.name ?? "Account";

  return {
    title: {
      template: `%s - ${pageTitle} - ${kAppName}`,
      default: `${pageTitle} - ${kAppName}`,
    },
  };
}

export default async function Layout({ children }: Props) {
  return (
    <AppProfile>
        {children}
    </AppProfile>
  );
}
