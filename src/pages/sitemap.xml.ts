import type { APIRoute } from 'astro';
import { SAAS_PRODUCTS } from '../data/products';
import { COUNTRIES } from '../data/countries';
import { SUPPORTED_LANGUAGES, getLocalizedPath } from '../i18n/translations';

const BASE_URL = 'https://saas-pricing-global.pages.dev';

export const GET: APIRoute = async () => {
  const urls: { loc: string; changefreq: string; priority: string }[] = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    const lCode = lang.code;

    // Homepage
    urls.push({
      loc: `${BASE_URL}${getLocalizedPath('/', lCode)}`,
      changefreq: 'daily',
      priority: lCode === 'en' ? '1.0' : '0.9',
    });

    // Guide page
    urls.push({
      loc: `${BASE_URL}${getLocalizedPath('/guide', lCode)}`,
      changefreq: 'weekly',
      priority: '0.8',
    });

    // Product pricing hubs & cheapest pages
    for (const prod of SAAS_PRODUCTS) {
      urls.push({
        loc: `${BASE_URL}${getLocalizedPath(`/${prod.id}/pricing`, lCode)}`,
        changefreq: 'weekly',
        priority: '0.9',
      });

      urls.push({
        loc: `${BASE_URL}${getLocalizedPath(`/cheapest-country-to-buy-${prod.id}`, lCode)}`,
        changefreq: 'weekly',
        priority: '0.85',
      });

      // Country specific price pages
      const primaryPlan = prod.plans[0];
      for (const country of Object.values(COUNTRIES)) {
        if (primaryPlan.prices[country.code] !== undefined) {
          const countrySlug = country.name.toLowerCase().replace(/\s+/g, '-');
          urls.push({
            loc: `${BASE_URL}${getLocalizedPath(`/${prod.id}/price-in-${countrySlug}`, lCode)}`,
            changefreq: 'monthly',
            priority: '0.7',
          });
        }
      }
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
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

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
