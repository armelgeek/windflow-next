import {
  createLoader,
  createSerializer,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

export const projectSearchParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  sortBy: parseAsString.withDefault(''),
  sortDir: parseAsString.withDefault('')
};

export const loadSearchParams = createLoader(projectSearchParams);
export const serializeSearchParams = createSerializer(projectSearchParams);
