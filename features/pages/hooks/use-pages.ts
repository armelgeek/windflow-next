import { useQuery } from '@tanstack/react-query';

import { pageKeys } from '../config/page.key';
import { Filter } from '@/features/auth/config/user.type';
import { PageServiceImpl } from '../domain/page.service';

export const usePages = (params: Filter) => {
  const { data: pages, isLoading } = useQuery({
    queryKey: pageKeys.all,
    queryFn: async () => {
      const response = await new PageServiceImpl().list(params);
      return response?.data.map((page) => ({
        value: page.id,
        label: page.name,
      })) as never[];
    },
  });

  return {
    pages: pages || [],
    isLoading,
  };
};
