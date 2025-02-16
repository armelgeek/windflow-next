"use client";
import { useTranslations } from 'use-intl';

export default function Home() {
  const t = useTranslations('home');
  return (
    <div>
      <div>{t('title')}</div>
    </div>
  );
}
