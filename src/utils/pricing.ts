import { COUNTRIES, FX_RATES_TO_USD, type CountryInfo } from '../data/countries';
import type { SaaSProduct, PlanPricing } from '../data/products';

export interface CountryPriceItem {
  country: CountryInfo;
  localPrice: number;
  usdPrice: number;
  differenceVsUSPercent: number; // e.g. -60 means 60% cheaper than US
}

export function calculateNormalizedPrices(plan: PlanPricing): CountryPriceItem[] {
  const usPrice = plan.prices['us'] || 1;
  const items: CountryPriceItem[] = [];

  for (const [code, localPrice] of Object.entries(plan.prices)) {
    const country = COUNTRIES[code];
    if (!country) continue;

    const rate = FX_RATES_TO_USD[country.currency] || 1;
    const usdPrice = localPrice * rate;
    const differenceVsUSPercent = Math.round(((usdPrice - usPrice) / usPrice) * 100);

    items.push({
      country,
      localPrice,
      usdPrice: Math.round(usdPrice * 100) / 100,
      differenceVsUSPercent,
    });
  }

  // Sort cheapest to most expensive
  return items.sort((a, b) => a.usdPrice - b.usdPrice);
}

export function formatCurrencyLocal(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: amount > 1000 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}
