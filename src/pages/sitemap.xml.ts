import type { APIRoute } from 'astro';
import { SAAS_PRODUCTS } from '../data/products';
import { COUNTRIES } from '../data/countries';

const BASE_URL = 'https://saas-pricing-global.pages.dev';

export const GET: APIRoute = async () => {
  const urls: { loc: string; changefreq: string; priority: string }[] = [];

  // Home
  urls.push({ loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' });

  // Product hubs & cheapest guides
  for (const product of SAAS_PRODUCTS) {
    urls.push({
      loc: `${BASE_URL}/${product.id}/pricing`,
      changefreq: 'weekly',
      priority: '0.9',
    });
    urls.push({
      loc: `${BASE_URL}/cheapest-country-to-buy-${product.id}`,
      changefreq: 'weekly',
      priority: '0.9',
    });

    // Country pages
    for (const country of Object.values(COUNTRIES)) {
      const countrySlug = country.name.toLowerCase().replace(/\s+/g, '-');
      urls.push({
        loc: `${BASE_URL}/${product.id}/price-in-${countrySlug}`,
        changefreq: 'monthly',
        priority: '0.8',
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
