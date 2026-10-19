# Sutra Sarees

A Next.js storefront inspired by the current Sutra Wix site. The catalog uses a public Google Sheets CSV feed when configured and falls back to the included sample data if the feed is missing or unavailable.

## Getting started

```bash
npm install
npm run dev
```

## Google Sheets catalog

Use [`sutra-catalog-template.xlsx`](./sutra-catalog-template.xlsx) as a blank template. The current nine-product update is in [`sutra-catalog-update.xlsx`](./sutra-catalog-update.xlsx), with the codebase backup in [`data/catalog.json`](./data/catalog.json). Import the update workbook into Google Sheets, keep the first tab named `Products`, and add one product per row for future edits.

1. Upload product photos to Drive. Set each photo's general access to “Anyone with the link - Viewer,” then paste its share URL or file ID into `image`. Private Drive photos cannot appear on the public storefront.
2. Make the sheet viewable to the storefront (for example, publish the `Products` tab as CSV, or grant public viewer access).
3. Put either the published CSV URL or the Google Sheets edit URL in `GOOGLE_SHEET_CSV_URL` in `.env.local`. Edit URLs are converted to the read-only CSV export endpoint automatically (the first tab is used unless the URL includes a `gid`). The site refreshes the feed every five minutes and keeps its sample catalog if the sheet is unavailable.
4. Set `NEXT_PUBLIC_WHATSAPP_PHONE` to the business WhatsApp number in international format, digits only. Product “Buy now” opens a prefilled enquiry for that item. The bag keeps selected products in the browser and opens a single WhatsApp message with quantities and an estimated total.
5. Before launch, set `NEXT_PUBLIC_SITE_URL` to the production origin (for example, `https://sutra.example`). It supplies the canonical URL, sitemap, and absolute social preview image URLs. The cropped needle-and-thread mark is already set for the browser tab and site header.

The first row must contain these columns (header spacing, hyphens, and underscores are ignored):

| Column | Required | Example |
| --- | --- | --- |
| `id` | No | `midnight-silk-weave` |
| `name` | Yes | `Midnight Silk Weave` |
| `category` | No | `Timeless Sarees`, `Luxury Fabrics`, or `Saree Accessories` |
| `price` | Yes | `250` or `₹250` |
| `subtitle` | No | `Pure silk · Zari border` |
| `description` | No | `A deep navy silk saree with a zari border.` |
| `image` | No | Public image URL or Drive share link/file ID; missing or broken images use the local Sutra placeholder |
| `material` | No | `Pure mulberry silk` |
| `color` | No | `Midnight blue` |
| `care` | No | `Dry clean only` |
| `options` | No | `Length: 5.5 Meters|6.5 Meters; Border Finish: Antique Gold|Rose Gold` |
| `available` | No | `yes` or `no`; blank means available |

Categories can be `Timeless Sarees`, `Luxury Fabrics`, or `Saree Accessories` (short forms `Sarees`, `Fabrics`, and `Accessories` also work). Keep `price` numeric, without a currency symbol if possible. Options are separated by semicolons; each option uses `Name: Value|Value`. The catalog accepts Drive `/file/d/.../view` share URLs and converts them to image URLs. If a photo is unavailable or broken, the card uses the local textile placeholder.

## Visual reference

The storefront carries forward the Wix site's ivory `#FFFAF1`, burgundy `#760813`, ink `#3C1116`, and warm brass accents. The original home-page hero, lookbook imagery, product names, descriptions, prices, options, contact location, and two journal headlines were captured from the public Sutra Wix site on 13 October 2026.
