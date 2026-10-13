#!/usr/bin/env node

/**
 * YouTube Shorts Automation Script Engine
 * Run with: node scripts/generate-shorts.js [product-id]
 */

import { SAAS_PRODUCTS } from '../src/data/products.js';
import { COUNTRIES } from '../src/data/countries.js';
import { calculateNormalizedPrices, formatCurrencyLocal } from '../src/utils/pricing.js';

function generateShortScript(product) {
  const plan = product.plans[0];
  const rankings = calculateNormalizedPrices(plan);
  const cheapest = rankings[0];
  const mostExpensive = rankings[rankings.length - 1];
  const usPrice = rankings.find(r => r.country.code === 'us') || rankings[0];

  const savingsAnnual = ((usPrice.usdPrice - cheapest.usdPrice) * 12).toFixed(0);

  return {
    productId: product.id,
    title: `Why ${product.name} costs $${cheapest.usdPrice.toFixed(2)} vs $${usPrice.usdPrice.toFixed(2)} in the US! #shorts #saas`,
    duration: '30-45 seconds',
    visualTheme: 'High-contrast dark mode with glowing animated stats and flag cards',
    soundtrack: 'Upbeat punchy tech/synth beat',
    sceneBreakdown: [
      {
        timestamp: '0:00 - 0:03',
        visual: `Big text on screen: "STOP paying $${usPrice.usdPrice.toFixed(2)}/mo for ${product.name}!" Cut to ${product.name} logo.`,
        voiceover: `Are you still paying full US price for ${product.name}? You are overpaying by over ${cheapest.differenceVsUSPercent}%.`,
      },
      {
        timestamp: '0:03 - 0:12',
        visual: `Comparison card animation. Left: 🇺🇸 USA $${usPrice.usdPrice.toFixed(2)}. Right: ${cheapest.country.flag} ${cheapest.country.name} $${cheapest.usdPrice.toFixed(2)}.`,
        voiceover: `In the United States, ${product.name} is $${usPrice.usdPrice.toFixed(2)} every single month. But over in ${cheapest.country.name}, the exact same subscription is just ${formatCurrencyLocal(cheapest.localPrice, cheapest.country.currency)} — that is barely $${cheapest.usdPrice.toFixed(2)} US dollars!`,
      },
      {
        timestamp: '0:12 - 0:22',
        visual: `Ranking list pops up showing top 3 cheapest countries: #1 ${cheapest.country.name}, #2 ${rankings[1].country.name}, #3 ${rankings[2].country.name}.`,
        voiceover: `That is an extra $${savingsAnnual} saved in your pocket every single year for the exact same tool. Why? Big tech adjusts their pricing based on Purchasing Power Parity.`,
      },
      {
        timestamp: '0:22 - 0:30',
        visual: `Website screenshot / URL highlight: "saas-pricing-global.pages.dev". CTA arrow pointing to comment/bio link.`,
        voiceover: `Want to see the cheapest country for Netflix, Spotify, Claude, and Canva? Check the live global comparison matrix link in our bio!`,
      }
    ],
    hashtags: ['#saas', '#techhacks', '#productivity', '#digitalnomad', '#pricing', '#techdeals', '#lifehacks']
  };
}

// CLI handler
const targetId = process.argv[2];
if (targetId) {
  const prod = SAAS_PRODUCTS.find(p => p.id === targetId);
  if (!prod) {
    console.error(`Product not found: ${targetId}`);
    process.exit(1);
  }
  console.log(JSON.stringify(generateShortScript(prod), null, 2));
} else {
  console.log("Generating YouTube Shorts script templates for all products...\n");
  const allShorts = SAAS_PRODUCTS.map(generateShortScript);
  console.log(`Generated ${allShorts.length} high-converting YouTube Short scripts ready for delegation.`);
}
