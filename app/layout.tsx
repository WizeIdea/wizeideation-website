import './globals.css';
import NavMenu from '@/components/NavMenu';
import { FC, ReactNode } from 'react';
import { Libre_Baskerville, IBM_Plex_Serif, JetBrains_Mono, Inter } from 'next/font/google';

// Typography setup per Corporate Theme specification
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif-primary',
});

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif-body',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-ui',
});

export const metadata = {
  title: {
    default: 'Wize Ideation – Tactical Intellectual Research',
    template: '%s | Wize Ideation'
  },
  description:
    'A high‑end research archive for stylometric alignment, AI persona architecture, and forensic linguistics.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    'favicon-16x16': '/favicon-16x16.png',
    'favicon-32x32': '/favicon-32x32.png',
    'android-chrome-192x192': '/android-chrome-192x192.png',
    'android-chrome-512x512': '/android-chrome-512x512.png',
  },
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html 
      lang="en" 
      className={`scroll-smooth ${libreBaskerville.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-saltWhite text-striationCharcoal antialiased font-serif-body">
        <NavMenu />
        <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
        <footer className="pt-1 pb-2 text-center text-sm text-dpmOlive">
          © {new Date().getFullYear()} Wize Ideation. All rights reserved.
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
