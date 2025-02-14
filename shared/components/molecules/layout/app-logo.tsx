"use client";

import { cn } from "@/shared/lib/utils";
import { kAppAbbr, kAppName } from "@/core/domain/constants/app.constant";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className={cn("rounded-md size-9")}>
        <AvatarFallback className={cn("rounded-md")}>{kAppAbbr}</AvatarFallback>
      </Avatar>

      <span className="truncate font-semibold text-xl">
        {kAppName.toUpperCase()}
      </span>
    </div>
  );
}
