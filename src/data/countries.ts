export interface CountryInfo {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

export const COUNTRIES: Record<string, CountryInfo> = {
  us: { code: 'us', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
  id: { code: 'id', name: 'Indonesia', currency: 'IDR', symbol: 'Rp', flag: '🇮🇩' },
  tr: { code: 'tr', name: 'Turkey', currency: 'TRY', symbol: '₺', flag: '🇹🇷' },
  in: { code: 'in', name: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳' },
  br: { code: 'br', name: 'Brazil', currency: 'BRL', symbol: 'R$', flag: '🇧🇷' },
  ar: { code: 'ar', name: 'Argentina', currency: 'ARS', symbol: '$', flag: '🇦🇷' },
  ph: { code: 'ph', name: 'Philippines', currency: 'PHP', symbol: '₱', flag: '🇵🇭' },
  my: { code: 'my', name: 'Malaysia', currency: 'MYR', symbol: 'RM', flag: '🇲🇾' },
  sg: { code: 'sg', name: 'Singapore', currency: 'SGD', symbol: 'S$', flag: '🇸🇬' },
  uk: { code: 'uk', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
  de: { code: 'de', name: 'Germany', currency: 'EUR', symbol: '€', flag: '🇩🇪' },
  au: { code: 'au', name: 'Australia', currency: 'AUD', symbol: 'A$', flag: '🇦🇺' },
  ca: { code: 'ca', name: 'Canada', currency: 'CAD', symbol: 'CA$', flag: '🇨🇦' },
  jp: { code: 'jp', name: 'Japan', currency: 'JPY', symbol: '¥', flag: '🇯🇵' },
  ng: { code: 'ng', name: 'Nigeria', currency: 'NGN', symbol: '₦', flag: '🇳🇬' },
};

// Default exchange rates (USD per unit of currency)
// Formula: USD_value = local_price * USD_RATE
export const FX_RATES_TO_USD: Record<string, number> = {
  USD: 1.0,
  IDR: 0.000063, // ~15,800 IDR / USD
  TRY: 0.029,    // ~34.5 TRY / USD
  INR: 0.012,    // ~84 INR / USD
  BRL: 0.18,     // ~5.6 BRL / USD
  ARS: 0.001,    // ~1,000 ARS / USD
  PHP: 0.017,    // ~58 PHP / USD
  MYR: 0.23,     // ~4.3 MYR / USD
  SGD: 0.76,     // ~1.32 SGD / USD
  GBP: 1.30,
  EUR: 1.09,
  AUD: 0.67,
  CAD: 0.73,
  JPY: 0.0067,   // ~150 JPY / USD
  NGN: 0.00061,  // ~1,650 NGN / USD
};
