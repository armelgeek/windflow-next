import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { auth } from '@/auth';
import { kAppName } from '@/core/domain/constants/app.constant';
import { AppHeader } from '@/shared/components/molecules/layout/app-header';
import { AccountNav } from '@/shared/components/molecules/navs/account-nav';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session!.user;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="gap-6 container mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="flex flex-col gap-6">
          <Card className="border-0 shadow-sm bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <div className="p-6">
              <AppHeader
                title={
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-offset-background ring-primary/10">
                      <AvatarImage
                        src={user.image ?? ""}
                        alt={user.username ?? user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/5">
                        <UserIcon className="h-6 w-6 text-primary/70" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-0.5">
                      <h1 className="text-xl font-semibold tracking-tight">
                        {user.name}
                      </h1>
                      <h5 className="text-sm text-muted-foreground">
                        @{user.username ?? "anon"}
                      </h5>
                    </div>
                  </div>
                }
              />
            </div>

            <AccountNav className="px-2 pb-2" />
          </Card>

          <main className="flex-1">
            {children}
          </main>
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-14">
            <ScrollArea className="h-[calc(100vh-7rem)] pr-4">
              <Card className="border-0 shadow-sm bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50">
                {/* Sidebar content goes here */}
              </Card>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
