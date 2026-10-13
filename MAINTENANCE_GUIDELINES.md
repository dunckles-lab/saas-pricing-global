# Comprehensive Maintenance & Growth Blueprint (SaaSPriceGlobal)

Dokumen ini adalah pedoman lengkap dan panduan operasional agar website programmatic SEO ini berjalan optimal, bebas error, terus berkembang, dan menghasilkan passive income.

---

## 1. Arsitektur & Teknologi Proyek

* **Framework:** Astro 4.16.18 (Static Site Generator / SSG)
* **Hosting:** Cloudflare Pages (Gratis selamanya, Global CDN, SSL otomatis)
* **Repository GitHub:** `https://github.com/dunckles-lab/saas-pricing-global` (Branch: `main`)
* **Live Domain:** `https://saas-pricing-global.pages.dev`
* **Deploy Hook (cron-job.org):** `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/19ad092f-1964-42f0-a172-a872c5e6cf32`

---

## 2. Hal-Hal Rutin yang Perlu Anda Ketahui & Maintain

### A. Nilai Tukar Mata Uang (FX Rates)
* **File Lokasi:** `src/data/countries.ts`
* **Kapan diupdate?** Setiap 1–3 bulan sekali, atau saat terjadi fluktuasi tajam mata uang negara berkembang (misal TRY, ARS, NGN).
* **Cara kerja:** Nilai `fxRateToUsd` di file tersebut dijadikan acuan konversi otomatis ke USD. 
* **Tindakan Anda:** Cukup minta saya (atau ubah langsung nilai angka kurs di file tsb). Begitu di-push ke GitHub atau di-trigger cronjob, semua halaman ter-update serentak.

### B. Menambah Software / Produk Baru
* **File Lokasi:** `src/data/products.ts`
* Setiap 1 produk baru yang dimasukkan ke array `SAAS_PRODUCTS` akan **otomatis menghasilkan:**
  1. Halaman Hub Matrix (`/[product]/pricing`)
  2. Halaman Ranking Termurah (`/cheapest-country-to-buy-[product]`)
  3. Belasan landing page per negara (`/[product]/price-in-[country]`)
  4. Entri baru di `sitemap.xml` secara otomatis!

### C. Monetisasi (Affiliate Links & Ad Slots)
* Di file `src/layouts/Layout.astro` sudah disiapkan kontainer banner sponsor:
  * Slot Header: `data-ad-slot="AUTO"`
  * Slot Footer: `data-ad-slot="AUTO"`
* **Program Afiliasi Rekomendasi:**
  1. **Virtual Card & Remittance:** Wise, Revolut (untuk user cross-border).
  2. **VPN Services:** NordVPN, Surfshark, ExpressVPN (program komisi 40–100% CPA).
  3. **Direct SaaS Referral:** Notion Partner Program, Canva Affiliate, dll.
  4. **Ad Networks:** Google AdSense (tahap awal), lalu upgrade ke Monumetric atau Mediavine saat traffic mencapai 50k sessions.

---

## 3. Strategi Distribusi YouTube Shorts & Delegasi AI

Kami telah membuatkan engine generator naskah konten viral di:
`scripts/generate-shorts.js`

### Cara Menghasilkan Naskah Konten:
Anda cukup minta ke saya kapan saja di chat:
> *"Buatin naskah YouTube Short untuk Spotify"* atau *"Buatin naskah short untuk ChatGPT Plus"*

Saya akan menghasilkan:
* **Hook 3 detik pertama:** Menghentikan scroll penonton (angka kontras & FOMO).
* **Struktur Naskah Voiceover (30–45 detik):** Format perbandingan harga lokal vs harga US.
* **Petunjuk Visual & Text on Screen:** Arahan transisi card, bendera negara, dan grafik.
* **Call to Action (CTA):** Mengarahkan penonton untuk mengklik link website di komentar/bio channel Anda.

---

## 4. Setup Google Search Console (GSC)

Agar Google segera mengindeks ratusan halaman pSEO ini:
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Tambahkan property baru: `https://saas-pricing-global.pages.dev/`.
3. Verifikasi domain (paling mudah via HTML tag di `Layout.astro` atau DNS Cloudflare).
4. Masuk ke menu **Sitemaps**, masukkan: `sitemap.xml`.
5. Google bot akan otomatis merayapi seluruh landing page per negara.
