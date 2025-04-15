import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Spice Direct WholeSale",
  description: "Best wholesale food provider in glosgow, UK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>   
        <StoreProvider>
        {children}
        </StoreProvider>       
      </body>
    </html>
  );
}
