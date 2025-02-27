import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { auth } from '@/auth';
import AppProfile from "@/shared/components/molecules/layout/app-profile";
import { kAppName } from "@/shared/lib/constants/app.constant";

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
