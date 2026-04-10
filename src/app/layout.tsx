import type { Metadata } from "next";
import {karla, crimsonText} from "@/utils/fonts";
import "./globals.css";
import AutoRefresh from "./AutoRefresh";
import Script from "next/script";
import { createPageMetadata } from "@/utils/metadataHelper";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = createPageMetadata(
  "Sherif's blog", 
  "A blog about startups, management, and engineering.", 
  "https://sherifnada.com", 
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AutoRefresh>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme) {
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } else {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.toggle('dark', prefersDark);
                }
              })();
            `
          }} />
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-CCESVCHGX6"></Script>
          {/* This is silly but nextjs is even sillier when you use <script> tags */}
          <Script id='gtag-init'>{
              `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-CCESVCHGX6');`
            }
          </Script>
        </head>
        <body className={`${crimsonText.className} bg-bg-primary text-text-primary transition-colors`}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AutoRefresh>
    
  );
}
