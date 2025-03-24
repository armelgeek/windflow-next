export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export const API_ENDPOINTS = {
  categories: {
    base: '/categories',
    list: (qs: string) => `/categories${qs}`,
    create: '/categories',
    detail: (slug: string) => `/categories/${slug}`,
    update: (slug: string) => `/categories/${slug}`,
    delete: (slug: string) => `/categories/${slug}`,
  },
  projects: {
    base: '/projects',
    list: (qs: string) => `/projects${qs}`,
    create: '/projects',
    detail: (slug: string) => `/projects/${slug}`,
    update: (slug: string) => `/projects/${slug}`,
    delete: (slug: string) => `/projects/${slug}`,
  },
  pages: {
    base: '/pages',
    list: (qs: string) => `/pages${qs}`,
    create: '/pages',
    detail: (slug: string) => `/pages/${slug}`,
    pagesByProject: (qs: string) => `/pages/projects/${qs}`,
    update: (slug: string) => `/pages/${slug}`,
    delete: (slug: string) => `/pages/${slug}`,
    updateContent: (slug: string) => `/pages/content/${slug}`,
    
  },
  
} as const;
