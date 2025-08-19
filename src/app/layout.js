import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "./StoreProvider";
import Script from "next/script";
import { startCronJobs } from "@/lib/crobjob";

export const metadata = {
  title: "Spice Direct WholeSale",
  description: "Best wholesale food supplier in glasgow, UK. Competitive Prices, Good Quality",
  keywords: ['wholesale food', 'spices', 'grocery', 'cheese', 'meat', 'UK supplier', 'spice direct', 'wholefood'],
  metadataBase: new URL('https://www.spicedirectwholesale.co.uk'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spice Direct Wholesale",
    description: "Best wholesale food supplier in glasgow, UK. Competitive Prices, Good Quality",
    url: "https://www.spicedirectwholesale.co.uk",
    siteName: "Spice Direct Wholesale",
    images: [{ url: "/spice_direct_wholesale.jpg", width: 1200, height: 630 }],
    locale: "en_UK",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Spice Direct Wholesale",
    description: "Best wholesale food supplier in glasgow, UK. Competitive Prices, Good Quality",
    images: ["/spice_direct_wholesale.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: { index: true, follow: true, noimageindex: false },
  },
  icons: {
    icon: [{ url: "/favicon.ico" },
    { url: "/favicon-16x16.png", sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: [{ url: "/site.webmanifest", type: "application/manifest+json" }]
  }
};
startCronJobs();
export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Spice Direct Wholesale",
    "url": "https://www.spicedirectwholesale.co.uk",
    "logo": "https://www.spicedirectwholesale.co.uk/spice-direct-wholesale.jpg",
    "image": "https://www.spicedirectwholesale.co.uk/spice_direct_wholesale.jpg",
    "email": "Orders@spicedirectwholesale.co.uk",
    "founder": {
      "@type": "Person",
      "name": "Hessan"
    },
    "sameAs": [
      "https://www.facebook.com/spicedirectglasgow/",
      "https://www.instagram.com/spicedirect18/"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+44-141-5303120",
    }],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "225 Bernard Street",
      "addressLocality": "Glasgow",
      "postalCode": "G40 3NX",
      "addressCountry": "UK"
    },
    "openingHours": [
      "Mo-Fr 08:00-20:00",
      "Sa 08:00-16:00",
      "Su 11:00-20:00"
    ],
    "priceRange": "££",
    "telephone": "+44-141-5303120",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.84869,
      "longitude": -4.21531,
    }
  };
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L2263JXSCK" strategy = "afterInteractive"/>
        <Script id="google-analytics" strategy = "afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-L2263JXSCK');
          `}
        </Script>

      </head>
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
