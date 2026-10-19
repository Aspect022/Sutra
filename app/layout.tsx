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
      email: "thesutraasarees@gmail.com",
      description: "Handwoven sarees and everyday drapes, crafted in India.",
      telephone: "+916361312135",
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
    default: "Sutra - Weaving Timeless Stories",
    template: "%s | Sutra Sarees",
  },
  description:
    "Sutra - Weaving Timeless Stories. Discover handwoven silk sarees and everyday drapes shaped by Indian craft and modern elegance.",
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
    title: "Sutra - Weaving Timeless Stories",
    description: "Discover handwoven silk sarees and everyday drapes shaped by Indian craft and modern elegance.",
    siteName: "Sutra",
    type: "website",
    locale: "en_IN",
    ...(siteUrl ? { url: siteUrl } : {}),
    ...(socialLogo ? { images: [{ url: socialLogo, width: 1254, height: 1254, alt: "Sutra - Weaving Timeless Stories" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Sutra - Weaving Timeless Stories",
    description: "Discover handwoven silk sarees and everyday drapes shaped by Indian craft and modern elegance.",
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
