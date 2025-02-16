"use client";

import type { FC, MouseEvent } from "react";

import { useLocale } from "next-intl";
import Link from "next/link";
import { Fragment, useState } from "react";
import { labels, Locale, localeFlags } from '@/i18n/locales';
import { routing, usePathname } from '@/i18n/routing';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const TRANSLATED = "⚙️ Translated";
const NATIVE = "⚙️ Native";
const LANGUAGE_LABEL = "Language";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [translateLanguages, setTranslateLanguages] = useState(true);

  const filteredLocales = routing.locales.filter(
    (currentLocale: Locale) => currentLocale !== locale,
  );

  const toggleTranslation = (event_: MouseEvent) => {
    event_.preventDefault();
    setTranslateLanguages(!translateLanguages);
  };

  const getPathWithoutLocale = () => {
    const regex = new RegExp(`^/(${routing.locales.join("|")})`);
    // Remove the locale part from the current pathname
    return pathname.replace(regex, "");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "outline",
          }),
          "font-twemoji",
        )}
      >
        <span className="sr-only">Language Switcher</span>
        <LocaleNames
          currentLocale={locale}
          translateLanguages={translateLanguages}
          displayOnlyFlag={true}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{LANGUAGE_LABEL}</DropdownMenuLabel>

        {filteredLocales.map((currentLocale, index) => (
          <Fragment key={index}>
            <Link
              href={`/${currentLocale}${getPathWithoutLocale()}`}
              locale={currentLocale}
            >
              <DropdownMenuItem className="font-twemoji flex cursor-pointer items-center justify-start">
                <LocaleNames
                  currentLocale={currentLocale}
                  translateLanguages={translateLanguages}
                  displayOnlyFlag={false}
                />
              </DropdownMenuItem>
            </Link>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const determinateLocaleLabels = (translateLanguages: boolean) => {
  if (translateLanguages) {
    return {
      de: "Deutsch",
      en: "English",
      es: "Español",
      fr: "Français",
      hi: "हिन्दी",
      it: "Italiano",
      ms: "Melayu",
      pl: "Polski",
      tr: "Türkçe",
      uk: "Українська",
      zh: "中文",
    } as const;
  }

  return labels;
};

type LocaleNamesProps = {
  currentLocale: Locale;
  translateLanguages: boolean;
  displayOnlyFlag: boolean;
};

const LocaleNames: FC<LocaleNamesProps> = ({
  currentLocale,
  translateLanguages,
  displayOnlyFlag,
}) => {
  const localeLabels = determinateLocaleLabels(translateLanguages);

  return (
    <div className="flex items-center gap-2">
      {displayOnlyFlag ? (
        <span aria-hidden="true">{localeFlags[currentLocale]}</span>
      ) : (
        <>
          <span aria-hidden="true">{localeFlags[currentLocale]}</span>
          <span>{localeLabels[currentLocale]}</span>
        </>
      )}
    </div>
  );
};
