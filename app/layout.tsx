import type { Metadata } from "next";
import { CartProvider } from "@/components/cart";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialLogo = siteUrl ? new URL("/brand/sutra-logo.jpg", siteUrl).toString() : undefined;
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Sutra",
      description: "Handwoven sarees and everyday drapes, crafted in India.",
      telephone: "+919019181160",
      sameAs: ["https://www.instagram.com/thesutraasarees/"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560076",
        addressCountry: "IN",
      },
      ...(siteUrl ? { url: siteUrl, logo: socialLogo } : {}),
    },
    {
      "@type": "WebSite",
      name: "Sutra Sarees",
      inLanguage: "en-IN",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Handwoven Sarees in Bengaluru | Sutra",
    template: "%s | Sutra Sarees",
  },
  description:
    "Explore Sutra's handwoven silk and everyday sarees, shaped by Indian craft and modern elegance. Browse the collection and enquire on WhatsApp.",
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/brand/sutra-mark.svg", type: "image/svg+xml" }],
    shortcut: "/brand/sutra-mark.svg",
    apple: "/brand/sutra-logo.jpg",
  },
  openGraph: {
    title: "Handwoven Sarees in Bengaluru | Sutra",
    description: "Sarees with a modern soul, woven to carry the beauty of timeless stories.",
    siteName: "Sutra",
    type: "website",
    locale: "en_IN",
    ...(siteUrl ? { url: siteUrl } : {}),
    ...(socialLogo ? { images: [{ url: socialLogo, width: 1254, height: 1254, alt: "Sutra — Weaving Timeless Stories" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Handwoven Sarees in Bengaluru | Sutra",
    description: "Sarees with a modern soul, woven to carry the beauty of timeless stories.",
    ...(socialLogo ? { images: [socialLogo] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
