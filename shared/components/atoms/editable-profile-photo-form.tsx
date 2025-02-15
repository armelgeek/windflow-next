"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from '@/shared/lib/utils';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { authClient } from '@/auth-client';

type Props = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  disabled?: boolean | null;
  label?: string;
  photoUrl?: string | null;
  onPhotoChange?: (url: string) => void;
};

export function EditableProfilePhotoForm({
                                           className,
                                           photoUrl: initialPhotoUrl,
                                           label,
                                           disabled,
                                           ...form
                                         }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);


  const updateAvatar = async (url: string) => {
    try {
      setIsLoading(true);
      setPhotoUrl(url);
      await authClient.updateUser({
        image: url
      });

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form {...form} className={cn("flex flex-col items-center gap-2", className)}>
      <Label className="text-muted-foreground text-xs leading-none">
        {label ?? "Profile Photo"}
      </Label>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn(
          "w-24 h-24 rounded-full overflow-hidden border-2 border-input",
          !disabled && "hover:border-primary cursor-pointer",
          isLoading && "opacity-50"
        )}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              width={32}
              height={32}
              className="w-[80px] h-[80px]"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {!disabled && isHovered && !isLoading && (
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center gap-2">
              <UploadButton<OurFileRouter, 'imageUploader'>
                endpoint={'imageUploader'}
                onUploadBegin={() => {
                  setIsLoading(true);
                }}
                onClientUploadComplete={async (res: { url: string }[]) => {
                  if (res?.[0]) {
                    await updateAvatar(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error(error);
                  setIsLoading(false);
                }}
                className="ut-button:bg-transparent ut-button:text-white ut-button:border-0 ut-button:shadow-none ut-button:p-0"
              />

              {photoUrl && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await updateAvatar('');
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
