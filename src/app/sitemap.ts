import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lugari.ke';

  const routes = [
    '',
    '/projects',
    '/data/projects',
    '/opportunities',
    '/education',
    '/schools',
    '/businesses',
    '/marketplace',
    '/agriculture',
    '/talent',
    '/events',
    '/news',
    '/report',
    '/community/issues',
    '/public-participation',
    '/commitments',
    '/leadership',
    '/access/ussd',
    '/privacy',
    '/corrections',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const wardRoutes = ['mautuma', 'lumakanda', 'lugari', 'chekalini', 'chevaywa', 'lwandeti'].map(ward => ({
    url: `${baseUrl}/wards/${ward}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...routes, ...wardRoutes];
}
