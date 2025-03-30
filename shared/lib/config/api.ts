export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

const createResourceEndpoints = (resource: string) => ({
  base: `/${resource}`,
  list: (qs: string) => `/${resource}${qs}`,
  create: `/${resource}`,
  detail: (slug: string) => `/${resource}/${slug}`,
  update: (slug: string) => `/${resource}/${slug}`,
  delete: (slug: string) => `/${resource}/${slug}`,
});

export const API_ENDPOINTS = {
  categories: createResourceEndpoints('categories'),
  projects: createResourceEndpoints('projects'),
  pages: {
    ...createResourceEndpoints('pages'),
    pagesByProject: (qs: string) => `/pages/projects/${qs}`,
    updateById: (id: string) => `/pages/update/${id}`,
    updateContent: (slug: string) => `/pages/content/${slug}`,
  },
  templates: {
    ...createResourceEndpoints('templates'),
    byUsers: (userId: string) => `/templates/user/${userId}`,
    removeFromUser: (userId: string, templateId: string) => `/templates/user/${userId}/${templateId}`,
    use: '/templates/use'
  }
} as const;