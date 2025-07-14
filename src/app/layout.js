import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Spice Direct WholeSale",
  description: "Best wholesale food supplier in glasgow, UK. Competitive Prices, Good Quality",
  keywords: ['wholesale food', 'spices', 'grocery','cheese', 'meat', 'UK supplier'],
  metadataBase: new URL('https://www.spicedirectwholesale.co.uk'),
  alternates: {
    canonical: "/",
  },
  openGraph:{
    title: "Spice Direct Wholesale",
    description:"Best wholesale food supplier in glasgow, UK. Competitive Prices, Good Quality",
    url:"https://www.spicedirectwholesale.co.uk",
    siteName:"Spice Direct Wholesale",
    images:[{url:"/spice_direct_wholesale.jpg", width:1200, height:630}],
    locale:"en_UK",
    type:"website"
  },
  twitter:{
    card:"summary_large_image",
    title:"Spice Direct Wholesale",
    description:"Best wholesale food supplier in glasgow, UK. Competitive Prices, Good Quality",
    images:["/spice_direct_wholesale.jpg"]
  },
  robots:{
    index:true,
    follow:true,
    nocache:false,
    googleBot:{index:true,follow:true,noimageindex:false},
  },
  icons:{
    icon:[{url:"/favicon.ico"},
    {url:"/favicon-16x16.png", sizes: '16x16', type: 'image/png'},
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
    { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },],
    apple: [{url: "/apple-touch-icon.png"}],
    shortcut: [{ url: "/site.webmanifest", type: "application/manifest+json" }]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </head>
      <body className={inter.className}>   
        <StoreProvider>
        {children}
        </StoreProvider>       
      </body>
    </html>
  );
}
