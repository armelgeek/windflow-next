import { UserAvatar } from "../../atoms/user-avatar";
import { AppLogo } from "../../atoms/app-logo";
import AppNav from "./app-nav";
import { auth } from '@/auth';
import { headers } from 'next/headers';
import ThemeToggle from "@/components/ui/theme-toggle";
import Link from "next/link";

const AppClientMenu = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <header className="flex items-center justify-between py-3 font-medium">
            <div className="flex gap-1 sm:gap-2 md:gap-3 items-center">
                <AppLogo />
            </div>
            <AppNav />
            <div className="flex items-center gap-1 sm:gap-2">
                {session ? (
                    <UserAvatar
                        isAnonymous={session.user.isAnonymous ?? false}
                        user={{
                            name: session.user.name,
                            email: session.user.email,
                            avatar: session.user.image,
                        }}
                    />
                ) : (
                    <Link href="/login" passHref>
                        Sign in
                    </Link>
                )}
                <ThemeToggle />
            </div>
        </header>
    );
};
export default AppClientMenu;
