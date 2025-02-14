import { useEffect, useState } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface UseTableStateProps<T> {
  queryKey: (params: QueryParams) => readonly string[];
  queryFn: (params: QueryParams) => Promise<T>;
}


interface QueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
  status?: string[];
}

interface UseTableStateReturn<T> {
  // State
  search: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  status: string[] | null;
  filter: ColumnFiltersState;

  data: T | undefined | null;
  isPending: boolean;
  isError: boolean;

  setSearch: (value: string | null) => void;
  setPage: (value: number | null) => void;
  setPageSize: (value: number | null) => void;
  setSortBy: (value: string | null) => void;
  setSortDir: (value: string | null) => void;
  setStatus: (value: string[] | null) => void;
  handleFilterChange: (filters: ColumnFiltersState) => void;
}

export function useAdvancedTable<T>({ queryKey, queryFn }: UseTableStateProps<T>): UseTableStateReturn<T> {

  const [search, setSearch] = useQueryState('q', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(10));
  const [sortBy, setSortBy] = useQueryState('sortBy', { defaultValue: '' });
  const [sortDir, setSortDir] = useQueryState('sortDir', { defaultValue: '' });
  const [status, setStatus] = useQueryState('status', parseAsArrayOf(parseAsString));

  const [filter, setFilter] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    if (status) {
      newFilters.push({ id: 'status', value: status });
    }

    setFilter(newFilters);
  }, [status]);

  const queryParams = {
    ...(search && { search }),
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(sortBy && { sortBy }),
    ...(sortDir && { sortDir }),
    ...(status && { status }),
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const queryP = [...queryKey, queryParams];
  const { data, isPending, isError } = useQuery({
    queryKey: queryP,
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
  });

  const handleFilterChange = (filters: ColumnFiltersState) => {
    setFilter(filters);

    const statusFilter = filters.find((f) => f.id === 'status')?.value as string[] | undefined;
    setStatus(statusFilter || null);
  };

  return {
    search,
    page,
    pageSize,
    sortBy,
    sortDir,
    status,
    filter,
    data,
    isPending,
    isError,
    setSearch,
    setPage,
    setPageSize,
    setSortBy,
    setSortDir,
    setStatus,
    handleFilterChange,
  };
}
