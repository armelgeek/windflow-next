import { Metadata } from "next";
import {
  updateEmail,
  updateName
} from './_actions';
import { headers } from "next/headers";
import { auth } from '@/auth';
import { EditableLabelForm } from '@/shared/components/atoms/editable-label-form';
import { ChangePassword } from '@/features/auth/components/organisms/change-password-form';
import { DeleteAccount } from '@/features/auth/components/organisms/delete-account-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditableProfilePhotoForm } from "@/shared/components/atoms/editable-profile-photo-form";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = { title: "Settings" };

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center border-b p-4 mb-2">
              <div className="relative mb-2 inline-block">
                <EditableProfilePhotoForm
                  photoUrl={session?.user?.image ?? undefined}
                />
              </div>
            </div>
            <Label
              className="text-muted-foreground text-sm leading-none"
            >
              Email
            </Label>
            <div
              className="flex flex-row justify-between items-center text-ellipsis overflow-clip"
            >
              <Link href="/account" className="text-sm text-gray-600 hover:text-primary-600">{session?.user.email}</Link>
            </div>
            <div className="my-4 border-b"></div>
            <EditableLabelForm
              disabled={session?.user.isAnonymous}
              action={updateName}
              label="Name"
              value={session?.user.name}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
