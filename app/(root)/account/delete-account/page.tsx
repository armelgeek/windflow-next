import { auth } from "@/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteAccount } from "@/features/auth/components/organisms/delete-account-form";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = { title: "Delete Account" };

export default async function Page() {
    const session = await auth.api.getSession({ headers: await headers() });
    return (
        <>
            {!session?.user.isAnonymous && (
                <Card className="border-destructive/20  from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                    <CardHeader className="border-b border-destructive/20">
                        <CardTitle className="text-xl text-destructive flex items-center">
                            <AlertTriangle className="mr-2" />
                            Danger Zone
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/30 shadow-inner">
                            <div className="space-y-2 mb-4 sm:mb-0">
                                <h3 className="text-lg font-semibold text-destructive">Delete Account</h3>
                                <p className="text-sm text-destructive/80">
                                    This action is irreversible. All your data will be permanently deleted.
                                </p>
                            </div>
                            <DeleteAccount />
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
}