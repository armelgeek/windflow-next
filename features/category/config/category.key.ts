import { createQueryKeys } from '@/shared/lib/utils/query-keys';

export const categoryKeys = createQueryKeys({
  entity: 'category',
  subEntity: 'subcategory'
});

// You can extend with additional custom keys if needed
// export const extendedCategoryKeys = {
//   ...categoryKeys,
//   customKey: (param: string) => [...categoryKeys.all, 'custom', param] as const,
// };
